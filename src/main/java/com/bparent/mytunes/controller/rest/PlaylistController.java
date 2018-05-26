package com.bparent.mytunes.controller.rest;

import com.bparent.mytunes.dto.PlaylistDTO;
import com.bparent.mytunes.repository.PlaylistRepository;
import com.bparent.mytunes.service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;

    @Autowired
    private PlaylistRepository playlistRepository;

    @GetMapping("/playlists")
    public List<PlaylistDTO> getAllPlaylist() {
        return this.playlistRepository.findAll().stream()
                .map(PlaylistDTO::toDto)
                .collect(Collectors.toList());
    }

    @PutMapping("/playlist")
    public PlaylistDTO savePlaylist(@RequestBody PlaylistDTO playlistDTO) {
        return playlistService.save(playlistDTO);
    }

    @DeleteMapping("/playlist")
    public void deletePlaylist(@RequestBody PlaylistDTO playlistDTO) {
        playlistService.delete(playlistDTO);
    }

    @PutMapping("/playlist/nom")
    public void updatePlaylistNom(@RequestBody PlaylistDTO playlistDTO) {
        this.playlistService.updatePlaylistNom(playlistDTO);
    }

    @PutMapping("/playlist/order")
    public void updateMusiqueOrder(@RequestBody PlaylistDTO playlistDTO) {
        this.playlistService.updatePlaylistOrder(playlistDTO);
    }

    @DeleteMapping("/playlist/musique")
    public void deleteMusiqueFromPlaylist(@RequestBody PlaylistDTO playlistDTO) {
        this.playlistService.deleteMusiqueFromPlaylist(playlistDTO);
    }

}
