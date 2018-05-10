package com.bparent.mytunes.repository;

import com.bparent.mytunes.model.Playlist;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

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

        assertEquals("pl1-titre", allPlaylist.get(0).getNom());
        assertEquals("pl2-titre", allPlaylist.get(1).getNom());
    }

    @Test
    public void shouldReturnOnePlaylist() {
        Playlist p = playlistDao.findByItunesId(BigInteger.valueOf(1));
        assertEquals("pl1-titre", p.getNom());
        assertEquals(2, p.getMusiques().size());
        assertEquals("mus1-titre", p.getMusiques().get(0).getTitre());
        assertEquals("mus2-titre", p.getMusiques().get(1).getTitre());
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
        p.setItunesId(3);
        p.setNom("pl3-titre");

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
        p.setItunesId(1);

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