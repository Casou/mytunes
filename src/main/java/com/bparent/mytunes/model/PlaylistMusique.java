package com.bparent.mytunes.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigInteger;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="PLAYLIST_MUSIQUE")
public class PlaylistMusique implements Serializable {

    @Id
    @Column(name="id", nullable = false)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="PLAYLIST_MUSIQUE_SEQ")
    @SequenceGenerator(name="PLAYLIST_MUSIQUE_SEQ", sequenceName="PLAYLIST_MUSIQUE_SEQ", allocationSize=1)
    private BigInteger id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_musique")
    private Musique musique;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_playlist")
    private Playlist playlist;

    @Column(name="musique_order", nullable = false)
    private Integer order;

}
