package com.bparent.mytunes.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.modelmapper.ModelMapper;

public abstract class EntityDTO<T> {

    public T toEntity() {
        ModelMapper mapper = new ModelMapper();
        return (T) mapper.map(this, this.getEntityClass());
    }

    @JsonIgnore
    public abstract Class getEntityClass();

}
