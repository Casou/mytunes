package com.bparent.mytunes;

import com.bparent.mytunes.dto.MusiqueDTO;
import com.bparent.mytunes.model.Musique;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class MusiqueController {

    private static List<MusiqueDTO> ALL_MUSIQUES = Arrays.asList(
            MusiqueDTO.toDto(Musique.builder().itunesId(BigInteger.valueOf(1)).titre("Song 1 Song 1 Song 1 Song 1 Song 1 Song 1 Song 1 Song 1").artiste("Artiste 1").bpm(BigInteger.valueOf(220)).duree(BigInteger.valueOf(182437)).classement(BigInteger.valueOf(60)).genre("Lindy").path("/path").build()),
            MusiqueDTO.toDto(Musique.builder().itunesId(BigInteger.valueOf(2)).titre("Song 2").artiste("Artiste 2").bpm(BigInteger.valueOf(140)).duree(BigInteger.valueOf(142365)).classement(BigInteger.valueOf(100)).genre("Lindy, Boogie").path("/path").build()),
            MusiqueDTO.toDto(Musique.builder().itunesId(BigInteger.valueOf(3)).titre("Song 3").artiste("Artiste 3").bpm(BigInteger.valueOf(180)).duree(BigInteger.valueOf(94532)).classement(BigInteger.valueOf(80)).genre("Rock 4 temps").path("/path").commentaire("Un commentaire").build()),
            MusiqueDTO.toDto(Musique.builder().itunesId(BigInteger.valueOf(4)).titre("Song 4").artiste("Artiste 4").bpm(BigInteger.valueOf(220)).duree(BigInteger.valueOf(182437)).classement(BigInteger.valueOf(60)).genre("Lindy").path("/path").build()),
            MusiqueDTO.toDto(Musique.builder().itunesId(BigInteger.valueOf(5)).titre("Song 5").artiste("Artiste 5").bpm(BigInteger.valueOf(140)).duree(BigInteger.valueOf(142365)).classement(BigInteger.valueOf(100)).genre("Lindy, Boogie").path("/path").build()),
            MusiqueDTO.toDto(Musique.builder().itunesId(BigInteger.valueOf(6)).titre("Song 6").artiste("Artiste 6").bpm(BigInteger.valueOf(180)).duree(BigInteger.valueOf(94532)).classement(BigInteger.valueOf(80)).genre("Rock 4 temps").path("/path").build())
    );

    @GetMapping("/all-musiques")
    public List<MusiqueDTO> getAllMusiques() {
        return ALL_MUSIQUES;
    }


    @PutMapping("/musique")
    @CrossOrigin
    public void updateMusique(@RequestBody MusiqueDTO updatedMusique) {
        System.out.println("Update " + updatedMusique);
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
