package com.techstore.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI techStoreOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("TechStore API")
                        .description("""
                    API REST de TechStore — backend para la clase de Programación Web.
                    
                    **Base URL:** http://localhost:8080
                    
                    **Categorías disponibles:** notebook · celular · auricular · monitor · pc_escritorio
                    
                    Cada categoría tiene campos específicos además de los campos base.
                    Ver los ejemplos en cada endpoint POST para la estructura completa.
                    """)
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Tecnicatura Full Stack — UPC")
                        )
                );
    }
}
