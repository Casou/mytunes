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

    @GetMapping("/musiques")
    public List<MusiqueDTO> getAllMusiques() {
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

        musiqueService.saveMusique(musiqueDTO);
    }

}
