package com.example.backend.service;

import com.example.backend.domain.Account;

public interface AccountService {
    Account saveAccount(Account account);
    Account getAccountById(int id);
    Account getAccountByUsername(String username);
}
