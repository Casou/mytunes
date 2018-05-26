package com.bparent.mytunes.repository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigInteger;
import java.util.Arrays;

import static org.junit.Assert.assertEquals;

@DataJpaTest
@RunWith(SpringJUnit4ClassRunner.class)
@Sql({"/schema.sql", "/data.sql"})
public class PlaylistMusiqueRepositoryTest {

    @Autowired
    public PlaylistMusiqueRepository playlistMusiqueRepository;

    @Test
    public void findAll_shouldReturn3Records() {
        assertEquals(3, playlistMusiqueRepository.findAll().size());
    }

    @Test
    public void deleteList_shouldDelete2ExistingRecords() {
        assertEquals(3, playlistMusiqueRepository.findAll().size());
        playlistMusiqueRepository.delete(Arrays.asList(BigInteger.valueOf(1), BigInteger.valueOf(2)));
        assertEquals(1, playlistMusiqueRepository.findAll().size());
    }

    @Test
    public void deleteList_shouldNotDeleteUnexistingRecords() {
        assertEquals(3, playlistMusiqueRepository.findAll().size());
        playlistMusiqueRepository.delete(Arrays.asList(BigInteger.valueOf(999)));
        assertEquals(3, playlistMusiqueRepository.findAll().size());
    }

}