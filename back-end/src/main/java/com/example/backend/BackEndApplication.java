package com.example.backend;

import com.example.backend.domain.Role;
import com.example.backend.domain.User;
import com.example.backend.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;

@SpringBootApplication
public class BackEndApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackEndApplication.class, args);
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

//    @Bean
//    CommandLineRunner run(UserService userService) {
//        return args -> {
//            userService.saveRole(new Role(null, "ROLE_USER"));
//            userService.saveRole(new Role(null, "ROLE_MANAGER"));
//            userService.saveRole(new Role(null, "ROLE_ADMIN"));
//
//            userService.saveUser(new User(null, "phuongtram", "123", "0799463926",true, new ArrayList<>()));
//            userService.saveUser(new User(null, "hoangdao", "123", "0799463926",true, new ArrayList<>()));
//            userService.saveUser(new User(null, "nganha", "323", "0799463926",true, new ArrayList<>()));
//
//            userService.addRoleToUser("phuongtram", "ROLE_USER");
//            userService.addRoleToUser("phuongtram", "ROLE_ADMIN");
//            userService.addRoleToUser("phuongtram", "ROLE_MANAGER");
//        };
//    }
}
