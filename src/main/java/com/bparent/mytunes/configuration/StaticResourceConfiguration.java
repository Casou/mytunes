package com.bparent.mytunes.configuration;

import com.bparent.mytunes.util.IConstants;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class StaticResourceConfiguration extends WebMvcConfigurerAdapter {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/" + IConstants.IHandler.MUSIQUES_HANDLER + "**").addResourceLocations("file:medias/musiques/");

        super.addResourceHandlers(registry);
    }
}
