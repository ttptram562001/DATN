package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {
    private int id;
    private String username;
    private boolean isActive;
    private String phoneNumber;
    private String email;
    private String address;
    private Date dob;

    public UserResponseDTO(int id, String username, boolean isActive, String phoneNumber) {
        this.id = id;
        this.username = username;
        this.isActive = isActive;
        this.phoneNumber = phoneNumber;
    }
}
