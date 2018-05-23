package com.bparent.mytunes.repository;

import com.bparent.mytunes.model.PlaylistMusique;
import org.springframework.data.repository.CrudRepository;

import java.math.BigInteger;
import java.util.List;

public interface PlaylistMusiqueRepository extends CrudRepository<PlaylistMusique, BigInteger> {
    List<PlaylistMusique> findAll();
    void delete(PlaylistMusique playlistMusique);
}
