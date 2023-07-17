package com.example.backend.api;

import com.example.backend.domain.Account;
import com.example.backend.domain.Role;
import com.example.backend.domain.User;
import com.example.backend.dto.UserResponseDTO;
import com.example.backend.service.UserServiceImpl;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin()
@Slf4j
public class UserResource {
    @Autowired
    private UserServiceImpl userService;

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getUsers() {
        List<UserResponseDTO> userResponseDTOS = new ArrayList<>();
        List<User> users = userService.getUsers();
        users.forEach(i -> {
            if (i.getAccount() == null) {
                userResponseDTOS.add(new UserResponseDTO(i.getId(),
                        i.getUsername(),
                        i.getIsActive(),
                        i.getPhoneNumber()));
            } else {
                userResponseDTOS.add(new UserResponseDTO(i.getId(),
                        i.getUsername(),
                        i.getIsActive(),
                        i.getPhoneNumber(),
                        i.getAccount().getEmail(),
                        i.getAccount().getAddresses().toString(),
                        i.getAccount().getDob() ));
            }
        });
        return ResponseEntity.ok().body(userResponseDTOS);
    }

    @GetMapping("/employee")
    public ResponseEntity<List<UserResponseDTO>> getEmployee() {
        List<UserResponseDTO> userResponseDTOS = new ArrayList<>();
        List<User> users = userService.getEmployee();
        users.forEach(i -> {
            if (i.getAccount() == null) {
                userResponseDTOS.add(new UserResponseDTO(i.getId(),
                        i.getUsername(),
                        i.getIsActive(),
                        i.getPhoneNumber()));
            } else {
                userResponseDTOS.add(new UserResponseDTO(i.getId(),
                        i.getUsername(),
                        i.getIsActive(),
                        i.getPhoneNumber(),
                        i.getAccount().getEmail(),
                        i.getAccount().getAddresses().toString(),
                        i.getAccount().getDob() ));
            }
        });
        return ResponseEntity.ok().body(userResponseDTOS);
    }

    @GetMapping("/get-user")
    public ResponseEntity<?> getUser(Authentication authentication) {
        org.springframework.security.core.userdetails.User user = (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
        return ResponseEntity.ok().body(userService.loadUserByUsername(user.getUsername()));
    }

    @GetMapping("/by-username")
    public ResponseEntity<UserResponseDTO> getUserByUsername(@RequestParam(name = "username") String username) {
        User user = userService.getUser(username);
        Account account = user.getAccount();
        if (account != null) {
            UserResponseDTO userResponseDTO = new UserResponseDTO(user.getId(),
                    username,
                    user.getIsActive(),
                    user.getPhoneNumber(),
                    account.getEmail(),
                    account.getEmail(),
                    user.getAccount().getDob());
            return ResponseEntity.ok().body(userResponseDTO);
        } else {
            UserResponseDTO userResponseDTO = new UserResponseDTO(user.getId(),
                    username,
                    user.getIsActive(),
                    user.getPhoneNumber());
            return ResponseEntity.ok().body(userResponseDTO);
        }
    }


    @PostMapping
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("api/user/save").toUriString());
        return ResponseEntity.created(uri).body(userService.saveUser(user));
    }

    @PostMapping("/role/save")
    public ResponseEntity<Role> saveRole(@RequestBody Role role) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("api/role/save").toUriString());
        return ResponseEntity.created(uri).body(userService.saveRole(role));
    }

    @PostMapping("/role/add-to-user")
    public ResponseEntity<Role> addRoleToUser(@RequestBody RoleToUserForm form) {
        userService.addRoleToUser(form.getUsername(), form.getRoleName());
        return ResponseEntity.ok().build();
    }


    @PostMapping("/update-to-manager/{idUser}")
    public ResponseEntity<User> changeRoleToManager(@PathVariable int idUser) {
        return ResponseEntity.ok().body(userService.updateToManager(idUser));
    }

    @PostMapping("/update-to-user/{idUser}")
    public ResponseEntity<User> changeRoleToUser(@PathVariable int idUser) {
        return ResponseEntity.ok().body(userService.updateToUser(idUser));
    }

    @PostMapping("/active-user/{idUser}")
    public ResponseEntity<Boolean> activeUser(@PathVariable(name = "idUser") int idUser) {
        User user = userService.getUser(idUser);
        if (user != null) {
            user.setIsActive(!user.getIsActive());
            userService.saveUser(user);
            return ResponseEntity.ok().body(true);
        }
        return ResponseEntity.ok().body(false);
    }
    @Data
    class RoleToUserForm {
        private String username;
        private String roleName;
    }
}
