package com.bparent.dto;

import com.bparent.model.Musique;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

import java.math.BigInteger;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MusiqueDTO {

    private BigInteger itunesId;
    private String titre;
    private String artiste;
    private String genre;
    private BigInteger duree;
    private BigInteger timerDebut;
    private BigInteger timerFin;
    private BigInteger bpm;
    private BigInteger classement;
    private String commentaire;
    private String path;

    public static MusiqueDTO toDto(Musique musique) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(musique, MusiqueDTO.class);
    }

}
