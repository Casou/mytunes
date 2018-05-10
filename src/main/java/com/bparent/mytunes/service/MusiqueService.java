package com.bparent.mytunes.service;

import com.bparent.mytunes.dto.MusiqueDTO;
import com.bparent.mytunes.model.Musique;
import com.bparent.mytunes.repository.GenreRepository;
import com.bparent.mytunes.repository.MusiqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MusiqueService {

    @Autowired
    private MusiqueRepository musiqueRepository;

    @Autowired
    private GenreRepository genreRepository;

    public void saveMusique(MusiqueDTO musiqueDTO) {
        Musique musique = musiqueDTO.toEntity();
        if (!musiqueDTO.getGenreIds().isEmpty()) {
            musique.setGenres(genreRepository.findByIdIn(musiqueDTO.getGenreIds()));
        }
        musiqueRepository.save(musique);
    }

}
