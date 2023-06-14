package com.example.backend.service;

import com.example.backend.domain.Book;
import com.example.backend.domain.BookType;
import com.example.backend.domain.BookTypeDetail;
import com.example.backend.repository.BookTypeDetailRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookTypeDetailServiceImpl implements BookTypeDetailService{
    @Autowired
    private BookTypeDetailRepo bookTypeDetailRepo;

    @Override
    public List<Book> getAllBookById(Integer id) {
        BookTypeDetail bookTypeDetail = bookTypeDetailRepo.findById(id).orElse(null);
        if (bookTypeDetail != null)
            return (List<Book>) bookTypeDetail.getBooks();
        return null;
    }

    @Override
    public BookTypeDetail saveBookTypeDetail(BookTypeDetail bookTypeDetail) {
        return bookTypeDetailRepo.save(bookTypeDetail);
    }

    @Override
    public BookTypeDetail updateBookTypeInBookTypeDetail(BookType bookType, Integer id) {
        BookTypeDetail bookTypeDetail = bookTypeDetailRepo.findById(id).orElse(null);
        if (bookTypeDetail != null) {
            bookTypeDetail.setBookType(bookType);
            return bookTypeDetail;
        }
        return null;
    }

    @Override
    public void deleteBookTypeDetail(Integer id) {
        BookTypeDetail bookTypeDetail = bookTypeDetailRepo.findById(id).orElse(null);
        if (bookTypeDetail != null) {
            bookTypeDetail.setActive(false);
        }

    }
}
