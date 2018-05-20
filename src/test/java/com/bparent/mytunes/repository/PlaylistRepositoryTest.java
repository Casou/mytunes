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
    public void findAll_shouldReturnAllPlaylists() {
        List<Playlist> allPlaylist = playlistDao.findAll();
        assertEquals(3, allPlaylist.size());

        assertEquals(BigInteger.valueOf(1), allPlaylist.get(0).getId());
        assertEquals("pl1-titre", allPlaylist.get(0).getNom());
        assertEquals(BigInteger.valueOf(2), allPlaylist.get(1).getId());
        assertEquals("pl2-titre", allPlaylist.get(1).getNom());
        assertEquals(BigInteger.valueOf(3), allPlaylist.get(2).getId());
        assertEquals("pl3-titre", allPlaylist.get(2).getNom());
    }

    @Test
    public void findById_shouldReturnOnePlaylist() {
        Playlist p = playlistDao.findById(BigInteger.valueOf(1));
        assertEquals("pl1-titre", p.getNom());
        assertEquals(2, p.getMusiques().size());
        assertEquals("mus1-titre", p.getMusiques().get(0).getTitre());
        assertEquals("mus2-titre", p.getMusiques().get(1).getTitre());
    }

    @Test
    public void findById_shouldReturnNoPlaylist() {
        Playlist p = playlistDao.findById(BigInteger.valueOf(12345));
        assertNull(p);
    }

    @Test
    public void findByItunesId_shouldReturnOnePlaylist() {
        Playlist p = playlistDao.findByItunesId(1);
        assertEquals("pl1-titre", p.getNom());
        assertEquals(2, p.getMusiques().size());
        assertEquals("mus1-titre", p.getMusiques().get(0).getTitre());
        assertEquals("mus2-titre", p.getMusiques().get(1).getTitre());
    }

    @Test
    public void findByItunesId_shouldReturnNoPlaylist() {
        Playlist p = playlistDao.findByItunesId(12345);
        assertNull(p);
    }

    @Test
    public void save_shouldSaveNewPlaylist() {
        List<Playlist> allPlaylist = playlistDao.findAll();
        assertEquals(3, allPlaylist.size());

        playlistDao.save(Playlist.builder().nom("pl3-titre").build());

        allPlaylist = playlistDao.findAll();
        assertEquals(4, allPlaylist.size());
    }

    @Test
    public void delete_shouldDeletePlaylistBySearch() {
        List<Playlist> allPlaylist = playlistDao.findAll();
        assertEquals(3, allPlaylist.size());

        Playlist p = playlistDao.findByItunesId(1);

        playlistDao.delete(p);

        allPlaylist = playlistDao.findAll();
        assertEquals(2, allPlaylist.size());
    }

    @Test
    public void delete_shouldDeletePlaylistByIdObject() {
        List<Playlist> allPlaylist = playlistDao.findAll();
        assertEquals(3, allPlaylist.size());

        Playlist p = new Playlist();
        p.setId(BigInteger.valueOf(1));

        playlistDao.delete(p);

        allPlaylist = playlistDao.findAll();
        assertEquals(2, allPlaylist.size());
    }

    @Test
    public void delete_shouldDeletePlaylistById() {
        List<Playlist> allPlaylist = playlistDao.findAll();
        assertEquals(3, allPlaylist.size());

        playlistDao.delete(BigInteger.valueOf(1));

        allPlaylist = playlistDao.findAll();
        assertEquals(2, allPlaylist.size());
    }

    @Test
    public void findByParentIsNull_shouldReturnOnlyRootPlaylists() {
        List<Playlist> playlists = playlistDao.findByParentIsNull();
        assertEquals(2, playlists.size());
    }

}