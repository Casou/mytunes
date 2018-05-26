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
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

//@RunWith(SpringRunner.class)
@DataJpaTest
//@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
@Sql({"/schema.sql", "/data.sql"})
public class PlaylistRepositoryTest {

    @Autowired
    private PlaylistRepository playlistRepository;

    @Test
    public void findAll_shouldReturnAllPlaylists() {
        List<Playlist> allPlaylist = playlistRepository.findAll();
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
        Playlist p = playlistRepository.findById(BigInteger.valueOf(1));
        assertEquals("pl1-titre", p.getNom());
        assertEquals(3, p.getMusiquesOrder().size());
        assertEquals("mus1-titre", p.getMusiquesOrder().get(0).getMusique().getTitre());
        assertEquals(1, p.getMusiquesOrder().get(0).getOrder().intValue());
        assertEquals("mus3-titre", p.getMusiquesOrder().get(1).getMusique().getTitre());
        assertEquals(2, p.getMusiquesOrder().get(1).getOrder().intValue());
        assertEquals("mus2-titre", p.getMusiquesOrder().get(2).getMusique().getTitre());
        assertEquals(3, p.getMusiquesOrder().get(2).getOrder().intValue());
    }

    @Test
    public void findById_shouldReturnNoPlaylist() {
        Playlist p = playlistRepository.findById(BigInteger.valueOf(12345));
        assertNull(p);
    }

    @Test
    public void findByItunesId_shouldReturnOnePlaylist() {
        Playlist p = playlistRepository.findByItunesId(1);
        assertEquals("pl1-titre", p.getNom());
        assertEquals(3, p.getMusiquesOrder().size());
        assertEquals("mus1-titre", p.getMusiquesOrder().get(0).getMusique().getTitre());
        assertEquals("mus3-titre", p.getMusiquesOrder().get(1).getMusique().getTitre());
        assertEquals("mus2-titre", p.getMusiquesOrder().get(2).getMusique().getTitre());
    }

    @Test
    public void findByItunesId_shouldReturnNoPlaylist() {
        Playlist p = playlistRepository.findByItunesId(12345);
        assertNull(p);
    }

    @Test
    public void save_shouldSaveNewPlaylist() {
        List<Playlist> allPlaylist = playlistRepository.findAll();
        assertEquals(3, allPlaylist.size());

        playlistRepository.save(Playlist.builder().nom("pl3-titre").build());

        allPlaylist = playlistRepository.findAll();
        assertEquals(4, allPlaylist.size());
    }

    @Test
    public void delete_shouldDeletePlaylistBySearch() {
        List<Playlist> allPlaylist = playlistRepository.findAll();
        assertEquals(3, allPlaylist.size());

        Playlist p = playlistRepository.findByItunesId(1);

        playlistRepository.delete(p);

        allPlaylist = playlistRepository.findAll();
        assertEquals(2, allPlaylist.size());
    }

    @Test
    public void delete_shouldDeletePlaylistById() {
        List<Playlist> allPlaylist = playlistRepository.findAll();
        assertEquals(3, allPlaylist.size());

        playlistRepository.delete(BigInteger.valueOf(1));

        allPlaylist = playlistRepository.findAll();
        assertEquals(2, allPlaylist.size());
    }

    @Test
    public void findByNomAndParentId_shouldReturnOneRecordIfHasParent() {
        Playlist playlist = playlistRepository.findByNomAndParentId("pl3-titre", BigInteger.valueOf(2));
        assertNotNull(playlist);
        assertEquals(3, playlist.getId().intValue());
    }

    @Test
    public void findByNomAndParentId_shouldReturnOneRecordIfHasNoParent() {
        Playlist playlist = playlistRepository.findByNomAndParentId("pl2-titre", null);
        assertNotNull(playlist);
        assertEquals(2, playlist.getId().intValue());
    }

    @Test
    public void findByNomAndParentId_shouldReturnNullRecord() {
        Playlist playlist = playlistRepository.findByNomAndParentId("pl999-titre", null);
        assertNull(playlist);
    }

}