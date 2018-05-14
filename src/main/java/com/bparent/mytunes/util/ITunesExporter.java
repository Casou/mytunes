package com.bparent.mytunes.util;

import com.bparent.mytunes.bean.ExportProperties;
import com.bparent.mytunes.model.Musique;
import lombok.Data;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.math.BigInteger;
import java.util.List;
import java.util.function.Function;

@Data
@Log4j
public class ITunesExporter {

    private Function<String, String> addQuotes = string -> "\"" + string + "\"";

    public static String ffmpegCommand;

    @Autowired
    private Shell shell;

    @Autowired
    private FileUtils fileUtils;


    public void exportTracks(List<Musique> tracksToExport, String pathToFolder, ExportProperties properties) {
        tracksToExport.forEach(track -> this.exportTrack(track, pathToFolder, properties));
    }

    private void exportTrack(Musique track, String pathToFolder, ExportProperties properties) {
        String sourceFilePath = addQuotes.apply(cleanCommandOption(track.getPath()));
        String destinationPath = addQuotes.apply(buildDestinationFilePath(track, pathToFolder));

        String options = buildOptions(track, properties);

        try {
            shell.exec(ITunesExporter.ffmpegCommand + " -i " + sourceFilePath + options + " " + destinationPath);
        } catch (IOException e) {
            log.error("Error while exporting track " + track.getTitre(), e);
        }
    }

    private String buildOptions(Musique track, ExportProperties properties) {
        StringBuilder optionsBuilder = new StringBuilder();
        optionsBuilder
                .append(buildOption("title", track.getTitre()))
                .append(buildOption("artist", track.getArtiste()))
                .append(buildOption("album", properties.getAlbum()))
                .append(buildOption("TBPM", track.getBpm()))
                .append(buildOption("comment", track.getCommentaire()))
        ;
        return optionsBuilder.toString();
    }

    private String buildOption(String name, Object value) {
        if (value != null) {
            return new StringBuilder().append(" -metadata ").append(name).append("=\"").append(cleanCommandOption(value.toString())).append("\"").toString();
        }
        return "";
    }

    private String buildDestinationFilePath(Musique track, String pathToFolder) {
        String bpm = "";
        if (track.getBpm() != null) {
            bpm = (track.getBpm() / 4) + " - ";
        }

        String fileName = pathToFolder + "/" + bpm + track.getTitre() + ".mp3";
        fileName = fileName.replace("\\", "/");
        return fileUtils.findUnexistingFileName(fileName);
    }

    private String cleanCommandOption(String optionValue) {
        return optionValue.replace("\"", "'");
    }
}
