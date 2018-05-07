package com.bparent.mytunes.util;

public class StringUtils {

    public static String getStringMaxLengthPadLeft(String s, int maxLength) {
        return getStringMaxLengthPadLeft(s, maxLength, true);
    }

    public static String getStringMaxLengthPadRight(String s, int maxLength) {
        return getStringMaxLengthPadRight(s, maxLength, true);
    }

    public static String getStringMaxLengthPadLeft(String s, int maxLength, boolean cutWithPoints) {
        if (s == null) {
            return StringUtils.padLeft("", maxLength);
        }
        if (s.length() > maxLength - 3 && cutWithPoints) {
            return s.substring(0, maxLength - 3) + "...";
        }
        if (s.length() > maxLength && !cutWithPoints) {
            return s.substring(0, maxLength);
        }
        return StringUtils.padLeft(s, maxLength);
    }
    
    public static String getStringMaxLengthPadRight(String s, int maxLength, boolean cutWithPoints) {
        if (s == null) {
            return StringUtils.padRight("", maxLength);
        }
        if (s.length() > maxLength - 3 && cutWithPoints) {
            return s.substring(0, maxLength - 3) + "...";
        }
        if (s.length() > maxLength && !cutWithPoints) {
            return s.substring(0, maxLength);
        }
        return StringUtils.padRight(s, maxLength);
    }
    
    public static String padRight(String s, int n) {
        return String.format("%1$-" + n + "s", s);
    }

    public static String padLeft(String s, int n) {
        return String.format("%1$" + n + "s", s);
    }

    public static String padZeroLeft(Integer s, int n) {
        return String.format("%0" + n + "d", s);
    }

}
