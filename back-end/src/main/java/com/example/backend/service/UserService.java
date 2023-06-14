package com.example.backend.service;

import com.example.backend.domain.Role;
import com.example.backend.domain.User;

import java.util.List;

public interface UserService {
    User saveUser(User user);
    Role saveRole(Role role);
    Role getRoleByName(String name);
    void addRoleToUser(String username, String roleName);
    User getUser(String username);
    User getUserByPhoneNumner(String phoneNumber);
    User getUser(Integer id);
    List<User> getUsers();

}
