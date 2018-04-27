package com.bparent.mytunes.controller.websocket;

import com.bparent.mytunes.dto.BasicCodeLabelDto;
import com.bparent.mytunes.dto.UpdateClassementDTO;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class PlaylistWSController {

    @MessageMapping("/action/musiques/updateClassement")
    @SendTo("/topic/musiques/updateClassement")
    public BasicCodeLabelDto updateClassement(UpdateClassementDTO updateClassementDTO) {
        System.out.println("\n\n\n\n\n\n\nUPDATE CLASSEMENT\n\n\n\n\n\n\n--------------------------------");
        return new BasicCodeLabelDto("message", "ok");
    }

}
