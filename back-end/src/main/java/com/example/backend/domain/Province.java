package com.example.backend.domain;

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
public class Province {
    @Id
    private int code;
    private String name;
    private String division_type;
    private String codename;
    private int phone_code;

    @OneToMany(mappedBy = "province")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonManagedReference
    private Collection<District> districts;

}
