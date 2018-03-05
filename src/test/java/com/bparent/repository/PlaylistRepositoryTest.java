package com.bparent.repository;

import com.bparent.model.Playlist;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;

import java.math.BigInteger;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

//@RunWith(SpringRunner.class)
@DataJpaTest
//@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
@Sql({"/schema.sql", "/data.sql"})
public class PlaylistRepositoryTest {

    @Autowired
    private PlaylistRepository playlistDao;


    @Test
    public void shouldReturnAllPlaylists() {
        List<Playlist> allPlaylist = playlistDao.findAll();
        assertEquals(2, allPlaylist.size());

        assertEquals("pl1-nom", allPlaylist.get(0).getNom());
        assertEquals("pl2-nom", allPlaylist.get(1).getNom());
    }

    @Test
    public void shouldReturnOnePlaylist() {
        Playlist p = playlistDao.findByItunesId(BigInteger.valueOf(1));
        assertEquals("pl1-nom", p.getNom());
        assertEquals(2, p.getMusiques().size());
        assertEquals("mus1-nom", p.getMusiques().get(0).getNom());
        assertEquals("mus2-nom", p.getMusiques().get(1).getNom());
    }

    @Test
    public void shouldReturnNoPlaylist() {
        Playlist p = playlistDao.findByItunesId(BigInteger.valueOf(12345));
        assertNull(p);
    }

    @Test
    public void shouldSaveNewPlaylist() {
        List<Playlist> allPlaylist = playlistDao.findAll();
        assertEquals(2, allPlaylist.size());

        Playlist p = new Playlist();
        p.setItunesId(BigInteger.valueOf(3));
        p.setNom("pl3-nom");

        playlistDao.save(p);

        allPlaylist = playlistDao.findAll();
        assertEquals(3, allPlaylist.size());
    }

    @Test
    public void shouldDeletePlaylistBySearch() {
        List<Playlist> allPlaylist = playlistDao.findAll();
        assertEquals(2, allPlaylist.size());

        Playlist p = playlistDao.findByItunesId(BigInteger.valueOf(1));

        playlistDao.delete(p);

        allPlaylist = playlistDao.findAll();
        assertEquals(1, allPlaylist.size());
    }

    @Test
    public void shouldDeletePlaylistByIdObject() {
        List<Playlist> allPlaylist = playlistDao.findAll();
        assertEquals(2, allPlaylist.size());

        Playlist p = new Playlist();
        p.setItunesId(BigInteger.valueOf(1));

        playlistDao.delete(p);

        allPlaylist = playlistDao.findAll();
        assertEquals(1, allPlaylist.size());
    }

    @Test
    public void shouldDeletePlaylistById() {
        List<Playlist> allPlaylist = playlistDao.findAll();
        assertEquals(2, allPlaylist.size());

        playlistDao.delete(BigInteger.valueOf(1));

        allPlaylist = playlistDao.findAll();
        assertEquals(1, allPlaylist.size());
    }

}