package com.example.backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookTypeDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String name;
    @Column(name = "is_active")
    private boolean isActive = true;

    @ManyToOne( fetch = FetchType.LAZY)
    @JoinColumn(name = "book_type_id", nullable = true)
    @JsonBackReference
    private BookType bookType;

    @OneToMany(mappedBy = "bookTypeDetail")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonManagedReference
    private Collection<Book> books;
}
