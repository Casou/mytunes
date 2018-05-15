package com.bparent.mytunes.util;

import com.bparent.mytunes.repository.MusiqueRepository;
import com.bparent.mytunes.repository.PlaylistRepository;
import com.bparent.mytunes.model.Musique;
import com.bparent.mytunes.model.Playlist;
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
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

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
        when(musiqueDao.save(any(Musique.class))).thenAnswer(invocationOnMock -> invocationOnMock.getArguments()[0]);
    }

    @Test
    public void parseFile_shouldSaveMusiqueIfNotExisting() throws IOException, SAXException, ParserConfigurationException {
        ArgumentCaptor<Musique> musiquesCaptor = ArgumentCaptor.forClass(Musique.class);

        File f = new File("src/test/resources/xml/itunes_library_test.xml");
        this.itunesParser.load(f.getAbsolutePath());

        verify(musiqueDao, times(4)).save(musiquesCaptor.capture());

        List<Musique> musiques = musiquesCaptor.getAllValues();
        assertEquals(4, musiques.size());

        Musique m = musiques.get(0);
        assertEquals(Integer.valueOf(1), m.getItunesId());
        assertEquals("Shiny Stockings", m.getTitre());
        assertEquals("Ella Fitzgerald", m.getArtiste());
        assertEquals(Integer.valueOf(120), m.getBpm());
        assertEquals(Integer.valueOf(80), m.getClassement());
        assertEquals(Integer.valueOf(131552), m.getDuree());
        assertNull(m.getTimerDebut());
        assertNull(m.getTimerFin());
        // TODO Parse genres
//        assertEquals("Lindy", m.getGenres().get(0).getLabel());
        assertEquals("file://localhost/E:/wamp/www/dancetunes/songs/test-upload/30 - Shiny Stockings.mp3", m.getPath());
        assertEquals("30 - Some comment", m.getCommentaire());

        assertEquals(Integer.valueOf(0), musiques.get(3).getTimerDebut());
        assertEquals(Integer.valueOf(131552), musiques.get(3).getTimerFin());

    }

    @Test
    public void parseFile_shouldSavePlaylists() throws IOException, SAXException, ParserConfigurationException {
        ArgumentCaptor<List> playlistsCaptor = ArgumentCaptor.forClass(List.class);

        File f = new File("src/test/resources/xml/itunes_library_test.xml");
        this.itunesParser.load(f.getAbsolutePath());

        verify(playlistDao).save(playlistsCaptor.capture());

        List<Playlist> playlists = playlistsCaptor.getValue();
        assertEquals(2, playlists.size());

        Playlist folder = playlists.get(0);
        assertEquals(Integer.valueOf(14525), folder.getItunesId());
        assertEquals("Test Folder", folder.getNom());
        assertEquals("42A45B8FD23FA86A", folder.getPersistentId());
        assertNull(folder.getParentPersistentId());
        assertNull(folder.getParent());
        assertEquals(1, folder.getChildren().size());
        assertEquals(2, folder.getMusiques().size());

        Playlist child = playlists.get(1);
        assertEquals(Integer.valueOf(12345), child.getItunesId());
        assertEquals("Test Playlist", child.getNom());
        assertEquals("3E6916F95560A2DD", child.getPersistentId());
        assertEquals("42A45B8FD23FA86A", child.getParentPersistentId());
        assertNotNull(child.getParent());
        assertEquals(Integer.valueOf(14525), child.getParent().getItunesId());
        assertEquals(0, child.getChildren().size());
        assertEquals(2, child.getMusiques().size());
    }


    @Test
    public void parseFile_shouldUpdateMusiqueIfExisting() throws IOException, SAXException, ParserConfigurationException {
        Musique musiqueToUpdate = Musique.builder()
                .id(BigInteger.valueOf(1)).itunesId(1)
                .titre("to update")
                .artiste("to update")
                .classement(20)
                .commentaire("to update")
                .bpm(240)
                .path("to update")
                .timerDebut(10)
                .timerFin(50)
                .updateDate(DateUtils.parseDate("2012-12-24T14:54:43Z", "yyyy-MM-dd'T'HH:mm:ss'Z'"))
                .duree(125) // should not be updated
                .build();
        when(musiqueDao.findByItunesId(eq(1))).thenReturn(musiqueToUpdate);

        File f = new File("src/test/resources/xml/itunes_library_test.xml");
        this.itunesParser.load(f.getAbsolutePath());

        assertEquals("Shiny Stockings", musiqueToUpdate.getTitre());
        assertEquals("Ella Fitzgerald", musiqueToUpdate.getArtiste());
        assertEquals("30 - Some comment", musiqueToUpdate.getCommentaire());
//        assertEquals("file://localhost/E:/wamp/www/dancetunes/songs/test-upload/30 - Shiny Stockings.mp3", musiqueToUpdate.getPath());
        assertEquals(Integer.valueOf(80), musiqueToUpdate.getClassement());
        assertEquals(Integer.valueOf(120), musiqueToUpdate.getBpm());
        assertNull(musiqueToUpdate.getTimerDebut());
        assertNull(musiqueToUpdate.getTimerFin());
//        assertEquals(Integer.valueOf(120), musiqueToUpdate.getUpdateDate());
        // TODO Parse genres
//        assertEquals("Lindy", m.getGenres().get(0).getLabel());

        assertEquals(Integer.valueOf(125), musiqueToUpdate.getDuree());
    }

}