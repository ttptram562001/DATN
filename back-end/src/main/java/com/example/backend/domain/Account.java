package com.example.backend.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
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
    private Date dob;

    @OneToOne(mappedBy = "account")
    private User user;

    @OneToMany(mappedBy = "account")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonManagedReference
    private Collection<Address> addresses = new ArrayList<>();

    public Account(Integer id, String username, String phoneNumber, User user) {
        this.id = id;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.user = user;
    }
}
