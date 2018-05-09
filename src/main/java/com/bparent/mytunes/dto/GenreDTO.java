package com.bparent.mytunes.dto;

import com.bparent.mytunes.model.Genre;
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
public class GenreDTO extends EntityDTO<Genre> {

    private BigInteger id;
    private String label;

    public static GenreDTO toDto(Genre genre) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(genre, GenreDTO.class);
    }

    @Override
    public Class getEntityClass() {
        return Genre.class;
    }

}
