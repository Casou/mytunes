package com.bparent.mytunes.dto;

import org.junit.Test;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.Assert.*;

public class PlaylistDTOTest {

    @Test
    public void shouldReturnFlatListWithChildren() {
        PlaylistDTO dto = PlaylistDTO.builder()
                .id(BigInteger.valueOf(1))
                .children(Arrays.asList(
                        PlaylistDTO.builder().id(BigInteger.valueOf(2)).build(),
                        PlaylistDTO.builder().id(BigInteger.valueOf(3))
                                .children(Arrays.asList(
                                        PlaylistDTO.builder().id(BigInteger.valueOf(4)).build()
                                ))
                                .build()
                ))
                .build();

        List<PlaylistDTO> flattenList = dto.childrenFlatMap().collect(Collectors.toList());
        assertEquals(4, flattenList.size());
        assertEquals(1, flattenList.get(0).getId().intValue());
        assertEquals(2, flattenList.get(1).getId().intValue());
        assertEquals(3, flattenList.get(2).getId().intValue());
        assertEquals(4, flattenList.get(3).getId().intValue());
    }

}