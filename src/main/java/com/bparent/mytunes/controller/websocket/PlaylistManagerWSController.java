package com.bparent.mytunes.controller.websocket;

import com.bparent.mytunes.controller.websocket.constants.LecteurStatus;
import com.bparent.mytunes.controller.websocket.dto.LecteurStatusDto;
import com.bparent.mytunes.dto.BasicCodeLabelDto;
import com.bparent.mytunes.dto.MusiqueDTO;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PlaylistManagerWSController {

    private static final LecteurStatusDto LECTEUR_STATUS = LecteurStatusDto.builder()
            .status(LecteurStatus.PAUSE)
            .musique(null)
            .time(0)
            .build();

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

}
