package com.bparent.mytunes.service;

import com.bparent.mytunes.dto.PlaylistDTO;
import com.bparent.mytunes.dto.PlaylistMusiqueDTO;
import com.bparent.mytunes.exception.ResourceNotFoundException;
import com.bparent.mytunes.model.Playlist;
import com.bparent.mytunes.model.PlaylistMusique;
import com.bparent.mytunes.repository.PlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;

    public void updatePlaylistNom(PlaylistDTO playlistDTO) {
        final Playlist playlist = playlistRepository.findById(playlistDTO.getId());
        playlist.setNom(playlistDTO.getNom());
        playlistRepository.save(playlist);
    }

    public void updatePlaylistOrder(PlaylistDTO playlistDTO) {
        final Playlist playlist = playlistRepository.findById(playlistDTO.getId());

        final List<PlaylistMusique> musiquesOrder = new ArrayList<>();
        for (int i = 0; i < playlistDTO.getMusiquesOrder().size(); i++) {
            final PlaylistMusiqueDTO playlistMusiqueDTO = playlistDTO.getMusiquesOrder().get(i);
            PlaylistMusique playlistMusique = playlist.getMusiquesOrder().stream()
                    .filter(musiqueOrder -> musiqueOrder.getMusique().getId().equals(playlistMusiqueDTO.getMusique().getId()))
                    .findFirst()
                    .orElseThrow(() -> new ResourceNotFoundException("Music " + playlistMusiqueDTO.getMusique().getId() + " not found"));
            playlistMusique.setOrder(i);
            musiquesOrder.add(playlistMusique);
        }

        playlist.setMusiquesOrder(musiquesOrder);
        playlistRepository.save(playlist);
    }

    public void deleteMusiqueFromPlaylist(PlaylistDTO playlistDTO) {
        final Playlist playlist = playlistRepository.findById(playlistDTO.getId());
        final BigInteger musiqueToDelete = playlistDTO.getMusiqueIds().get(0);

        final List<PlaylistMusique> musiquesOrder = new ArrayList<>();
        List<PlaylistMusique> filteredPlaylistMusique = playlist.getMusiquesOrder().stream()
                .filter(musiquesOrderEntity -> !musiquesOrderEntity.getMusique().getId().equals(musiqueToDelete))
                .collect(Collectors.toList());
        for (int i = 0; i < filteredPlaylistMusique.size(); i++) {
            final PlaylistMusique playlistMusique = filteredPlaylistMusique.get(i);
            playlistMusique.setOrder(i);
            musiquesOrder.add(playlistMusique);
        }

        playlist.setMusiquesOrder(musiquesOrder);
        playlistRepository.save(playlist);
    }
}
