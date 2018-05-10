package com.bparent.mytunes.repository;

import com.bparent.mytunes.model.Genre;
import com.bparent.mytunes.model.Playlist;
import org.springframework.data.repository.CrudRepository;

import java.math.BigInteger;
import java.util.List;

public interface GenreRepository extends CrudRepository<Genre, BigInteger> {
    List<Genre> findAll();
    List<Genre> findByIdIn(List<BigInteger> idList);
}
