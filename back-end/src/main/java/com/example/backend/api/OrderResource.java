package com.example.backend.api;

import com.example.backend.domain.*;
import com.example.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/orders")
public class OrderResource {
    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderDetailService orderDetailService;

    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    @Autowired
    private PaymentTypeService paymentTypeService;

    @PostMapping("/{id-user}")
    public ResponseEntity<Order> saveOrder( @PathVariable(name = "id-user") Integer idUser,
                                            @RequestParam("id-book") Integer idBook,
                                            @RequestParam("amount") Integer amount,
                                            @RequestParam("address") String address,
                                            @RequestParam("phone") String phone,
                                            @RequestParam("id-payment-type") Integer idPaymenType) {
        Book book = bookService.findBookById(idBook);

        User user = userService.getUser(idUser);
        PaymentType paymentType = paymentTypeService.findPaymentTypeById(idPaymenType);
        Order order = new Order();
        OrderDetail orderDetail = new OrderDetail(null, amount, book, order);
        order.setBooksPrice(book.getPrice() * amount);
        order.setShippingAddress(address);
        order.setCreatedAt(new Date());
        order.setDeliveryCost(30000);
        order.getOrderDetails().add(orderDetail);
        order.setUser(user);
        order.setPhone(phone);
        order.setPaymentType(paymentType);
        return ResponseEntity.ok().body(orderService.saveOrder(order));
    }
}
