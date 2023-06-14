package com.example.backend.repository;

import com.example.backend.domain.BookType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookTypeRepo extends JpaRepository<BookType, Integer> {
}
