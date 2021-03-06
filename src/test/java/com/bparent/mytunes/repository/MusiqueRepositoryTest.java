package com.bparent.mytunes.repository;

import com.bparent.mytunes.model.Musique;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

//@RunWith(SpringRunner.class)
@DataJpaTest
//@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
@Sql({"/schema.sql", "/data.sql"})
public class MusiqueRepositoryTest {

    @Autowired
    private MusiqueRepository musiqueDao;

    @Test
    public void findByItunesId_shouldFindOneMusique() {
        Musique m1 = musiqueDao.findByItunesId(1);
        assertNotNull(m1);
        assertEquals("mus1-titre", m1.getTitre());
    }

    @Test
    public void findByItunesId_shouldReturnNullIfIdDoesntExist() {
        Musique m1 = musiqueDao.findByItunesId(12345);
        assertNull(m1);
    }

    @Test
    public void findByItunesId_shouldReturnNullIfIdIsNull() {
        Musique m1 = musiqueDao.findByItunesId(null);
        assertNull(m1);
    }
    
    @Test
    public void findById_shouldFindOneMusique() {
        Musique m1 = musiqueDao.findById(BigInteger.valueOf(1));
        assertNotNull(m1);
        assertEquals("mus1-titre", m1.getTitre());
    }

    @Test
    public void findById_shouldReturnNullIfIdDoesntExist() {
        Musique m1 = musiqueDao.findById(BigInteger.valueOf(12345));
        assertNull(m1);
    }

    @Test
    public void findById_shouldReturnNullIfIdIsNull() {
        Musique m1 = musiqueDao.findById(null);
        assertNull(m1);
    }

    @Test
    public void findAll_shouldFind3Musiques() {
        List<Musique> allMusiques = musiqueDao.findAll();
        assertEquals(3, allMusiques.size());
    }

//    @Test
//    public void shouldFindAllMusiquesByName() {
//        List<Musique> allMusiques = musiqueDao.findByName("mus");
//        assertEquals(3, allMusiques.size());
//    }

    @Test
    public void deleteById_shouldDeleteOneRecord() {
        musiqueDao.delete(BigInteger.valueOf(1));
        List<Musique> allMusiques = musiqueDao.findAll();
        assertEquals(2, allMusiques.size());
    }

    @Test(expected = EmptyResultDataAccessException.class)
    public void deleteById_shouldThrowExceptionIfIdDoesntExists() {
        musiqueDao.delete(BigInteger.valueOf(12345));
        List<Musique> allMusiques = musiqueDao.findAll();
        assertEquals(3, allMusiques.size());
    }

    @Test(expected = InvalidDataAccessApiUsageException.class)
    public void deleteById_shouldThrowExceptionIfIdIsNull() {
        musiqueDao.delete((BigInteger) null);
        List<Musique> allMusiques = musiqueDao.findAll();
        assertEquals(3, allMusiques.size());
    }

    @Test
    public void deleteByEntity_shouldDeleteOneRecord() {
        musiqueDao.delete(musiqueDao.findByItunesId(1));
        List<Musique> allMusiques = musiqueDao.findAll();
        assertEquals(2, allMusiques.size());
    }

    @Test
    public void save_shouldSaveNewEntity() {
        Musique newMusique = Musique.builder().id(BigInteger.valueOf(9999)).titre("Musique Add Test").build();
        musiqueDao.save(newMusique);
        List<Musique> allMusiques = musiqueDao.findAll();
        assertEquals(4, allMusiques.size());
    }

    @Test
    public void save_shouldUpdateExistingEntity() {
        Musique musique = musiqueDao.findByItunesId(1);
        musique.setTitre("Changed name");
        musiqueDao.save(musique);

        List<Musique> allMusiques = musiqueDao.findAll();
        assertEquals(3, allMusiques.size());

        Musique changedMusique = musiqueDao.findByItunesId(1);
        assertEquals("Changed name", changedMusique.getTitre());
    }

    @Test
    public void findByIdIn_shouldReturnAListOfExistingMusiqueOnly() {
        List<Musique> musiques = musiqueDao.findByIdIn(Arrays.asList(
                BigInteger.valueOf(1),
                BigInteger.valueOf(2),
                BigInteger.valueOf(9999)));

        assertEquals(2, musiques.size());
        assertEquals(1, musiques.get(0).getId().intValue());
        assertEquals(2, musiques.get(1).getId().intValue());
    }

}