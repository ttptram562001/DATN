package com.example.backend.api;

import com.example.backend.domain.Book;
import com.example.backend.domain.BookType;
import com.example.backend.domain.BookTypeDetail;
import com.example.backend.service.BookTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api/book-types")
@CrossOrigin()
public class BookTypeResource {
    @Autowired
    private BookTypeService bookTypeService;

    @PostMapping
    public ResponseEntity<BookType> saveBookType(@RequestParam(name = "name-book-type") String name) {
        BookType bookType = new BookType(null, name, true, new ArrayList<BookTypeDetail>());
        return ResponseEntity.ok().body(bookTypeService.saveBookType(bookType));
    }

    @GetMapping
    public ResponseEntity<List<BookType>> getAllBookType() {
        return ResponseEntity.ok().body(bookTypeService.getAllBookType());
    }

    @GetMapping("/get-book-type-detail/{id}")
    public ResponseEntity<Collection<BookTypeDetail>> getBookTypeDetail(@PathVariable(name = "id") Integer id) {
        return ResponseEntity.ok().body(bookTypeService.getBookTypeDetailById(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Book>> getBooksById(@PathVariable(name = "id") Integer id) {
        return ResponseEntity.ok().body(bookTypeService.getBooksById(id));
    }


}
