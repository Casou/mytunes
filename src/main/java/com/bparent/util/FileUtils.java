package com.bparent.util;

import org.springframework.stereotype.Component;

import java.io.File;

@Component
public class FileUtils {

    public String findUnexistingFileName(String filePath) {
        File f = new File(filePath);
        int i = 1;
        while (f.exists()) {
            f = new File(incrementFileName(filePath, i));
            i++;
        }

        return f.getAbsolutePath();
    }

    protected String incrementFileName(String originalFilePath, int count) {
        return originalFilePath.substring(0, originalFilePath.lastIndexOf('.'))
                + "(" + count + ")"
                + originalFilePath.substring(originalFilePath.lastIndexOf('.'));
    }

}
