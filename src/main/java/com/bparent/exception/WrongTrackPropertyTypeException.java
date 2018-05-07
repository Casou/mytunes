package com.bparent.exception;

public class WrongTrackPropertyTypeException extends IllegalAccessException {

    public WrongTrackPropertyTypeException(String message, Throwable e) {
        super(message + "\n>>>>>>> " + e.getMessage());
    }
}
