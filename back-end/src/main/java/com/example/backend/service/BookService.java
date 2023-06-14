package com.example.backend.service;

import com.example.backend.domain.Book;
import com.example.backend.domain.BookTypeDetail;

import java.util.List;

public interface BookService {
    Book saveBook(Book book);
    Book findBookById(Integer id);
    BookTypeDetail findBookTypeDetail(Integer id);
    List<Book> getAllBook();
    Book findBookByTitle(String title);
    List<Book> search(String keyword);
    void deleteBook(Integer id);
    Book updateBook(Book book, Long id);
    List<Book> getBookByBookTypeDetail(Integer id);
}
