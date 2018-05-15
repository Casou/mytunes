INSERT INTO MUSIQUE(id, itunes_id, titre) VALUES (1, 1, 'mus1-titre');
INSERT INTO MUSIQUE(id, itunes_id, titre) VALUES (2, 2, 'mus2-titre');
INSERT INTO MUSIQUE(id, itunes_id, titre) VALUES (3, 3, 'mus3-titre');

INSERT INTO PLAYLIST(id, itunes_id, nom) VALUES (1, 1, 'pl1-titre');
INSERT INTO PLAYLIST(id, itunes_id, nom) VALUES (2, 2, 'pl2-titre');

INSERT INTO PLAYLIST_MUSIQUE(id_playlist, id_musique) VALUES (1, 1);
INSERT INTO PLAYLIST_MUSIQUE(id_playlist, id_musique) VALUES (1, 2);

INSERT INTO GENRE (id, label) VALUES (1, 'Lindy');
INSERT INTO GENRE (id, label) VALUES (2, 'Boogie');
INSERT INTO GENRE (id, label) VALUES (3, 'WCS');

ALTER SEQUENCE IF EXISTS MUSIQUE_SEQ RESTART WITH 4;
ALTER SEQUENCE IF EXISTS PLAYLIST_SEQ RESTART WITH 3;
ALTER SEQUENCE IF EXISTS GENRE_SEQ RESTART WITH 4;