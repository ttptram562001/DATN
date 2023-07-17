package com.example.backend.api;


import com.example.backend.domain.Account;
import com.example.backend.domain.Address;
import com.example.backend.service.AccountService;
import com.example.backend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@Slf4j
@CrossOrigin()
@RequestMapping("/api/accounts")
public class  AccountResource {
    @Autowired
    private AccountService accountService;

    @Autowired
    private UserService userService;

    @GetMapping("/{idAccount}")
    public ResponseEntity<Account> getAccountById(@PathVariable(name = "idAccount") int idAccount) {
        return ResponseEntity.ok().body(accountService.getAccountById(idAccount));
    }

    @PostMapping("/update/{username}")
    public ResponseEntity<Account> updateAccount(@PathVariable(name = "username") String username,
                                                @RequestParam(name = "email") String email,
                                                 @RequestParam(name = "dob") String dob) throws ParseException {
    SimpleDateFormat formatter3 = new SimpleDateFormat("yyyy-MM-dd");
    Date date = formatter3.parse(dob);
    Account account = accountService.getAccountByUsername(username);
    account.setDob(date);
    account.setEmail(email);
    accountService.saveAccount(account);
    return ResponseEntity.ok().body(account);
    }

    @GetMapping("/by-username")
    public ResponseEntity<Account> getAccountByUsername(@RequestParam(name = "username") String username) {
        return ResponseEntity.ok().body(accountService.getAccountByUsername(username));
    }

    @GetMapping("/get-address-default")
    public ResponseEntity<Address> getAddressDefault() {

        return ResponseEntity.ok().body(null);
    }
}
