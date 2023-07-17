package com.example.backend.service;

import com.example.backend.domain.Book;
import com.example.backend.domain.BookType;
import com.example.backend.domain.BookTypeDetail;
import com.example.backend.repository.BookRepo;
import com.example.backend.repository.BookTypeDetailRepo;
import com.example.backend.repository.BookTypeRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class BookServiceImpl implements BookService{
    private final BookRepo bookRepo;
    private final BookTypeRepo bookTypeRepo;
    private final BookTypeDetailRepo bookTypeDetailRepo;

    @Override
    public Book saveBook(Book book) {
        return bookRepo.save(book);
    }

    @Override
    public Book findBookById(Integer id) {
        return bookRepo.findById(id).get();
    }

    @Override
    public BookTypeDetail findBookTypeDetail(Integer id) {
        return bookTypeDetailRepo.findById(id).orElse(null);
    }

    @Override
    public List<Book> getAllBook() {
        return bookRepo.findAll();
    }

    @Override
    public Book findBookByTitle(String title) {
        return null;
    }

    @Override
    public List<Book> search(String query) {
        List<Book> books = bookRepo.searchBooks(query);
        return books;
    }


    @Override
    public void deleteBook(Integer id) {
        Book curBook = bookRepo.findById(id).orElse(null);
        if (curBook != null) {
            curBook.setActive(false);
        }
    }

    @Override
    public Book updateBook(Book book, Long id) {
        return null;
    }

    @Override
    public Book updateAmounBook(Integer idBook, int amount) {
        Book book = bookRepo.findById(idBook).orElse(null);
        if (book != null) {
            book.setAmount(book.getAmount() - amount);
            book.setSoldAmount(book.getSoldAmount() + amount);
        }
        return bookRepo.save(book);
    }


    @Override
    public List<Book> getBookByBookTypeDetail(Integer id) {
        BookTypeDetail bookTypeDetail = bookTypeDetailRepo.findById(id).orElse(null);
        if (bookTypeDetail != null)
            return (List<Book>) bookTypeDetail.getBooks();
        return null;
    }

    @Override
    public List<Book> getTopBook() {
        return bookRepo.getTopBooks();
    }
}
