package com.bparent.mytunes.dto;

import com.bparent.mytunes.model.Playlist;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlaylistDTO extends EntityDTO<Playlist> {

    protected BigInteger id;
    protected Integer itunesId;
    protected String nom;
    protected Boolean isFolder = Boolean.FALSE;
    protected String persistentId;
    protected String parentPersistentId;

    protected BigInteger parentId;
    protected List<BigInteger> musiqueIds = new ArrayList<>();
    protected List<BigInteger> musiquesOrderIds = new ArrayList<>();
    protected List<BigInteger> childrenIds = new ArrayList<>();

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    protected List<PlaylistDTO> children = new ArrayList<>();

    public static PlaylistDTO toDto(Playlist playlist) {
        ModelMapper mapper = new ModelMapper();
        PlaylistDTO dto = mapper.map(playlist, PlaylistDTO.class);
        if (playlist.getChildren() != null) {
            dto.childrenIds = playlist.getChildren().stream()
                    .map(PlaylistDTO::toDto)
                    .sorted((dto1, dto2) -> {
                        if (dto1.isFolder && !dto2.isFolder) { return 1; }
                        if (!dto1.isFolder && dto2.isFolder) { return -1; }
                        return dto1.getNom().compareTo(dto2.getNom());
                    })
                    .map(PlaylistDTO::getId)
                    .collect(Collectors.toList());
        }

        if (playlist.getMusiquesOrder() != null) {
            dto.musiqueIds = playlist.getMusiquesOrder().stream()
                    .map(musique -> musique.getMusique().getId())
                    .collect(Collectors.toList());
        }

        if (playlist.getMusiquesOrder() != null) {
            dto.musiquesOrderIds = playlist.getMusiquesOrder().stream()
                    .map(order -> order.getMusique().getId())
                    .collect(Collectors.toList());
        }

        if (playlist.getParent() != null) {
            dto.setParentId(playlist.getParent().getId());
        }

        return dto;
    }

    @Override
    public Class getEntityClass() {
        return Playlist.class;
    }

    public Stream<PlaylistDTO> childrenFlatMap() {
        Stream childrenStream = Stream.empty();
        if (children != null) {
            childrenStream = children.stream().flatMap(PlaylistDTO::childrenFlatMap);
        }
        return Stream.concat(Stream.of(this), childrenStream);
    }
}
