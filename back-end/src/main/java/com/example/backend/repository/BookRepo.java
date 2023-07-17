package com.example.backend.repository;

import com.example.backend.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface BookRepo extends JpaRepository<Book, Integer> {
    Book findByTitle(String title);
    @Query("SELECT p FROM Book p WHERE " +
            "p.title LIKE CONCAT('%',:query, '%')" +
            "Or p.author LIKE CONCAT('%', :query, '%')")
    List<Book> searchBooks(String query);
    @Query("SELECT  p from Book p order by p.soldAmount desc")
    List<Book> getTopBooks();
}
