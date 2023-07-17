package com.example.backend.service;

import com.example.backend.domain.Role;
import com.example.backend.domain.User;
import com.example.backend.repository.RoleRepo;
import com.example.backend.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {
    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final PasswordEncoder passwordEncoderl;

    @Override
    public User saveUser(User user) {
        log.info("Saving new user  {} to the database", user.getUsername());
        user.setPassword(passwordEncoderl.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @Override
    public Role saveRole(Role role) {
        log.info("Saving new role {} to the database", role.getName());
        return roleRepo.save(role);
    }

    @Override
    public Role getRoleByName(String name) {
        return roleRepo.findByName(name);
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        log.info("Adding role {} to user {}", roleName, username);
        User user = userRepo.findByUsername(username);
        Role role = roleRepo.findByName(roleName);
        user.getRoles().add(role);
    }

    @Override
    public User getUser(String username) {
        log.info("Fetching user {}", username);
        return userRepo.findByUsername(username);
    }

    @Override
    public User getUserByPhoneNumner(String phoneNumber) {
        return userRepo.findByPhoneNumber(phoneNumber);
    }

    @Override
    public User updateToManager(int idUser) {
        User user = userRepo.findById(idUser).orElse(null);
        Role roleUser = roleRepo.findByName("ROLE_USER");
        Role roleManager = roleRepo.findByName("ROLE_MANAGER");
        if (user != null) {
            user.getRoles().remove(roleUser);
            user.getRoles().add(roleManager);
            userRepo.save(user);
        }
        return user;
    }

    @Override
    public User updateToUser(int idUser) {
        User user = userRepo.findById(idUser).orElse(null);
        Role roleUser = roleRepo.findByName("ROLE_USER");
        Role roleManager = roleRepo.findByName("ROLE_MANAGER");
        if (user != null) {
            user.getRoles().remove(roleManager);
            user.getRoles().add(roleUser);
            userRepo.save(user);
        }
        return user;
    }

    @Override
    public User getUser(Integer id) {
        return userRepo.findById(id).orElse(null);
    }

    @Override
    public List<User> getUsers() {
        log.info("Fetching all users");
        Role role = roleRepo.findByName("ROLE_USER");
        return userRepo.findAll().stream().filter(user -> user.getRoles().contains(role)) .collect(Collectors.toList());
    }

    @Override
    public List<User> getEmployee() {
        Role role = roleRepo.findByName("ROLE_MANAGER");
        return userRepo.findAll().stream().filter(user -> user.getRoles().contains(role)) .collect(Collectors.toList());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username);
        if (user == null) {
            log.error("User not found in database");
            throw new UsernameNotFoundException("User not found in database");
        } else {
            log.info("User found in the database: {}", username);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),authorities);
    }
}
