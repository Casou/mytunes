package com.bparent.mytunes.dto;

import com.bparent.mytunes.model.Musique;
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
    private Integer duree;
    private Integer timerDebut;
    private Integer timerFin;
    private Integer bpm;
    private Integer classement;
    private String commentaire;
    private String path;

    public static MusiqueDTO toDto(Musique musique) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(musique, MusiqueDTO.class);
    }

}
