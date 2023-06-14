package com.example.backend.service;

import com.example.backend.domain.Book;
import com.example.backend.domain.BookType;
import com.example.backend.domain.BookTypeDetail;

import java.util.List;

public interface BookTypeService {
    List<BookType> getAllBookType();
    BookType getBookTypeById(Integer id);
    List<Book> getBooksById(Integer id);
    List<BookTypeDetail> getBookTypeDetailById(Integer id);
    BookType saveBookType(BookType bookType);
    void deleteBookType(Integer id);
}
