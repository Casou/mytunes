package com.bparent.mytunes.model;

import com.bparent.mytunes.annotations.ItunesProperty;
import com.bparent.mytunes.util.StringUtils;
import lombok.Data;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name="PLAYLIST")
public class Playlist extends ItunesPropertyEntity {

    @Id
    @ItunesProperty("Playlist ID")
    @Column(name="itunes_id")
    protected BigInteger itunesId;

    @ItunesProperty("Name")
    @Column(name="nom")
    protected String nom;

    @ItunesProperty("Folder")
    @Column(name="is_folder")
    protected Boolean isFolder = Boolean.FALSE;

    @ItunesProperty("Playlist Persistent ID")
    @Column(name="persistent_id")
    protected String persistentId;

    @ItunesProperty("Parent Persistent ID")
    @Column(name="parent_persistent_id")
    protected String parentPersistentId;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "PLAYLIST_MUSIQUE",
            joinColumns = @JoinColumn(name = "id_playlist", referencedColumnName = "itunes_id"),
            inverseJoinColumns = @JoinColumn(name = "id_musique", referencedColumnName = "itunes_id"))
    protected List<Musique> musiques;

    @ManyToOne
    @JoinColumn(name="id_playlist_parent")
    protected Playlist parent;

    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    protected List<Playlist> children = new ArrayList<>();



    @Transient
    private List<BigInteger> tempMusiqueId;




    @Override
    public String toString() {
        return "Playlist ["
                + StringUtils.getStringMaxLengthPadLeft(String.valueOf(this.itunesId), 8, false)
                + " (" + StringUtils.getStringMaxLengthPadLeft(String.valueOf(this.persistentId), 6) + ")"
                + " - " + StringUtils.getStringMaxLengthPadRight(this.nom, 30)+ "] "
                + "[" + (isFolder ? "F" : " ") + (parent != null ? "C" : " ") + "] "
                + "Musiques : " + (tempMusiqueId == null ? "0" : tempMusiqueId.size());
    }

}
