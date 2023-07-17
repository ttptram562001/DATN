package com.example.backend.api;

import com.example.backend.config.VNPAYConfig;
import com.example.backend.domain.*;
import com.example.backend.dto.*;
import com.example.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin()
@RestController
@RequestMapping("/api/vnpay")
public class CreatePaymentController {


    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderStatusService orderStatusService;

    @Autowired
    private PaymentTypeService paymentTypeService;

    @Autowired
    private BookService bookService;



    @PostMapping
    public ResponseEntity<?> payment(@RequestBody OrderData orderData) throws  IOException {
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
        orderService.saveOrder(order);
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String vnp_OrderInfo = "Thanh Toan Tien Sach";
        String orderType ="topup";
        String vnp_TxnRef = VNPAYConfig.getRandomNumber(8);

        String vnp_IpAddr = "0:0:0:0:0:0:0:1";
        System.out.println(vnp_IpAddr);
        String vnp_TmnCode = VNPAYConfig.vnp_TmnCode;
        int amount = (int) orderDTO.getPriceBooks() * 100;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", vnp_OrderInfo);
        vnp_Params.put("vnp_OrderType", orderType);
        String bank_code = "";
        if (bank_code != null && !bank_code.isEmpty()) vnp_Params.put("vnp_BankCode", bank_code);
        vnp_Params.put("vnp_ReturnUrl", VNPAYConfig.vnp_Returnurl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        String locate = "";
        if (locate != null && !locate.isEmpty()) vnp_Params.put("vnp_Locale", locate);
        else vnp_Params.put("vnp_Locale", "vn");

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        System.out.println(cld.getTime());
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
        cld.add(Calendar.MINUTE, 436);
        String vnp_ExpireDate = formatter.format(cld.getTime());

        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);
        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = VNPAYConfig.hmacSHA512( VNPAYConfig.vnp_HashSecret, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl =  VNPAYConfig.vnp_PayUrl + "?" + queryUrl;
        Paymentrespone paymentrespone= new Paymentrespone();
        paymentrespone.setUrl(paymentUrl);
        return ResponseEntity.ok(paymentrespone);

        }
    }

