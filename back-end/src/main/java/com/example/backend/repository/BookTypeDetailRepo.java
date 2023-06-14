package com.example.backend.repository;

import com.example.backend.domain.BookTypeDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookTypeDetailRepo extends JpaRepository<BookTypeDetail, Integer> {
}
