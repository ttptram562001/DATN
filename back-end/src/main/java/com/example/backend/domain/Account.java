package com.example.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Cleanup;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String username;

    @Column(name = "phone_number")
    private String phoneNumber;

    private String email;
    private Boolean gender;
    private String address;
    private Date dob;

    @OneToOne(mappedBy = "account")
    private User user;

    public Account(Integer id, String username, String phoneNumber, User user) {
        this.id = id;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.user = user;
    }
}
