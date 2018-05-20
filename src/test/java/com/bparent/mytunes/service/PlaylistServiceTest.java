package com.bparent.mytunes.service;

import com.bparent.mytunes.dto.MusiqueDTO;
import com.bparent.mytunes.dto.PlaylistDTO;
import com.bparent.mytunes.dto.PlaylistMusiqueDTO;
import com.bparent.mytunes.model.Musique;
import com.bparent.mytunes.model.Playlist;
import com.bparent.mytunes.model.PlaylistMusique;
import com.bparent.mytunes.repository.PlaylistRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.runners.MockitoJUnitRunner;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class PlaylistServiceTest {

    @InjectMocks
    private PlaylistService playlistService;

    @Mock
    private PlaylistRepository playlistRepository;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void updatePlaylistNom_shouldUpdateNom() {
        ArgumentCaptor<Playlist> playlistSavedCaptor = ArgumentCaptor.forClass(Playlist.class);
        when(this.playlistRepository.findById(any(BigInteger.class))).thenReturn(Playlist.builder().nom("A modifier").build());

        this.playlistService.updatePlaylistNom(PlaylistDTO.builder().id(BigInteger.valueOf(1)).nom("Playlist").build());

        verify(this.playlistRepository).save(playlistSavedCaptor.capture());
        assertEquals("Playlist", playlistSavedCaptor.getValue().getNom());
    }

    @Test
    public void updatePlaylistOrder_shouldReorderMusiques() {
        ArgumentCaptor<Playlist> playlistSavedCaptor = ArgumentCaptor.forClass(Playlist.class);
        when(this.playlistRepository.findById(any(BigInteger.class))).thenReturn(Playlist.builder()
                .musiquesOrder(Arrays.asList(
                        PlaylistMusique.builder().musique(Musique.builder().id(BigInteger.valueOf(1)).build()).build(),
                        PlaylistMusique.builder().musique(Musique.builder().id(BigInteger.valueOf(3)).build()).build(),
                        PlaylistMusique.builder().musique(Musique.builder().id(BigInteger.valueOf(2)).build()).build()
                ))
                .build());

        this.playlistService.updatePlaylistOrder(PlaylistDTO.builder()
                .musiquesOrder(Arrays.asList(
                        PlaylistMusiqueDTO.builder().musique(MusiqueDTO.builder().id(BigInteger.valueOf(1)).build()).build(),
                        PlaylistMusiqueDTO.builder().musique(MusiqueDTO.builder().id(BigInteger.valueOf(2)).build()).build(),
                        PlaylistMusiqueDTO.builder().musique(MusiqueDTO.builder().id(BigInteger.valueOf(3)).build()).build()
                ))
                .build());

        verify(this.playlistRepository).save(playlistSavedCaptor.capture());
        List<PlaylistMusique> musiquesOrder = playlistSavedCaptor.getValue().getMusiquesOrder();
        assertEquals(0, musiquesOrder.get(0).getOrder().intValue());
        assertEquals(BigInteger.valueOf(1), musiquesOrder.get(0).getMusique().getId());
        assertEquals(1, musiquesOrder.get(1).getOrder().intValue());
        assertEquals(BigInteger.valueOf(2), musiquesOrder.get(1).getMusique().getId());
        assertEquals(2, musiquesOrder.get(2).getOrder().intValue());
        assertEquals(BigInteger.valueOf(3), musiquesOrder.get(2).getMusique().getId());
    }

}