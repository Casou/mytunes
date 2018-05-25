package com.bparent.mytunes.service;

import com.bparent.mytunes.dto.PlaylistDTO;
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
import java.util.List;
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

    public PlaylistDTO save(PlaylistDTO playlistDTO) {
        Playlist playlist = playlistDTO.toEntity();
        playlist.setIsFolder(false);

        if (playlistDTO.getMusiqueIds() != null) {
            playlist.setMusiquesOrder(new ArrayList<>());
            List<Musique> musiques = musiqueRepository.findByIdIn(playlistDTO.getMusiqueIds());
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

        Playlist savedPlaylist = playlistRepository.save(playlist);

        return PlaylistDTO.toDto(savedPlaylist);
    }

}
