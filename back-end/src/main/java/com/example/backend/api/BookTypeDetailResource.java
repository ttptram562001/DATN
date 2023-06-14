package com.example.backend.api;

import com.example.backend.domain.Book;
import com.example.backend.domain.BookType;
import com.example.backend.domain.BookTypeDetail;
import com.example.backend.service.BookTypeDetailService;
import com.example.backend.service.BookTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/book-type-details")
public class BookTypeDetailResource {

    @Autowired
    private BookTypeDetailService bookTypeDetailService;

    @Autowired
    private BookTypeService bookTypeService;

    @PostMapping("/{id-book-type}")
    public ResponseEntity<BookTypeDetail> saveBookTypeDetail(@PathVariable(name = "id-book-type") Integer idBookType,
                                                             @RequestParam(name = "name-book-type-detail") String nameBookTypeDetail) {
        BookType bookType = bookTypeService.getBookTypeById(idBookType);
        BookTypeDetail bookTypeDetail = new BookTypeDetail(null, nameBookTypeDetail, true, bookType, new ArrayList<Book>());
        return ResponseEntity.ok().body(bookTypeDetailService.saveBookTypeDetail(bookTypeDetail));
    }

    @GetMapping("/get-books/{id-book-type-detail}")
    public ResponseEntity<List<Book>> getBooksById(@PathVariable(name = "id-book-type-detail") Integer id) {
        return ResponseEntity.ok().body(bookTypeDetailService.getAllBookById(id));
    }




}
