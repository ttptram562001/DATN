package com.example.backend.repository;

import com.example.backend.domain.Order;
import com.example.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepo extends JpaRepository<Order, Integer> {
    @Query("SELECT count(id)  from Order ")
    Integer getNumberOrder();

    @Query("SELECT SUM(booksPrice) AS TotalItemsOrdered FROM Order")
    Float getTotalEarning();

    @Query("SELECT SUM(booksPrice) FROM Order WHERE createdAt <= CURRENT_DATE")
    Float getTotalEarningToday();

    @Query("SELECT o from Order as o WHERE o.createdAt between :startDate  and :endDate")
    Optional<List<Order>> GetOrderBetweenDays(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    Collection<Order> findOrdersByUser(User user);
}
