package com.bparent.mytunes.util;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
//@RunWith(MockitoJUnitRunner.class)
public class FileUtilsTest {

//    @InjectMocks
    @Autowired
    private FileUtils fileUtils;

    @Test
    public void shouldTestIncrementeFileName() {
        assertEquals("toto/titi/tutu(1).mp3", fileUtils.incrementFileName("toto/titi/tutu.mp3", 1));
        assertEquals("toto/titi.com/tutu(2).mp3", fileUtils.incrementFileName("toto/titi.com/tutu.mp3", 2));
    }


}