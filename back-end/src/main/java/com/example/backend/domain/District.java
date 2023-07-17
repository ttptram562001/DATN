package com.example.backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.Collection;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class District {
    @Id
    private int code;
    private String name;
    private String division_type;
    private String codename;
    @Column(name = "province_code")
    private int province_code;

    @ManyToOne
    @JoinColumn(name = "province_code", insertable = false,updatable = false)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonBackReference
    private Province province;

    @OneToMany(mappedBy = "district")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonManagedReference
    private Collection<Ward> wards;

    public District(int code, String name, String division_type, String codename, int province_code, Collection<Ward> wards) {
        this.code = code;
        this.name = name;
        this.division_type = division_type;
        this.codename = codename;
        this.province_code = province_code;
        this.wards = wards;
    }
}
