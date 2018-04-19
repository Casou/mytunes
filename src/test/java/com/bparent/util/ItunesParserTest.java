package com.bparent.util;

import com.bparent.repository.MusiqueRepository;
import com.bparent.repository.PlaylistRepository;
import com.bparent.model.Musique;
import com.bparent.model.Playlist;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.runners.MockitoJUnitRunner;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.File;
import java.io.IOException;
import java.math.BigInteger;
import java.util.List;

import static junit.framework.TestCase.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.mockito.Mockito.verify;

@RunWith(MockitoJUnitRunner.class)
public class ItunesParserTest {

    @InjectMocks
    private ItunesParser itunesParser;

    @Mock
    private MusiqueRepository musiqueDao;

    @Mock
    private PlaylistRepository playlistDao;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void shouldParseFile() throws IOException, SAXException, ParserConfigurationException {
        ArgumentCaptor<List> playlistsCaptor = ArgumentCaptor.forClass(List.class);
        ArgumentCaptor<List> musiquesCaptor = ArgumentCaptor.forClass(List.class);

        File f = new File("src/test/resources/xml/itunes_library_test.xml");
        this.itunesParser.load(f.getAbsolutePath());

        verify(playlistDao).save(playlistsCaptor.capture());
        verify(musiqueDao).save(musiquesCaptor.capture());

        List<Musique> musiques = musiquesCaptor.getValue();
        assertEquals(4, musiques.size());

        Musique m = musiques.get(0);
        assertEquals(BigInteger.valueOf(1), m.getItunesId());
        assertEquals("Shiny Stockings", m.getTitre());
        assertEquals("??", m.getArtiste());
        assertEquals(BigInteger.valueOf(120), m.getBpm());
        assertEquals(BigInteger.valueOf(80), m.getClassement());
        assertEquals(BigInteger.valueOf(131552), m.getDuree());
        assertEquals(BigInteger.valueOf(131552), m.getDuree());
        assertNull(m.getTimerDebut());
        assertNull(m.getTimerFin());
        assertEquals("Lindy", m.getGenre());
        assertEquals("file://localhost/E:/wamp/www/dancetunes/songs/test-upload/30 - Shiny Stockings.mp3", m.getPath());
        assertEquals("30", m.getCommentaire());

        assertEquals(BigInteger.valueOf(0), musiques.get(3).getTimerDebut());
        assertEquals(BigInteger.valueOf(131552), musiques.get(3).getTimerFin());

        List<Playlist> playlists = playlistsCaptor.getValue();
        assertEquals(2, playlists.size());

        Playlist folder = playlists.get(0);
        assertEquals(BigInteger.valueOf(14525), folder.getItunesId());
        assertEquals("Test Folder", folder.getNom());
        assertEquals("42A45B8FD23FA86A", folder.getPersistentId());
        assertNull(folder.getParentPersistentId());
        assertNull(folder.getParent());
        assertEquals(1, folder.getChildren().size());
        assertEquals(2, folder.getMusiques().size());

        Playlist child = playlists.get(1);
        assertEquals(BigInteger.valueOf(12345), child.getItunesId());
        assertEquals("Test Playlist", child.getNom());
        assertEquals("3E6916F95560A2DD", child.getPersistentId());
        assertEquals("42A45B8FD23FA86A", child.getParentPersistentId());
        assertNotNull(child.getParent());
        assertEquals(BigInteger.valueOf(14525), child.getParent().getItunesId());
        assertEquals(0, child.getChildren().size());
        assertEquals(2, child.getMusiques().size());

    }

}