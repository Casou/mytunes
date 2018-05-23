package com.bparent.mytunes.service;

import com.bparent.mytunes.dto.MusiqueDTO;
import com.bparent.mytunes.dto.PlaylistDTO;
import com.bparent.mytunes.dto.PlaylistMusiqueDTO;
import com.bparent.mytunes.model.Musique;
import com.bparent.mytunes.model.Playlist;
import com.bparent.mytunes.model.PlaylistMusique;
import com.bparent.mytunes.repository.PlaylistMusiqueRepository;
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
import java.util.ArrayList;
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

    @Mock
    private PlaylistMusiqueRepository playlistMusiqueRepository;

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
                        PlaylistMusique.builder().id(BigInteger.valueOf(1)).musique(Musique.builder().id(BigInteger.valueOf(1)).build()).build(),
                        PlaylistMusique.builder().id(BigInteger.valueOf(2)).musique(Musique.builder().id(BigInteger.valueOf(2)).build()).build(),
                        PlaylistMusique.builder().id(BigInteger.valueOf(3)).musique(Musique.builder().id(BigInteger.valueOf(3)).build()).build()
                ))
                .build());

        this.playlistService.updatePlaylistOrder(PlaylistDTO.builder()
                .musiquesOrderIds(Arrays.asList(BigInteger.valueOf(1), BigInteger.valueOf(3), BigInteger.valueOf(2)))
                .build());

        verify(this.playlistRepository).save(playlistSavedCaptor.capture());
        List<PlaylistMusique> musiquesOrder = playlistSavedCaptor.getValue().getMusiquesOrder();
        assertEquals(3, musiquesOrder.size());

        assertEquals(0, musiquesOrder.get(0).getOrder().intValue());
        assertEquals(BigInteger.valueOf(1), musiquesOrder.get(0).getMusique().getId());

        assertEquals(1, musiquesOrder.get(1).getOrder().intValue());
        assertEquals(BigInteger.valueOf(3), musiquesOrder.get(1).getMusique().getId());

        assertEquals(2, musiquesOrder.get(2).getOrder().intValue());
        assertEquals(BigInteger.valueOf(2), musiquesOrder.get(2).getMusique().getId());
    }

    @Test
    public void deleteMusiqueFromPlaylist_shouldRemoveMusiqueFromPlaylist() {
        ArgumentCaptor<Playlist> playlistSavedCaptor = ArgumentCaptor.forClass(Playlist.class);
        ArgumentCaptor<PlaylistMusique> playlistMusiqueUpdatedCaptor = ArgumentCaptor.forClass(PlaylistMusique.class);

        when(this.playlistRepository.findById(any(BigInteger.class))).thenReturn(Playlist.builder()
                .musiquesOrder(new ArrayList<>(Arrays.asList(
                        PlaylistMusique.builder().id(BigInteger.valueOf(101)).musique(Musique.builder().id(BigInteger.valueOf(1)).build()).build(),
                        PlaylistMusique.builder().id(BigInteger.valueOf(102)).musique(Musique.builder().id(BigInteger.valueOf(2)).build()).build(),
                        PlaylistMusique.builder().id(BigInteger.valueOf(103)).musique(Musique.builder().id(BigInteger.valueOf(3)).build()).build()
                )))
                .build());

        this.playlistService.deleteMusiqueFromPlaylist(PlaylistDTO.builder()
                .id(BigInteger.valueOf(1))
                .musiqueIds(Arrays.asList(BigInteger.valueOf(2)))
                .build());

        verify(this.playlistRepository).save(playlistSavedCaptor.capture());
        List<PlaylistMusique> musiquesOrder = playlistSavedCaptor.getValue().getMusiquesOrder();
        assertEquals(2, musiquesOrder.size());
        assertEquals(BigInteger.valueOf(1), musiquesOrder.get(0).getMusique().getId());
        assertEquals(BigInteger.valueOf(3), musiquesOrder.get(1).getMusique().getId());

        verify(this.playlistMusiqueRepository).delete(playlistMusiqueUpdatedCaptor.capture());
        PlaylistMusique playlistMusique = playlistMusiqueUpdatedCaptor.getValue();
        assertEquals(102, playlistMusique.getId().intValue());
    }

}