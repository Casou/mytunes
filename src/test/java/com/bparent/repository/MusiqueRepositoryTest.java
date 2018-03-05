package com.bparent.repository;

import com.bparent.model.Musique;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigInteger;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

//@RunWith(SpringRunner.class)
@DataJpaTest
//@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
@Sql({"/schema.sql", "/data.sql"})
public class MusiqueRepositoryTest {

    @Autowired
    private MusiqueRepository musiqueDao;

    @Test
    public void shouldFindOneMusiqueById() {
        Musique m1 = musiqueDao.findByItunesId(BigInteger.valueOf(1));
        assertNotNull(m1);
        assertEquals("mus1-nom", m1.getNom());
    }

    @Test
    public void shouldFindAllMusiques() {
        List<Musique> allMusiques = musiqueDao.findAll();
        assertEquals(3, allMusiques.size());
    }

//    @Test
//    public void shouldFindAllMusiquesByName() {
//        List<Musique> allMusiques = musiqueDao.findByName("mus");
//        assertEquals(3, allMusiques.size());
//    }

}