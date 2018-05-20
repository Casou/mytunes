package com.bparent.mytunes.repository;

import com.bparent.mytunes.model.Musique;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

import java.math.BigInteger;
import java.util.List;

public interface MusiqueRepository extends CrudRepository<Musique, BigInteger> {

    // http://localhost:8000/musiques/all
    @RestResource(path = "all")
    List<Musique> findAll();

    // http://localhost:8000/musiques/1
    // http://localhost:8000/musiques/search/by-itunes-id?id=1
    @RestResource(path = "by-itunes-id")
    Musique findByItunesId(@Param("id") Integer itunesId);

    Musique findById(@Param("id") BigInteger id);

    // http://localhost:8000/musiques/search/by-name?name=Test
//    @Query("Select m from Musique m where m.titre like %:name%")
//    @RestResource(path = "by-name")
//    List<Musique> findByName(@Param("name") String name);

    Musique save(Musique playlist);

    void delete(Musique playlist);

    void delete(BigInteger id);

}
