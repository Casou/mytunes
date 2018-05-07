package com.bparent.model;

import com.bparent.annotations.ItunesProperty;
import com.bparent.exception.WrongTrackPropertyTypeException;

import java.lang.reflect.Field;
import java.util.Arrays;

/**
 * Created by Basile on 20/10/2016.
 */
public abstract class ItunesPropertyEntity {

    public void fillProperty(final String itunesTagName, final Object value) throws WrongTrackPropertyTypeException {
//        Field fieldProperty = null;
//        for (Field field : this.getClass().getDeclaredFields()) {
//            System.out.println(field.getName() + " " + field.getAnnotations().length + " > " + field.isAnnotationPresent(ItunesProperty.class));
//            if (field.isAnnotationPresent(ItunesProperty.class)) {
//                ItunesProperty annotation = field.getAnnotation(ItunesProperty.class);
//                if (annotation != null && itunesTagName.equals(annotation.value())) {
//                    fieldProperty = field;
//                    break;
//                }
//            }
//        }

//        Field fieldProperty = Arrays.stream(this.getClass().getDeclaredFields())
//                .filter(field -> {
//                    ItunesProperty annotation = field.getAnnotation(ItunesProperty.class);
//                    System.out.println(annotation);
//                    return annotation != null && itunesTagName.equals(annotation.value());
//                })
//                .findFirst()
//                .orElse(null);

        if (itunesTagName == null) {
            return;
        }

        Field fieldProperty = Arrays.stream(this.getClass().getDeclaredFields())
                .filter(field -> field.isAnnotationPresent(ItunesProperty.class) &&
                        field.getAnnotation(ItunesProperty.class).value().equals(itunesTagName))
                .findFirst()
                .orElse(null);

        if (fieldProperty == null) {
            return;
        }

        try {
            fieldProperty.set(this, value);
        } catch (IllegalAccessException | IllegalArgumentException e) {
            throw new WrongTrackPropertyTypeException("La propriété " + fieldProperty.getName() +
                    " n'a pas pu être renseignée avec la valeur '" + value + "'", e);
        }
    }


}
