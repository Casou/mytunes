package com.bparent.util;

import java.io.IOException;

public class Shell {

    public Process exec(String command) throws IOException {
        return Runtime.getRuntime().exec(command);
    }

}
