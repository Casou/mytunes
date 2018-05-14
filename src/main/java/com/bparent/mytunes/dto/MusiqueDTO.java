package com.bparent.mytunes.dto;

import com.bparent.mytunes.model.Musique;
import com.bparent.mytunes.util.IConstants;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MusiqueDTO extends EntityDTO<Musique> {

    private BigInteger id;
    private Integer itunesId;
    private String titre;
    private String artiste;
    private List<BigInteger> genreIds;
    private Integer duree;
    private Integer timerDebut;
    private Integer timerFin;
    private Integer bpm;
    private Integer classement;
    private String commentaire;
    private String path;

    public static MusiqueDTO toDto(Musique musique) {
        ModelMapper mapper = new ModelMapper();
        MusiqueDTO dto = mapper.map(musique, MusiqueDTO.class);
        dto.setGenreIds(musique.getGenres() == null ?
                new ArrayList<>()
                : musique.getGenres().stream().map(genre -> genre.getId()).collect(Collectors.toList()));
        dto.setPath(IConstants.IHandler.MUSIQUES_HANDLER + dto.getPath());
        return dto;
    }


    @Override
    public Musique toEntity() {
        Musique entity = super.toEntity();
        if (entity.getPath().startsWith(IConstants.IHandler.MUSIQUES_HANDLER)) {
            entity.setPath(entity.getPath().substring(IConstants.IHandler.MUSIQUES_HANDLER.length()));
        }
        return entity;
    }

    @Override
    public Class getEntityClass() {
        return Musique.class;
    }
}
