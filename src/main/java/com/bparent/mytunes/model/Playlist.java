package com.bparent.mytunes.model;

import com.bparent.mytunes.annotations.ItunesProperty;
import com.bparent.mytunes.util.StringUtils;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@EqualsAndHashCode(callSuper=true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="PLAYLIST")
public class Playlist extends ItunesPropertyEntity implements Serializable {

    @Id
    @Column(name="id", nullable = false)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="PLAYLIST_SEQ")
    @SequenceGenerator(name="PLAYLIST_SEQ", sequenceName="PLAYLIST_SEQ", allocationSize=1)
    protected BigInteger id;

    @ItunesProperty("Playlist ID")
    @Column(name="itunes_id")
    protected Integer itunesId;

    @ItunesProperty("Name")
    @Column(name="nom", nullable = false)
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

    @OneToMany(mappedBy = "playlist", cascade = CascadeType.ALL)
    @OrderBy("musique_order ASC")
    protected List<PlaylistMusique> musiquesOrder;

    @ManyToOne
    @JoinColumn(name="id_playlist_parent")
    protected Playlist parent;

    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    protected List<Playlist> children = new ArrayList<>();



    @Transient
    private List<Integer> tempMusiqueITunesId;




    @Override
    public String toString() {
        return "Playlist ["
                + StringUtils.getStringMaxLengthPadLeft(String.valueOf(this.itunesId), 8, false)
                + " (" + StringUtils.getStringMaxLengthPadLeft(String.valueOf(this.persistentId), 6) + ")"
                + " - " + StringUtils.getStringMaxLengthPadRight(this.nom, 30)+ "] "
                + "[" + (isFolder ? "F" : " ") + (parent != null ? "C" : " ") + "] "
                + "Musiques : " + (tempMusiqueITunesId == null ? "0" : tempMusiqueITunesId.size());
    }

}
