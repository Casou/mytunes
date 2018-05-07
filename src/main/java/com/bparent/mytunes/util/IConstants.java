package com.bparent.mytunes.util;

import java.util.Arrays;
import java.util.List;

public interface IConstants {

    public static final List<String> AUDIO_EXTENSION_ACCEPTED = Arrays.asList("mp3", "ogg", "wav", "m4a");

    public interface IPath {
        public static final String MEDIAS = "medias/";
        public static final String MUSIQUES = MEDIAS + "musiques/";
    }

    public interface IHandler {
        public static final String MUSIQUES_HANDLER = "handler/musiques/";
    }
}
