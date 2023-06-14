package com.example.backend.api;

import com.example.backend.domain.Book;
import com.example.backend.domain.BookTypeDetail;
import com.example.backend.service.BookService;
import com.example.backend.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000/")
public class BookResource {
    private final BookService bookService;
    private final FileService fileService;

    @Value("${upload.path}")
    private String path;

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Integer id) {
        return ResponseEntity.ok().body(bookService.findBookById(id));
    }

    @GetMapping
    public ResponseEntity<List<Book>> getAllBook() {
        return ResponseEntity.ok().body(bookService.getAllBook());
    }

    @GetMapping("/book-type-detail/{id}")
    public ResponseEntity<List<Book>> getBookByBookTypeDetailId(@PathVariable Integer id) {
        return ResponseEntity.ok().body(bookService.getBookByBookTypeDetail(id));
    }

    @PostMapping()
    public ResponseEntity<Book> addBook(@RequestParam(name = "isbn") String isbn,
                                        @RequestParam(name = "title") String title,
                                        @RequestParam(name = "author") String author,
                                        @RequestParam(name = "yearOfPublication") int yearPublication,
                                        @RequestParam(name = "price") Float price,
                                        @RequestParam(name = "description") String des,
                                        @RequestParam(name = "publisher") String publisher,
                                        @RequestParam(name = "idBookTypeDetail") Integer idBookTypeDetail,
                                        @RequestParam(name = "amount") int amount,
                                        @RequestParam(name = "image") MultipartFile image) {
        BookTypeDetail bookTypeDetail = bookService.findBookTypeDetail(idBookTypeDetail);
        Book book = new Book(null, isbn, title, author,yearPublication,publisher, price, des, amount, bookTypeDetail);
        String fileName ;
        try {
            fileName = fileService.uploadImage(path, image);
            book.setImage(fileName);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.ok().body(bookService.saveBook(book));
        }
        return ResponseEntity.ok().body(bookService.saveBook(book));
    }

}
