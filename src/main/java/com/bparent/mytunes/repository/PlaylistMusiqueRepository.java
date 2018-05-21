package com.bparent.mytunes.repository;

import com.bparent.mytunes.model.PlaylistMusique;
import org.springframework.data.repository.CrudRepository;

import java.math.BigInteger;

public interface PlaylistMusiqueRepository extends CrudRepository<PlaylistMusique, BigInteger> {
    void delete(PlaylistMusique playlistMusique);
}
