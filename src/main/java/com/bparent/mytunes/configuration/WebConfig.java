package com.bparent.mytunes.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@EnableWebMvc
public class WebConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
//                .allowedOrigins("*").allowedMethods("GET", "POST","PUT", "DELETE");
                .allowedOrigins("*")
                .allowedHeaders("Access-Control-Allow-Origin", "*")
//                .allowedHeaders("Access-Control-Allow-Headers", "Content-Type,x-requested-with").maxAge(20000)
//                .allowCredentials(false)
                .allowedMethods("GET", "POST", "PUT", "OPTIONS", "DELETE")
        ;
    }

}
