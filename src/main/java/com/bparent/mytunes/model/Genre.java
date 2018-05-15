package com.bparent.mytunes.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigInteger;

@Entity
@Table(name="GENRE")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Genre {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="GENRE_SEQ")
    @SequenceGenerator(name="GENRE_SEQ", sequenceName="GENRE_SEQ", allocationSize=1)
    protected BigInteger id;

    @Column(name="label", nullable = false, unique = true)
    protected String label;

}
