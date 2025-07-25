package br.com.marcos.config; // Ajuste conforme seu pacote raiz

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Permite todas as rotas
                		.allowedOrigins(
                				"http://localhost:3000"
                				,"http://168.231.88.35:3000",
                				"https://168.231.88.35:3000",
                                "https://admin.spai.org.br")   // Permite chamadas do frontend
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS","HEAD","PATCH") // Métodos permitidos
                        .allowedHeaders("Authorization", "Content-Type", "X-Requested-With");
                       // .allowCredentials(true); // Permite envio de cookies/sessões
            }
        };
    }
}