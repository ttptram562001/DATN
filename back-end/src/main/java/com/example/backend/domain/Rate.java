package com.example.backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "rate")
public class Rate {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private int amount;
    @Column(name = "created_at")
    private Date createdAt;
    @Column(name = "created_by")
    private Integer createdBy;
    @Column(name = "updated_at")
    private Date updatedAt;
    @Column(name = "updated_by")
    private Integer updatedBy;
    @Column(name = "deleted_at")
    private Date deletedAt;
    @Column(name = "user_id")
    private Integer user_id;

    @Column(name = "book_id")
    private Integer book_id;
    @ManyToOne
    @JoinColumn(name = "user_id",  insertable = false, updatable = false)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonBackReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "book_id", insertable = false, updatable = false)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonBackReference
    private Book book;


    public Rate(Integer id, int amount, Integer user_id, Integer book_id) {
        this.id = id;
        this.amount = amount;
        this.user_id = user_id;
        this.book_id = book_id;
        this.createdAt = new Date();
    }
}
