package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookDTO {
    private String title;
    private String isbn;
    private String author;
    private int yearOfPublication;
    private String publisher;
    private String description;
    private float price;
    private int amount;
    private int idBookTypeDetail;
    private Boolean isActive;
}
