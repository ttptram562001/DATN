package com.example.backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String phone;
    @Column(name = "detail_address")
    private String detailAddress;
    private String address;
    private Boolean default_address = false;

    @ManyToOne
    @JoinColumn(name = "id_address_type")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonBackReference
    private AddressType addressType;

    @ManyToOne
    @JoinColumn(name = "id_account")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonBackReference
    private Account account;

    public Address(String name, String phone, String detailAddress, String address, Boolean default_address, AddressType addressType, Account account) {
        this.name = name;
        this.phone = phone;
        this.detailAddress = detailAddress;
        this.address = address;
        this.default_address = default_address;
        this.addressType = addressType;
        this.account = account;
    }
}
