package com.bparent.mytunes.dto;

import org.junit.Test;

import java.math.BigInteger;

import static org.junit.Assert.*;

public class PlaylistDTOTest {

    @Test
    public void shouldReturnFlatListWithChildren() {
        PlaylistDTO dto = PlaylistDTO.builder()
                .id(BigInteger.valueOf(1))
//                .childrenIds()
                .build();
    }
}