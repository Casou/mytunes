package com.bparent.mytunes.repository;

import com.bparent.mytunes.model.Playlist;
import org.springframework.data.repository.CrudRepository;

import java.math.BigInteger;
import java.util.List;

public interface PlaylistRepository extends CrudRepository<Playlist, BigInteger> {
    List<Playlist> findAll();
    Playlist findById(BigInteger id);
    Playlist findByItunesId(Integer itunesId);

    Playlist save(Playlist playlist);
    void delete(Playlist playlist);
    void delete(BigInteger id);
}
