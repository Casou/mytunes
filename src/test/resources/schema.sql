DROP TABLE MUSIQUE IF EXISTS;
CREATE TABLE MUSIQUE(
  id INT(11) NOT NULL PRIMARY KEY,
  itunes_id INT(11) NULL,
  titre VARCHAR(100) NOT NULL,
  artiste VARCHAR(100) NULL,
  genre VARCHAR(100) NULL,
  duree INT(11) NULL,
  timer_debut INT(11) NULL,
  timer_fin INT(11) NULL,
  bpm INT(11) NULL,
  classement INT(3) NULL,
  commentaire VARCHAR(255) NULL,
  path VARCHAR(255) NULL,
  update_date TIMESTAMP NULL
);

DROP TABLE PLAYLIST IF EXISTS;
CREATE TABLE PLAYLIST(
  id INT(11) NOT NULL PRIMARY KEY,
  itunes_id INT(11) NULL,
  nom VARCHAR(100) NOT NULL,
  is_folder INT(1) NULL,
  persistent_id VARCHAR(30) NULL,
  parent_persistent_id VARCHAR(30) NULL,
  id_playlist_parent INT(11) NULL
);

DROP TABLE PLAYLIST_MUSIQUE IF EXISTS;
CREATE TABLE PLAYLIST_MUSIQUE (
  id INT(11) NOT NULL PRIMARY KEY,
  id_playlist INT(11) NOT NULL,
  id_musique INT(11) NOT NULL,
  musique_order INT(11) NOT NULL
);

DROP TABLE GENRE IF EXISTS;
CREATE TABLE GENRE (
  id INT(11) NOT NULL PRIMARY KEY,
  label VARCHAR(100) NOT NULL
);


DROP TABLE MUSIQUE_GENRES IF EXISTS;
CREATE TABLE MUSIQUE_GENRES (
  id_genre INT(11) NOT NULL,
  id_musique INT(11) NOT NULL
);

ALTER TABLE MUSIQUE_GENRES ADD CONSTRAINT PK_MUSIQUE_GENRES PRIMARY KEY (id_genre, id_musique);