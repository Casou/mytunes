package com.bparent.mytunes.service;

import com.bparent.mytunes.dto.MusiqueDTO;
import com.bparent.mytunes.dto.PlaylistDTO;
import com.bparent.mytunes.dto.PlaylistMusiqueDTO;
import com.bparent.mytunes.model.Musique;
import com.bparent.mytunes.model.Playlist;
import com.bparent.mytunes.model.PlaylistMusique;
import com.bparent.mytunes.repository.MusiqueRepository;
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

import static org.junit.Assert.*;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyList;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.times;
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

    @Mock
    private MusiqueRepository musiqueRepository;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
        when(playlistRepository.save(any(Playlist.class))).thenAnswer(invocationOnMock -> {
            Playlist pl = (Playlist) invocationOnMock.getArguments()[0];
            if (pl.getId() == null) {
                pl.setId(BigInteger.valueOf(123));
            }
            return pl;
        });
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

    @Test
    public void save_shouldSavePlaylistWithoutMusicNorParent() {
        ArgumentCaptor<Playlist> playlistCaptor = ArgumentCaptor.forClass(Playlist.class);

        playlistService.save(PlaylistDTO.builder().nom("Test").build());

        verify((this.playlistRepository)).save(playlistCaptor.capture());
        Playlist playlistSaved = playlistCaptor.getValue();
        assertEquals(BigInteger.valueOf(123), playlistSaved.getId());
        assertEquals("Test", playlistSaved.getNom());
        assertFalse(playlistSaved.getIsFolder());
    }

    @Test
    public void save_shouldReturnDtoWithId() {
        PlaylistDTO playlist = playlistService.save(PlaylistDTO.builder().nom("Test").build());

        assertEquals(BigInteger.valueOf(123), playlist.getId());
        assertEquals("Test", playlist.getNom());
    }

    @Test
    public void save_shouldSavePlaylistWithMusicAndParent() {
        ArgumentCaptor<Playlist> playlistCaptor = ArgumentCaptor.forClass(Playlist.class);

        when(musiqueRepository.findByIdIn(anyList())).thenReturn(Arrays.asList(
                Musique.builder().id(BigInteger.valueOf(1)).build(),
                Musique.builder().id(BigInteger.valueOf(2)).build()
        ));
        when(playlistRepository.findById(eq(BigInteger.valueOf(321)))).thenReturn(
                Playlist.builder().id(BigInteger.valueOf(321)).build()
        );

        playlistService.save(PlaylistDTO.builder().nom("Test")
                .parentId(BigInteger.valueOf(321))
                .musiqueIds(Arrays.asList(BigInteger.valueOf(1), BigInteger.valueOf(2)))
                .build());

        verify((this.playlistRepository)).save(playlistCaptor.capture());
        Playlist playlistSaved = playlistCaptor.getValue();
        assertEquals(2, playlistSaved.getMusiquesOrder().size());

        assertEquals(1, playlistSaved.getMusiquesOrder().get(0).getMusique().getId().intValue());
        assertEquals(0, playlistSaved.getMusiquesOrder().get(0).getOrder().intValue());
        assertEquals(playlistSaved, playlistSaved.getMusiquesOrder().get(0).getPlaylist());
        assertEquals(2, playlistSaved.getMusiquesOrder().get(1).getMusique().getId().intValue());
        assertEquals(1, playlistSaved.getMusiquesOrder().get(1).getOrder().intValue());
        assertEquals(playlistSaved, playlistSaved.getMusiquesOrder().get(1).getPlaylist());

        assertNotNull(playlistSaved.getParent());
        assertEquals(BigInteger.valueOf(321), playlistSaved.getParent().getId());
    }

    @Test
    public void save_shouldDeleteExistingPlaylist() {
        ArgumentCaptor<Playlist> playlistCaptor = ArgumentCaptor.forClass(Playlist.class);

        when(musiqueRepository.findByIdIn(anyList())).thenReturn(Arrays.asList(
                Musique.builder().id(BigInteger.valueOf(1)).build(),
                Musique.builder().id(BigInteger.valueOf(2)).build()
        ));
        when(playlistRepository.findById(eq(BigInteger.valueOf(321)))).thenReturn(
                Playlist.builder().id(BigInteger.valueOf(321)).build()
        );
        when(playlistRepository.findByNomAndParentId("Test", BigInteger.valueOf(321)))
                .thenReturn(Playlist.builder().id(BigInteger.valueOf(999)).build());

        playlistService.save(PlaylistDTO.builder().nom("Test")
                .parentId(BigInteger.valueOf(321))
                .musiqueIds(Arrays.asList(BigInteger.valueOf(1), BigInteger.valueOf(2)))
                .build());

        verify((this.playlistRepository)).delete(playlistCaptor.capture());
        assertEquals(999, playlistCaptor.getValue().getId().intValue());
    }

    @Test
    public void reorderPlaylistTree_shouldSavePlaylistWithRightParent() {
        ArgumentCaptor<Playlist> playlistCaptor = ArgumentCaptor.forClass(Playlist.class);

        when(this.playlistRepository.findAll()).thenReturn(Arrays.asList(
                Playlist.builder().id(BigInteger.valueOf(1)).build(),
                Playlist.builder().id(BigInteger.valueOf(2)).build(),
                Playlist.builder().id(BigInteger.valueOf(3)).build(),
                Playlist.builder().id(BigInteger.valueOf(4)).build()
        ));

        PlaylistDTO dto = PlaylistDTO.builder()
                .id(null)
                .children(Arrays.asList(
                        PlaylistDTO.builder()
                                .id(BigInteger.valueOf(1))
                                .parentId(null)
                                .children(Arrays.asList(
                                        PlaylistDTO.builder().id(BigInteger.valueOf(2)).parentId(BigInteger.valueOf(1)).build(),
                                        PlaylistDTO.builder().id(BigInteger.valueOf(3))
                                                .parentId(BigInteger.valueOf(1))
                                                .children(Arrays.asList(
                                                        PlaylistDTO.builder().id(BigInteger.valueOf(4))
                                                                .parentId(BigInteger.valueOf(3  ))
                                                                .build()
                                                ))
                                                .build()
                                ))
                                .build()
                )).build();
        this.playlistService.reorderPlaylistTree(dto);

        verify(this.playlistRepository, times(4)).save(playlistCaptor.capture());

        List<Playlist> allPlaylistSaved = playlistCaptor.getAllValues();
        assertEquals(4, allPlaylistSaved.size());

        assertEquals(1, allPlaylistSaved.get(0).getId().intValue());
        assertNull(allPlaylistSaved.get(0).getParent());

        assertEquals(2, allPlaylistSaved.get(1).getId().intValue());
        assertNotNull(allPlaylistSaved.get(1).getParent());
        assertEquals(1, allPlaylistSaved.get(1).getParent().getId().intValue());

        assertEquals(3, allPlaylistSaved.get(2).getId().intValue());
        assertNotNull(allPlaylistSaved.get(2).getParent());
        assertEquals(1, allPlaylistSaved.get(2).getParent().getId().intValue());

        assertEquals(4, allPlaylistSaved.get(3).getId().intValue());
        assertNotNull(allPlaylistSaved.get(3).getParent());
        assertEquals(3, allPlaylistSaved.get(3).getParent().getId().intValue());
    }

    @Test
    public void addMusiqueToPlaylist_shouldAddAMusiqueWithOrder1IfNoExistingMusique() {
        ArgumentCaptor<Playlist> playlistCaptor = ArgumentCaptor.forClass(Playlist.class);

        when(this.playlistRepository.findById(BigInteger.valueOf(1))).thenReturn(Playlist.builder().musiquesOrder(new ArrayList<>()).build());
        when(this.musiqueRepository.findById(BigInteger.valueOf(2))).thenReturn(Musique.builder().id(BigInteger.valueOf(2)).build());

        this.playlistService.addMusiqueToPlaylist(PlaylistMusiqueDTO.builder()
                .playlist(PlaylistDTO.builder().id(BigInteger.valueOf(1)).build())
                .musique(MusiqueDTO.builder().id(BigInteger.valueOf(2)).build())
                .build());

        verify(this.playlistRepository).save(playlistCaptor.capture());
        Playlist playlistSaved = playlistCaptor.getValue();
        assertEquals(1, playlistSaved.getMusiquesOrder().size());
        assertEquals(1, playlistSaved.getMusiquesOrder().get(0).getOrder().intValue());
    }

    @Test
    public void addMusiqueToPlaylist_shouldAddAMusiqueWithMaxPlusOneOrder1IfMusiquesExist() {
        ArgumentCaptor<Playlist> playlistCaptor = ArgumentCaptor.forClass(Playlist.class);

        when(this.playlistRepository.findById(BigInteger.valueOf(1))).thenReturn(Playlist.builder()
                .musiquesOrder(new ArrayList<>(Arrays.asList(
                        PlaylistMusique.builder().order(1).build(),
                        PlaylistMusique.builder().order(2).build(),
                        PlaylistMusique.builder().order(100).build()
                )))
                .build());
        when(this.musiqueRepository.findById(BigInteger.valueOf(2))).thenReturn(Musique.builder().id(BigInteger.valueOf(2)).build());

        this.playlistService.addMusiqueToPlaylist(PlaylistMusiqueDTO.builder()
                .playlist(PlaylistDTO.builder().id(BigInteger.valueOf(1)).build())
                .musique(MusiqueDTO.builder().id(BigInteger.valueOf(2)).build())
                .build());

        verify(this.playlistRepository).save(playlistCaptor.capture());
        Playlist playlistSaved = playlistCaptor.getValue();
        assertEquals(4, playlistSaved.getMusiquesOrder().size());
        assertEquals(101, playlistSaved.getMusiquesOrder().get(3).getOrder().intValue());
    }

}