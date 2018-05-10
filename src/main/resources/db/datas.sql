DELETE FROM PLAYLIST_MUSIQUE;
DELETE FROM PLAYLIST;
DELETE FROM MUSIQUE_GENRES;
DELETE FROM MUSIQUE;
DELETE FROM GENRE;

INSERT INTO MUSIQUE(id, artiste, bpm, commentaire, duree, path, titre) VALUES (MUSIQUE_SEQ.nextval, 'Jeff Healey', 220, null, 156, '01 I Would Do Anything For You.mp3', 'I Would Do Anything For You');
INSERT INTO MUSIQUE(id, artiste, bpm, commentaire, duree, path, titre) VALUES (MUSIQUE_SEQ.nextval, 'Sidney Bechet', 200, null, 170, '01 Muskrat Ramble (Ory).mp3', 'Muskrat Ramble');
INSERT INTO MUSIQUE(id, artiste, bpm, commentaire, duree, path, titre) VALUES (MUSIQUE_SEQ.nextval, 'Marc Laferrière', 240, 'Choré Balboa', 145, '01 Perdido street stomp.mp3', 'Perdido street stomp');
INSERT INTO MUSIQUE(id, artiste, bpm, commentaire, duree, path, titre) VALUES (MUSIQUE_SEQ.nextval, 'The Hep Chaps', 165, null, 204, '01 Swingin'' on Nothing.mp3', 'Swingin'' on Nothing');
INSERT INTO MUSIQUE(id, artiste, bpm, commentaire, duree, path, titre) VALUES (MUSIQUE_SEQ.nextval, 'Paolo Conte', 165, null, 156, '01 Via Con Me.mp3', 'Via Con Me');
INSERT INTO MUSIQUE(id, artiste, bpm, commentaire, duree, path, titre) VALUES (MUSIQUE_SEQ.nextval, 'Biliie Holiday', 185, null, 195, '1-16 Spreadin'' Rhythm Around', 'Spreadin'' Rhythm Around');
INSERT INTO MUSIQUE(id, artiste, bpm, commentaire, duree, path, titre) VALUES (MUSIQUE_SEQ.nextval, 'Blue Skies', 138, null, 168, '02 Blue Skies.mp3', 'Blue Skies');
INSERT INTO MUSIQUE(id, artiste, bpm, commentaire, duree, path, titre) VALUES (MUSIQUE_SEQ.nextval, 'The Bruce Fowler Big Band', 210, null, 188, '02 Chicago Shake', 'Chicago Shake');

INSERT INTO GENRE(id, label) VALUES (GENRE_SEQ.nextval, 'Lindy');
INSERT INTO GENRE(id, label) VALUES (GENRE_SEQ.nextval, 'Balboa');
INSERT INTO GENRE(id, label) VALUES (GENRE_SEQ.nextval, '4 temps');
INSERT INTO GENRE(id, label) VALUES (GENRE_SEQ.nextval, '6 temps');
INSERT INTO GENRE(id, label) VALUES (GENRE_SEQ.nextval, 'Boogie');
INSERT INTO GENRE(id, label) VALUES (GENRE_SEQ.nextval, 'Blues');

INSERT INTO MUSIQUE_GENRES(musique_id, genre_id) SELECT id, (SELECT id FROM GENRE WHERE label = 'Lindy') FROM MUSIQUE;
