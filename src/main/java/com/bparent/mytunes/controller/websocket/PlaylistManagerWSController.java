package com.bparent.mytunes.controller.websocket;

import com.bparent.mytunes.controller.websocket.constants.LecteurStatus;
import com.bparent.mytunes.controller.websocket.dto.LecteurStatusDto;
import com.bparent.mytunes.dto.MusiqueDTO;
import com.bparent.mytunes.dto.PlaylistManagerDTO;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PlaylistManagerWSController {

    private static final LecteurStatusDto LECTEUR_STATUS = LecteurStatusDto.builder()
            .status(LecteurStatus.PAUSE)
            .musique(null)
            .time(0)
            .volume(0.25)
            .build();

    @GetMapping("/lecteur/status")
    public LecteurStatusDto getStatus() {
        return LECTEUR_STATUS;
    }

    @MessageMapping("/action/lecteur/play")
    @SendTo("/topic/lecteur/play")
    public LecteurStatusDto playLecteur(MusiqueDTO musiqueDTO) {
        if (musiqueDTO != null) {
            LECTEUR_STATUS.setMusique(musiqueDTO);
        }
        LECTEUR_STATUS.setStatus(LecteurStatus.PLAY);
        return LECTEUR_STATUS;
    }

    @MessageMapping("/action/lecteur/pause")
    @SendTo("/topic/lecteur/pause")
    public LecteurStatusDto pauseLecteur(MusiqueDTO musiqueDTO) {
        if (musiqueDTO != null) {
            LECTEUR_STATUS.setMusique(musiqueDTO);
        }
        LECTEUR_STATUS.setStatus(LecteurStatus.PAUSE);
        return LECTEUR_STATUS;
    }

    @MessageMapping("/action/lecteur/updateTime")
    @SendTo("/topic/lecteur/time")
    public LecteurStatusDto updateTimeLecteur(LecteurStatusDto updateTime) {
        LECTEUR_STATUS.setTime(updateTime.getTime());
        return LECTEUR_STATUS;
    }

    @MessageMapping("/action/lecteur/updateVolume")
    @SendTo("/topic/lecteur/volume")
    public LecteurStatusDto updateVolumeLecteur(LecteurStatusDto updateTime) {
        LECTEUR_STATUS.setVolume(updateTime.getVolume());
        return LECTEUR_STATUS;
    }

    @MessageMapping("/action/lecteur/seekTime")
    @SendTo("/topic/lecteur/seek")
    public LecteurStatusDto seekTimeLecteur(LecteurStatusDto updateTime) {
        LECTEUR_STATUS.setTime(updateTime.getTime());
        return LECTEUR_STATUS;
    }

    @MessageMapping("/action/lecteur/playNextSong")
    @SendTo("/topic/lecteur/playNextSong")
    public LecteurStatusDto playNextSong(LecteurStatusDto musiqueDTO) {
        LECTEUR_STATUS.setMusique(musiqueDTO.getMusique());
        return LECTEUR_STATUS;
    }

    @MessageMapping("/action/lecteur/playPrevSong")
    @SendTo("/topic/lecteur/playPrevSong")
    public LecteurStatusDto playPrevSong(LecteurStatusDto musiqueDTO) {
        LECTEUR_STATUS.setMusique(musiqueDTO.getMusique());
        return LECTEUR_STATUS;
    }

    @MessageMapping("/action/lecteur/getCurrentPlaylist")
    @SendTo("/topic/lecteur/getCurrentPlaylist")
    public LecteurStatusDto getCurrentPlaylistPing() {
        return LECTEUR_STATUS;
    }

    @MessageMapping("/action/lecteur/setCurrentPlaylist")
    @SendTo("/topic/lecteur/setCurrentPlaylist")
    public PlaylistManagerDTO setCurrentPlaylist(PlaylistManagerDTO playlistManager) {
        return playlistManager;
    }


    @MessageMapping("/request/lecteur/playNextSong")
    @SendTo("/topic/request/lecteur/playNextSong")
    public LecteurStatusDto requestPlayNextSong() {
        return LECTEUR_STATUS;
    }

    @MessageMapping("/request/lecteur/playPrevSong")
    @SendTo("/topic/request/lecteur/playPrevSong")
    public LecteurStatusDto requestPlayPrevSong() {
        return LECTEUR_STATUS;
    }

    @MessageMapping("/action/lecteur/error")
    @SendTo("/topic/lecteur/error")
    public MusiqueDTO errorSong(MusiqueDTO musiqueDTO) {
        return musiqueDTO;
    }

}
