package com.bparent.mytunes.controller.rest;

import com.bparent.mytunes.dto.MusiqueDTO;
import com.bparent.mytunes.model.Musique;
import com.bparent.mytunes.repository.MusiqueRepository;
import com.bparent.mytunes.service.MusiqueService;
import com.bparent.mytunes.util.FileUtils;
import com.bparent.mytunes.util.IConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@RestController
public class MusiqueController {

    @Autowired
    private MusiqueService musiqueService;

    @Autowired
    private MusiqueRepository musiqueRepository;

    private static List<String> randomWords = Arrays.asList("Commentaire", "Ardisson", "Patisson", "Lamarque",
            "Les dessous de Palm Beach", "Dinde", "Blablacar", "Ma bite c'est du béton", "La bohème",
            "Pierre Desproges", "Guyyy", "Burger quiz", "Jean Jaurès", "Madonna", "C'est d'la bombe bébé",
            "A fond les ballons", "A plus dans le bus", "Quelques deniers", "Help, I need somebody help",
            "Pot pourri", "Rotten head", "Isaac", "Pestilence", "Cavalier", "Echec", "Math", "Parabole", "Canal Sat",
            "Les nuls", "La cité des enfants perdus");
    private static List<MusiqueDTO> ALL_MUSIQUES = init();

    private static List<MusiqueDTO> init() {
        List<MusiqueDTO> init = new ArrayList<>();
        List<File> musiques = Arrays.asList(new File(IConstants.IPath.MUSIQUES)
                .listFiles((dir, name) -> IConstants.AUDIO_EXTENSION_ACCEPTED.contains(FileUtils.getFileExtension(name.toLowerCase()))));

        AtomicInteger i = new AtomicInteger(1);
        musiques.forEach(musique ->
                init.add(MusiqueDTO.builder().
                        itunesId(i.getAndIncrement()).
                        titre(musique.getName()).
                        artiste("Artiste").
                        bpm(Long.valueOf((Math.round(Math.random() * 30) + 30) * 4).intValue()).
                        duree(283).
                        classement(Long.valueOf((Math.round(Math.random() * 4) + 1) * 20).intValue()).
                        genreIds(Arrays.asList(BigInteger.valueOf(1))).
                        path(IConstants.IHandler.MUSIQUES_HANDLER + musique.getName()).
//                        commentaire(randomWords.get(Math.min(randomWords.size() - 1, (int) Math.round(Math.random() * randomWords.size())))).
                        build()));
        init.sort(Comparator.comparing(MusiqueDTO::getTitre));
        return init;
    }

    @GetMapping("/musiques")
    public List<MusiqueDTO> getAllMusiques() {
//        return ALL_MUSIQUES;
        return musiqueRepository.findAll().stream()
                .map(MusiqueDTO::toDto)
                .sorted(Comparator.comparing(MusiqueDTO::getTitre))
                .collect(Collectors.toList());
    }


    @PutMapping("/musique")
    @CrossOrigin
    public void updateMusique(@RequestBody MusiqueDTO musiqueDTO) {
//        try {
//            TimeUnit.SECONDS.sleep(2);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }

//        ALL_MUSIQUES = ALL_MUSIQUES.stream()
//                .map(dto -> {
//                    if (dto.getItunesId().equals(musiqueDTO.getItunesId())) {
//                        return musiqueDTO;
//                    } else {
//                        return dto;
//                    }
//                })
//                .collect(Collectors.toList());

        musiqueService.saveMusique(musiqueDTO);
    }

}
