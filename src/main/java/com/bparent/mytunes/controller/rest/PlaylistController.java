package com.bparent.mytunes.controller.rest;

import com.bparent.mytunes.dto.PlaylistDTO;
import com.bparent.mytunes.repository.PlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class PlaylistController {

    @Autowired
    private PlaylistRepository playlistRepository;


    @GetMapping("/all-playlists")
    public List<PlaylistDTO> getAllPlaylist() {
        return playlistRepository.findAll().stream().
                map(PlaylistDTO::toDto)
                .collect(Collectors.toList());
    }


}
