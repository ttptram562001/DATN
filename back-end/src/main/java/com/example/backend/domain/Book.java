package com.example.backend.domain;

import com.example.backend.repository.BookTypeRepo;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String isbn;
    private String title;
    private String author;
    @Column(name = "year_of_publication")
    private int yearOfPublication;
    private String publisher;
    private String image;
    private float price;
    private String description;
    private int amount;
    @Column(name = "is_active")
    private boolean isActive = true;
    @ManyToOne
    @JoinColumn(name = "book_type_detail_id", nullable = true)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonBackReference
    private BookTypeDetail bookTypeDetail;

    @OneToMany(mappedBy = "book")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonManagedReference
    private Collection<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "book")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonManagedReference
    private Collection<Rate> rates = new ArrayList<>();

    public Book(Integer id, String isbn, String title, String author, int yearOfPublication, String publisher, float price, String description, int amount, BookTypeDetail bookTypeDetail) {
        this.id = id;
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.yearOfPublication = yearOfPublication;
        this.publisher = publisher;
        this.price = price;
        this.description = description;
        this.amount = amount;
        this.bookTypeDetail = bookTypeDetail;
    }

}
