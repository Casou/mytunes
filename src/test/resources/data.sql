INSERT INTO MUSIQUE(id, itunes_id, titre, duree) VALUES (1, 1, 'mus1-titre', 100);
INSERT INTO MUSIQUE(id, itunes_id, titre, duree) VALUES (2, 2, 'mus2-titre', 200);
INSERT INTO MUSIQUE(id, itunes_id, titre, duree) VALUES (3, 3, 'mus3-titre', 300);

INSERT INTO PLAYLIST(id, itunes_id, nom, is_folder, id_playlist_parent) VALUES (1, 1, 'pl1-titre', false, null);
INSERT INTO PLAYLIST(id, itunes_id, nom, is_folder, id_playlist_parent) VALUES (2, 2, 'pl2-titre', true, null);
INSERT INTO PLAYLIST(id, itunes_id, nom, is_folder, id_playlist_parent) VALUES (3, 3, 'pl3-titre', false, 2);

INSERT INTO PLAYLIST_MUSIQUE(id, id_playlist, id_musique, musique_order) VALUES (1, 1, 1, 1);
INSERT INTO PLAYLIST_MUSIQUE(id, id_playlist, id_musique, musique_order) VALUES (2, 1, 3, 2);
INSERT INTO PLAYLIST_MUSIQUE(id, id_playlist, id_musique, musique_order) VALUES (3, 1, 2, 3);

INSERT INTO GENRE (id, label) VALUES (1, 'Lindy');
INSERT INTO GENRE (id, label) VALUES (2, 'Boogie');
INSERT INTO GENRE (id, label) VALUES (3, 'WCS');

ALTER SEQUENCE IF EXISTS MUSIQUE_SEQ RESTART WITH 4;
ALTER SEQUENCE IF EXISTS PLAYLIST_SEQ RESTART WITH 4;
ALTER SEQUENCE IF EXISTS GENRE_SEQ RESTART WITH 4;