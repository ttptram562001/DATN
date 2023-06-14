package com.example.backend.service;

import com.example.backend.domain.Book;
import com.example.backend.domain.BookType;
import com.example.backend.domain.BookTypeDetail;

import java.util.List;

public interface BookTypeDetailService {
    List<Book> getAllBookById(Integer id);
    BookTypeDetail saveBookTypeDetail(BookTypeDetail bookTypeDetail);
    BookTypeDetail updateBookTypeInBookTypeDetail(BookType bookType, Integer id);
    void deleteBookTypeDetail(Integer id);
}
