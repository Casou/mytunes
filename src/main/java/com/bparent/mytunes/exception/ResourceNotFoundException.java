package com.bparent.mytunes.exception;

import javax.lang.model.UnknownEntityException;

public class ResourceNotFoundException extends UnknownEntityException {

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
