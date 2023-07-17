package com.example.backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(name = "created_at")
    private Date createdAt;
    @Column(name = "books_price")
    private float booksPrice;
    @Column(name = "shipping_address")
    private String shippingAddress;
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonManagedReference
    private Collection<OrderDetail> orderDetails = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonBackReference
    private User user;
    @ManyToOne
    @JoinColumn(name = "payment_type_id", nullable = false)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonBackReference
    private PaymentType paymentType;

    @ManyToOne
    @JoinColumn(name = "order_status_id", nullable = false)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonBackReference
    private OrderStatus orderStatus;
    public Order(Integer id,
                 float booksPrice,
                 String shippingAddress,
                 User user,
                 PaymentType paymentType) {
        this.id = id;
        this.booksPrice = booksPrice;
        this.shippingAddress = shippingAddress;
        this.user = user;
        this.paymentType = paymentType;
        this.createdAt = new Date();
    }

    public Order(Integer id,
                 float booksPrice,
                 String shippingAddress,
                 User user,
                 PaymentType paymentType,
                 OrderStatus status) {
        this.id = id;
        this.booksPrice = booksPrice;
        this.shippingAddress = shippingAddress;
        this.user = user;
        this.paymentType = paymentType;
        this.createdAt = new Date();
        this.orderStatus = status;
    }
}
