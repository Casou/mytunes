package com.bparent.mytunes.repository;

import com.bparent.mytunes.model.Genre;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigInteger;
import java.util.Arrays;

import static org.junit.Assert.*;

@DataJpaTest
@RunWith(SpringJUnit4ClassRunner.class)
@Sql({"/schema.sql", "/data.sql"})
public class GenreRepositoryTest {

    @Autowired
    private GenreRepository genreRepository;

    @Test
    public void findAll_shouldReturn3Records() {
        assertEquals(3, genreRepository.findAll().size());
    }

    @Test
    public void findByIdIn_shouldReturn2RecordsWhenExisting() {
        assertEquals(2, genreRepository.findByIdIn(Arrays.asList(BigInteger.valueOf(1), BigInteger.valueOf(2))).size());
    }

    @Test
    public void findByIdIn_shouldReturn1RecordWhenNotExisting() {
        assertEquals(1, genreRepository.findByIdIn(Arrays.asList(BigInteger.valueOf(1), BigInteger.valueOf(999))).size());
    }

    @Test
    public void findByLabel_shouldReturn1RecordWhenExisting() {
        assertNotNull(genreRepository.findByLabel("Lindy"));
    }

    @Test
    public void findByLabel_shouldReturn0RecordWhenNotExisting() {
        assertNull(genreRepository.findByLabel("NOT_EXISTING"));
    }

    @Test
    public void save_shouldSaveNewEntity() {
        assertEquals(3, genreRepository.findAll().size());
        final Genre newEntity = genreRepository.save(Genre.builder().label("New genre").build());
        assertEquals(4, genreRepository.findAll().size());
        assertEquals(4, newEntity.getId().intValue());
    }

}