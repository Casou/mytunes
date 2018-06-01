package com.bparent.mytunes.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigInteger;

@Data
@AllArgsConstructor
public class PlaylistDeleteDTO {

    private BigInteger id;
    private Boolean deleteAllChildren;

}
