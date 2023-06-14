package com.example.backend.service;

import com.example.backend.domain.Book;
import com.example.backend.domain.BookType;
import com.example.backend.domain.BookTypeDetail;
import com.example.backend.repository.BookTypeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookTypeServiceImpl implements BookTypeService{

    @Autowired
    private BookTypeRepo bookTypeRepo;

    @Override
    public List<BookType> getAllBookType() {
        return bookTypeRepo.findAll();
    }

    @Override
    public BookType getBookTypeById(Integer id) {
        return bookTypeRepo.findById(id).orElse(null);
    }

    @Override
    public List<Book> getBooksById(Integer id) {
        List<BookTypeDetail> listBookTypeDetail = getBookTypeDetailById(id);
        List<Book> books = new ArrayList<>();
        listBookTypeDetail.forEach(i -> books.addAll(i.getBooks()));
        return books;
    }

    @Override
    public List<BookTypeDetail> getBookTypeDetailById(Integer id) {
        BookType bookType = getBookTypeById(id);
        if (bookType!=null) {
            return (List<BookTypeDetail>) bookType.getBookTypeDetails();
        }
        return null;
    }

    @Override
    public BookType saveBookType(BookType bookType) {
        return bookTypeRepo.save(bookType);
    }

    @Override
    public void deleteBookType(Integer id) {
        BookType bookType = bookTypeRepo.findById(id).orElse(null);
        if (bookType != null)
            bookType.setIsActive(false);
    }
}
