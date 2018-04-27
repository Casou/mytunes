package com.bparent.mytunes.controller.rest;

import com.bparent.mytunes.dto.MusiqueDTO;
import com.bparent.mytunes.model.Musique;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@RestController
public class MusiqueController {

    private static List<MusiqueDTO> ALL_MUSIQUES = init();

    private static List<MusiqueDTO> init() {
        List<MusiqueDTO> init = new ArrayList<>();
        for (int i = 1; i <= 1000; i++) {
            init.add(MusiqueDTO.builder().
                        itunesId(BigInteger.valueOf(i)).
                        titre("Song " + i).
                        artiste("Artiste "  + i).
                        bpm(Long.valueOf((Math.round(Math.random() * 30) + 30) * 4).intValue()).
                        duree(Long.valueOf(Math.round(Math.random() * 90000) + 110000).intValue()).
                        classement(Long.valueOf((Math.round(Math.random() * 4) + 1) * 20).intValue()).
                        genre("Lindy").
                        path("/path").
                        build());
        }
        return init;
    }

    @GetMapping("/all-musiques")
    public List<MusiqueDTO> getAllMusiques() {
        return ALL_MUSIQUES;
    }


    @PutMapping("/musique")
    @CrossOrigin
    public void updateMusique(@RequestBody MusiqueDTO updatedMusique) {
        try {
            TimeUnit.SECONDS.sleep(1);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        ALL_MUSIQUES = ALL_MUSIQUES.stream()
                .map(musiqueDTO -> {
                    if (musiqueDTO.getItunesId().equals(updatedMusique.getItunesId())) {
                        return updatedMusique;
                    } else {
                        return musiqueDTO;
                    }
                })
                .collect(Collectors.toList());
    }


}
