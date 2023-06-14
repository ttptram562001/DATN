package com.example.backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Ward {
    @Id
    private int code;
    private String name;
    private String division_type;
    private String codename;
    @Column(name = "district_code")
    private int district_code;

    @ManyToOne
    @JoinColumn(name = "district_code" , insertable = false, updatable = false)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonBackReference
    private District district;

    public Ward(int code, String name, String division_type, String codename, int district_code) {
        this.code = code;
        this.name = name;
        this.division_type = division_type;
        this.codename = codename;
        this.district_code = district_code;
    }
}
