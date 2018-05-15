package com.bparent.mytunes.util;

import org.junit.Test;

import java.time.LocalDateTime;

import static org.junit.Assert.*;

public class DateUtilsTest {

    @Test
    public void parse() {
        LocalDateTime localDateTime = DateUtils.parseDate("2012-12-24T14:54:43Z", "yyyy-MM-dd'T'HH:mm:ss'Z'");
        assertEquals(2012, localDateTime.getYear());
        assertEquals(12, localDateTime.getMonth().getValue());
        assertEquals(24, localDateTime.getDayOfMonth());
        assertEquals(14, localDateTime.getHour());
        assertEquals(54, localDateTime.getMinute());
        assertEquals(43, localDateTime.getSecond());
    }

}