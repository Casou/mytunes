INSERT INTO MUSIQUE(itunes_id, titre) VALUES (1, 'mus1-titre');
INSERT INTO MUSIQUE(itunes_id, titre) VALUES (2, 'mus2-titre');
INSERT INTO MUSIQUE(itunes_id, titre) VALUES (3, 'mus3-titre');

INSERT INTO PLAYLIST(itunes_id, nom) VALUES (1, 'pl1-titre');
INSERT INTO PLAYLIST(itunes_id, nom) VALUES (2, 'pl2-titre');

INSERT INTO PLAYLIST_MUSIQUE(id_playlist, id_musique) VALUES (1, 1);
INSERT INTO PLAYLIST_MUSIQUE(id_playlist, id_musique) VALUES (1, 2);
