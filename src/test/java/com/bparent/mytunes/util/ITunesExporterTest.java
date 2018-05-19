package com.bparent.mytunes.util;

import com.bparent.mytunes.bean.ExportProperties;
import com.bparent.mytunes.model.Musique;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.runners.MockitoJUnitRunner;

import java.io.IOException;
import java.math.BigInteger;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class ITunesExporterTest {

    @InjectMocks
    private ITunesExporter iTunesExporter;

    @Mock
    private Shell shell;

    @Mock
    private FileUtils fileUtils;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
        ITunesExporter.ffmpegCommand = "ffmpeg32";

        when(fileUtils.findUnexistingFileName(anyString())).thenAnswer(mock -> mock.getArguments()[0].toString());
    }

    @Test
    public void shouldExecuteTheRightCommand() throws IOException {
        ArgumentCaptor<String> cmdCaptor = ArgumentCaptor.forClass(String.class);
        iTunesExporter.exportTracks(buildMusiques(), "output/folder", buildExtractProperties());

        verify(shell, times(2)).exec(cmdCaptor.capture());

        assertEquals("ffmpeg32 -i \"path/to/Song.mp3\" -metadata title=\"Song\" -metadata artist=\"Artiste\" -metadata album=\"Album in 'properties'\" -metadata TBPM=\"240\" -metadata comment=\"Commentaire\" \"output/folder/60 - Song.mp3\"", cmdCaptor.getAllValues().get(0));
        assertEquals("ffmpeg32 -i \"second/path/to/Another Song.mp3\" -metadata title=\"Another Song\" -metadata album=\"Album in 'properties'\" -metadata comment=\"Commentaire Another Song\" \"output/folder/Another Song.mp3\"", cmdCaptor.getAllValues().get(1));
    }



    private ExportProperties buildExtractProperties() {
        ExportProperties properties = new ExportProperties();
        properties.setAlbum("Album in \"properties\"");
        properties.setGenre("Genre in properties");
        return properties;
    }

    private List<Musique> buildMusiques() {
        return Arrays.asList(
                Musique.builder().id(BigInteger.valueOf(1234)).itunesId(4321).titre("Song").artiste("Artiste").bpm(240).duree(120).classement(5).commentaire("Commentaire").path("path/to/Song.mp3").build(),
                Musique.builder().id(BigInteger.valueOf(2234)).itunesId(4322).titre("Another Song").classement(4).commentaire("Commentaire Another Song").path("second/path/to/Another Song.mp3").build()
        );
    }

}