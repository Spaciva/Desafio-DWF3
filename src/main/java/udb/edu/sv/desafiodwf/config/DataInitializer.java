package udb.edu.sv.desafiodwf.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import udb.edu.sv.desafiodwf.service.AppUserService;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner createDefaultAdmin(AppUserService appUserService) {
        return args -> appUserService.ensureDefaultAdmin();
    }
}
