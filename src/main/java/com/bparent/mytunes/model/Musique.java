package com.bparent.mytunes.model;

import com.bparent.mytunes.annotations.ItunesProperty;
import com.bparent.mytunes.util.StringUtils;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name="MUSIQUE")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Musique extends ItunesPropertyEntity {

    @Id
    @ItunesProperty("Track ID")
    @Column(name="itunes_id")
    protected BigInteger itunesId;

    @ItunesProperty("Name")
    @Column(name="titre")
    protected String titre;

    @ItunesProperty("Artist")
    @Column(name="artiste")
    protected String artiste;

//    @ItunesProperty("Genre")
    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
            name = "MUSIQUE_GENRES",
            joinColumns = { @JoinColumn(name = "musique_id", referencedColumnName = "itunes_id") },
            inverseJoinColumns = { @JoinColumn(name = "genre_id", referencedColumnName = "id") }
    )
    protected List<Genre> genres;

    @ItunesProperty("Total Time")
    @Column(name="duree")
    protected BigInteger duree;

    @ItunesProperty("Start Time")
    @Column(name="timer_debut")
    protected BigInteger timerDebut;

    @ItunesProperty("Stop Time")
    @Column(name="timer_fin")
    protected BigInteger timerFin;

    @ItunesProperty("BPM")
    @Column(name="bpm")
    protected BigInteger bpm;

    @ItunesProperty("Rating")
    @Column(name="classement")
    protected BigInteger classement;

    @ItunesProperty("Comments")
    @Column(name="commentaire")
    protected String commentaire;

    @ItunesProperty("Location")
    @Column(name="path")
    protected String path;



    public String getBpmFormated() {
        if (this.bpm == null) {
            return "//";
        }
        return String.valueOf(this.bpm.intValue() / 4);
    }

    public String getClassementFormated() {
        if (this.classement == null) {
            return "-";
        }
        return String.valueOf(this.classement.intValue() / 20);
    }

    public String getDureeFormatee() {
        if (this.duree == null) {
            return "--:--";
        }
        Integer dureeMinutes = this.duree.intValue() / 60000;
        Integer dureeSecondes = (this.duree.intValue() / 1000) % 60;

        return StringUtils.padZeroLeft(dureeMinutes, 2) + ":" + StringUtils.padZeroLeft(dureeSecondes, 2);
    }

    @Override
    public String toString() {
        return "Musique ["
                + StringUtils.getStringMaxLengthPadLeft(String.valueOf(this.itunesId), 5, false) + ", "
                + this.getBpmFormated()
                + " - " + StringUtils.getStringMaxLengthPadRight(this.titre, 30)
                + " (" + this.getDureeFormatee() + ")"
                + " / " + StringUtils.getStringMaxLengthPadRight(this.genres.stream()
                        .map(genre -> genre.getLabel())
                        .collect(Collectors.joining(", ")), 25) + "]"
                + "    Classement [" + this.getClassementFormated() + "] "
                + "    Path [" + this.path + "]";
    }

}
