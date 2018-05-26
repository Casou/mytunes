package com.bparent.mytunes.repository;

import com.bparent.mytunes.model.PlaylistMusique;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.math.BigInteger;
import java.util.List;

public interface PlaylistMusiqueRepository extends CrudRepository<PlaylistMusique, BigInteger> {
    List<PlaylistMusique> findAll();
    void delete(PlaylistMusique playlistMusique);

    @Modifying
    @Query("delete from PlaylistMusique pm where pm.id in ?1")
    void delete(List<BigInteger> playlistMusiqueIds);

}
