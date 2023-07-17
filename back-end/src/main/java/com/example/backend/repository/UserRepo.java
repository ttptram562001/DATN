package com.example.backend.repository;

import com.example.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    @Query("SELECT COUNT(id) from User ")
    Integer getNumbersUser();
    User findByUsername(String username);
    User findByPhoneNumber(String phoneNumber);
}
