package com.example.backend.api;

import com.example.backend.domain.Book;
import com.example.backend.domain.BookTypeDetail;
import com.example.backend.dto.BookDTO;
import com.example.backend.service.BookService;
import com.example.backend.service.BookTypeService;
import com.example.backend.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin()
public class BookResource {
    private final BookService bookService;
    private final FileService fileService;
    private final BookTypeService bookTypeService;

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

    @PostMapping("/create-book")
    public ResponseEntity<Book> saveBook(@RequestBody BookDTO bookDTO) {
        BookTypeDetail bookTypeDetail =  bookService.findBookTypeDetail(bookDTO.getIdBookTypeDetail());
        Book book = new Book(null,
                bookDTO.getIsbn(),
                bookDTO.getTitle(),
                bookDTO.getAuthor(),
                bookDTO.getYearOfPublication(),
                bookDTO.getPublisher(),
                bookDTO.getPrice(),
                bookDTO.getDescription(),
                bookDTO.getAmount(),
                bookTypeDetail
                );
        return ResponseEntity.ok().body(bookService.saveBook(book));
    }

    @PostMapping("/upload-image/{idBook}")
    public ResponseEntity<Book> uploadImage(@PathVariable(name = "idBook") int idBook,
                            @RequestParam(name = "image") MultipartFile image) {
        Book book = bookService.findBookById(idBook);
        String fileName;
        try {
            fileName = fileService.uploadImage(path, image);
            book.setImage(fileName);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        return ResponseEntity.ok().body(bookService.saveBook(book));

    }

    @PostMapping("/update-book/{idBook}")
    public ResponseEntity<Book> uploadBook(@PathVariable(name = "idBook") int idBook,
                                           @RequestBody BookDTO bookDTO) {
        Book book = bookService.findBookById(idBook);
        if (book!=null) {
            book.setTitle(bookDTO.getTitle());
            book.setAuthor(bookDTO.getAuthor());
            book.setYearOfPublication(bookDTO.getYearOfPublication());
            book.setAmount(bookDTO.getAmount());
            book.setIsbn(bookDTO.getIsbn());
            book.setPublisher(bookDTO.getPublisher());
            book.setPrice(bookDTO.getPrice());
            book.setDescription(bookDTO.getDescription());
        }
        return ResponseEntity.ok().body(bookService.saveBook(book));
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


    @PostMapping("/active-book/{idBook}")
    public ResponseEntity<Boolean> activeBook(@PathVariable(name = "idBook") int idBook) {
        Book book = bookService.findBookById(idBook);
        if (book !=null) {
            book.setActive(!book.isActive());
            bookService.saveBook(book);
             return ResponseEntity.ok().body(true);
        }
        return ResponseEntity.ok().body(false);
    }

    @PostMapping("/{idBook}/{amount}")
    public ResponseEntity<Book> updateBookQuanlity(@PathVariable(name = "idBook") int idBook,
                                                   @PathVariable(name = "amount") int amount) {
        Book book = bookService.findBookById(idBook);
        book.setAmount(book.getAmount() - amount);
        return ResponseEntity.ok().body(bookService.saveBook(book));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Book>> searchBooks(@RequestParam(name = "query") String query) {
        return ResponseEntity.ok().body(bookService.search(query));
    }

    @GetMapping("/recommend")
    public ResponseEntity<List<Book>> getTopBooks() {
        return ResponseEntity.ok().body(bookService.getTopBook());
    }

}
