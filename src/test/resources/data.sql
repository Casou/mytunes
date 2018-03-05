INSERT INTO MUSIQUE(itunes_id, nom) VALUES (1, 'mus1-nom');
INSERT INTO MUSIQUE(itunes_id, nom) VALUES (2, 'mus2-nom');
INSERT INTO MUSIQUE(itunes_id, nom) VALUES (3, 'mus3-nom');

INSERT INTO PLAYLIST(itunes_id, nom) VALUES (1, 'pl1-nom');
INSERT INTO PLAYLIST(itunes_id, nom) VALUES (2, 'pl2-nom');

INSERT INTO PLAYLIST_MUSIQUE(id_playlist, id_musique) VALUES (1, 1);
INSERT INTO PLAYLIST_MUSIQUE(id_playlist, id_musique) VALUES (1, 2);
