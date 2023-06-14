package com.example.backend.api;

import com.example.backend.domain.PaymentType;
import com.example.backend.service.PaymentTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment-types")
public class PaymentTypeResource {
    @Autowired
    private PaymentTypeService paymentTypeService;

    @GetMapping("/{id-payment}")
    public ResponseEntity<PaymentType> getPaymentType(@PathVariable(name = "id-payment") Integer id) {
        return ResponseEntity.ok().body(paymentTypeService.findPaymentTypeById(id));
    }

    @PostMapping
    public ResponseEntity<PaymentType> savePaymentType(@RequestParam(name = "name-paymentType") String name) {
        return ResponseEntity.ok().body(paymentTypeService.savePaymentType(new PaymentType(null, name)));
    }
}
