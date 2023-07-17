package com.example.backend.api;

import com.example.backend.domain.*;
import com.example.backend.dto.*;
import com.example.backend.service.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin()
@Slf4j
public class OrderResource {
    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    @Autowired
    private PaymentTypeService paymentTypeService;

    @Autowired
    private OrderStatusService orderStatusService;

    @Autowired
    private OrderDetailService orderDetailService;

    @GetMapping
    public ResponseEntity<Collection<OrderResponseDTO>> getAll() {
        Collection<OrderResponseDTO> dtoCollection = new ArrayList<>();
        Collection<Order> orders = orderService.getAllOrder();
        orders.forEach(o -> {
            OrderResponseDTO orderResponseDTO =
                            new OrderResponseDTO(o.getId(),
                                    o.getBooksPrice(),
                                    o.getPaymentType().getName(),
                                    o.getUser().getUsername(),
                                    o.getShippingAddress(), o.getCreatedAt(),  o.getOrderStatus().getName());
                dtoCollection.add(orderResponseDTO);
        });
        return ResponseEntity.ok().body(dtoCollection);
    }

    @GetMapping("/get-order-detail/{idOrder}")
    public ResponseEntity<OrderDetailResponseDTO> getOrderDetail(@PathVariable(name = "idOrder") int idOrder) {
        Order order = orderService.getOrderById(idOrder);
        log.info(order.toString());
        OrderDetailResponseDTO dto = new OrderDetailResponseDTO();
        if (order != null) {
            dto.setCurrentStatus(order.getOrderStatus());
            dto.setAddress(order.getShippingAddress());
            dto.setPaymentType(order.getPaymentType().getName());
            dto.setTotalPrices(order.getBooksPrice());
            ArrayList<OrderDetailCustom> list = new ArrayList<>();
            order.getOrderDetails().forEach(o -> {
                list.add(new OrderDetailCustom(o.getAmount(), o.getBook().getTitle(), o.getBook().getPrice(), o.getBook().getImage()));
            });
            dto.setOrderDetailDTOS(list);
        }
        return ResponseEntity.ok().body(dto);
    }

    @GetMapping("/{username}")
    public ResponseEntity<Collection<OrderResponseDTO>> getOrdersByUser(@PathVariable(name = "username") String username) {
//        User user = userService.getUser(username);
//        return ResponseEntity.ok().body(orderService.findOrdersByUser(user));
        Collection<OrderResponseDTO> dtoCollection = new ArrayList<>();
        Collection<Order> orders = orderService.findOrdersByUser(userService.getUser(username));
        orders.forEach(o -> {
            OrderResponseDTO orderResponseDTO =
                    new OrderResponseDTO(o.getId(),
                            o.getBooksPrice(),
                            o.getPaymentType().getName(),
                            o.getUser().getUsername(),
                            o.getShippingAddress(), o.getCreatedAt(),  o.getOrderStatus().getName());
            dtoCollection.add(orderResponseDTO);
        });
        return ResponseEntity.ok().body(dtoCollection);
    }


    @PostMapping
    public ResponseEntity<Order> saveOrder(@RequestBody OrderData orderData) {
        OrderDTO orderDTO = orderData.getOrderDTO();
        User user = userService.getUser(orderDTO.getUsername());
        PaymentType paymentType = paymentTypeService.findPaymentTypeById(orderDTO.getIdPaymentType());
        OrderStatus orderStatus = orderStatusService.getOderStatusById(4);
        Order order = new Order(null,
                orderDTO.getPriceBooks(),
                orderDTO.getAddress(),
                user,
                paymentType,
                orderStatus);

        List<OrderDetailDTO> orderDetailDTOs = orderData.getOrderDetailDTOList();
        orderDetailDTOs.forEach(i -> {
            OrderDetail orderDetail = new OrderDetail(null, i.getAmount(), bookService.findBookById(i.getIdBook()), order);
            order.getOrderDetails().add(orderDetail);
        });
        return ResponseEntity.ok().body(orderService.saveOrder(order));
    }

    @PostMapping("/update-status/{idOrder}/{idStatus}")
    public ResponseEntity<Order> UpdateOrderStatus(@PathVariable(name = "idOrder") Integer idOrder, @PathVariable(name = "idStatus") int idStatus) {
        OrderStatus orderStatus = orderStatusService.getOderStatusById(idStatus);
        Order order = orderService.getOrderById(idOrder);
        order.setOrderStatus(orderStatus);
        if (idStatus == 5) {
            order.getOrderDetails().forEach(i -> {
                OrderDetail orderDetail = orderDetailService.getById(i.getId());
                if (orderDetail != null) {
                    bookService.updateAmounBook(orderDetail.getBook().getId(), i.getAmount());
                }
            });

        }
        return ResponseEntity.ok().body(orderService.saveOrder(order));
    }

}
