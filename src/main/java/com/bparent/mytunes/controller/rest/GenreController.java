package com.bparent.mytunes.controller.rest;

import com.bparent.mytunes.dto.GenreDTO;
import com.bparent.mytunes.repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class GenreController {

    @Autowired
    private GenreRepository genreRepository;


    @GetMapping("/genres")
    public List<GenreDTO> getAllPlaylist() {
        return genreRepository.findAll().stream().
                map(GenreDTO::toDto)
                .collect(Collectors.toList());
    }

    @PutMapping("/genre")
    @CrossOrigin
    public void getAllPlaylist(@RequestBody GenreDTO genreDTO) {
        genreRepository.save(genreDTO.toEntity());
    }


}
