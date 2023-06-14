package com.example.backend.repository;

import com.example.backend.domain.Rate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RateRepo extends JpaRepository<Rate, Integer> {
    Optional<Rate> findByUser_idAndBook_id(Integer idUser, Integer idBook);
}
