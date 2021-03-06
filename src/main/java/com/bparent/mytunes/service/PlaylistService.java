package com.bparent.mytunes.service;

import com.bparent.mytunes.dto.PlaylistDTO;
import com.bparent.mytunes.dto.PlaylistDeleteDTO;
import com.bparent.mytunes.dto.PlaylistMusiqueDTO;
import com.bparent.mytunes.exception.ResourceNotFoundException;
import com.bparent.mytunes.model.Musique;
import com.bparent.mytunes.model.Playlist;
import com.bparent.mytunes.model.PlaylistMusique;
import com.bparent.mytunes.repository.MusiqueRepository;
import com.bparent.mytunes.repository.PlaylistMusiqueRepository;
import com.bparent.mytunes.repository.PlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@Transactional
public class PlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private PlaylistMusiqueRepository playlistMusiqueRepository;

    @Autowired
    private MusiqueRepository musiqueRepository;

    public void updatePlaylistNom(PlaylistDTO playlistDTO) {
        final Playlist playlist = playlistRepository.findById(playlistDTO.getId());
        playlist.setNom(playlistDTO.getNom());
        playlistRepository.save(playlist);
    }

    public void updatePlaylistOrder(PlaylistDTO playlistDTO) {
        final Playlist playlist = playlistRepository.findById(playlistDTO.getId());

        final List<PlaylistMusique> musiquesOrder = new ArrayList<>();
        for (int i = 0; i < playlistDTO.getMusiquesOrderIds().size(); i++) {
            final BigInteger idMusique = playlistDTO.getMusiquesOrderIds().get(i);

            final PlaylistMusique playlistMusique = playlist.getMusiquesOrder().stream()
                    .filter(musiqueOrder -> musiqueOrder.getMusique().getId().equals(idMusique))
                    .findFirst()
                    .orElseThrow(() -> new ResourceNotFoundException("Music " + idMusique + " not found"));

            playlistMusique.setOrder(i);
            musiquesOrder.add(playlistMusique);
        }

        playlist.setMusiquesOrder(musiquesOrder);
        playlistRepository.save(playlist);
    }

    public void deleteMusiqueFromPlaylist(PlaylistDTO playlistDTO) {
        final Playlist playlist = playlistRepository.findById(playlistDTO.getId());
        final BigInteger musiqueToDelete = playlistDTO.getMusiqueIds().get(0);

        final PlaylistMusique playlistMusiqueToDelete = playlist.getMusiquesOrder().stream()
                .filter(musiquesOrderEntity -> musiquesOrderEntity.getMusique().getId().equals(musiqueToDelete))
                .findFirst()
                .orElse(null);

        playlistMusiqueRepository.delete(playlistMusiqueToDelete);
        playlist.getMusiquesOrder().remove(playlistMusiqueToDelete);
        playlistRepository.save(playlist);
    }

    public void delete(PlaylistDeleteDTO playlistDTO) {
        this.delete(playlistRepository.findById(playlistDTO.getId()), playlistDTO.getDeleteAllChildren());
    }

    public void delete(Playlist playlist, Boolean deleteChildren) {
        if (playlist.getChildren() != null) {
            if (deleteChildren) {
                playlist.getChildren().forEach(child -> this.delete(child, true));
            } else {
                playlist.getChildren().forEach(child -> child.setParent(playlist.getParent()));
            }
            playlist.setChildren(new ArrayList<>());
        }
        playlistMusiqueRepository.delete(playlist.getMusiquesOrder());
        playlistRepository.delete(playlist);
    }

    public PlaylistDTO save(PlaylistDTO playlistDTO) {
        final Playlist playlist;
        if (playlistDTO.getId() != null) {
            final Playlist playlistDb = this.playlistRepository.findByNomAndParentId(playlistDTO.getNom(), playlistDTO.getParentId());

            if (playlistDb == null) {
                playlist = playlistDTO.toEntity();
                playlist.setId(null);
            } else {
                playlist = playlistDb;
                playlist.setNom(playlistDTO.getNom());

                if (playlist.getMusiquesOrder() != null) {
                    playlistMusiqueRepository.delete(playlist.getMusiquesOrder().stream()
                            .map(playlistMusique -> playlistMusique.getId())
                            .collect(Collectors.toList()));
                }
            }
        } else {
            playlist = playlistDTO.toEntity();
        }

        if (playlist.getIsFolder() == null) {
            playlist.setIsFolder(false);
        }

        if (playlistDTO.getMusiqueIds() != null) {
            playlist.setMusiquesOrder(new ArrayList<>());
            final List<Musique> musiques = musiqueRepository.findByIdIn(playlistDTO.getMusiqueIds());
            IntStream.range(0, musiques.size())
                    .forEach(index -> playlist.getMusiquesOrder().add(
                            PlaylistMusique.builder()
                                    .musique(musiques.get(index))
                                    .playlist(playlist)
                                    .order(index)
                                    .build()
                    ));
        }

        if (playlistDTO.getParentId() != null) {
            playlist.setParent(playlistRepository.findById(playlistDTO.getParentId()));
        }

        final Playlist savedPlaylist = playlistRepository.save(playlist);

        return PlaylistDTO.toDto(savedPlaylist);
    }

    public void reorderPlaylistTree(PlaylistDTO rootPlaylistDTO) {
        final List<Playlist> allPlaylists = this.playlistRepository.findAll();
        final List<PlaylistDTO> flatPlaylistsDTOList = rootPlaylistDTO.childrenFlatMap().collect(Collectors.toList());

        for (Playlist playlist : allPlaylists) {
            playlist.setParent(null);
            playlist.setChildren(new ArrayList<>());
        }

        for (PlaylistDTO playlistDTO : flatPlaylistsDTOList) {
            if (playlistDTO.getId() == null) {
                continue;
            }

            Playlist playlist = allPlaylists.stream().filter(pl -> pl.getId().equals(playlistDTO.getId())).findFirst().orElseThrow(() -> new ResourceNotFoundException("Playlist " + playlistDTO.getId() + " not found"));
            if (playlistDTO.getParentId() != null) {
                Playlist playlistParent = allPlaylists.stream().filter(pl -> pl.getId().equals(playlistDTO.getParentId())).findFirst().orElseThrow(() -> new ResourceNotFoundException("Playlist " + playlistDTO.getId() + " not found"));
                playlist.setParent(playlistParent);
            }
            playlistRepository.save(playlist);
        }
    }

    public void addMusiqueToPlaylist(PlaylistMusiqueDTO playlistMusiqueDTO) {
        Playlist playlist = this.playlistRepository.findById(playlistMusiqueDTO.getPlaylist().getId());
        Musique musique = this.musiqueRepository.findById(playlistMusiqueDTO.getMusique().getId());

        playlist.getMusiquesOrder().add(PlaylistMusique.builder()
                .playlist(playlist)
                .musique(musique)
                .order(playlist.getMusiquesOrder().stream().map(pl -> pl.getOrder().intValue())
                        .max(Comparator.naturalOrder())
                        .orElse(0) + 1
                )
                .build());

        this.playlistRepository.save(playlist);
    }

    public void clearPlaylist(PlaylistDTO playlistDTO) {
        Playlist playlist = this.playlistRepository.findById(playlistDTO.getId());
        this.playlistMusiqueRepository.delete(playlist.getMusiquesOrder());
        playlist.setMusiquesOrder(new ArrayList<>());
        this.playlistRepository.save(playlist);
    }
}
