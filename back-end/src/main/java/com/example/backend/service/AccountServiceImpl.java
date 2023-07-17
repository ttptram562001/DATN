package com.example.backend.service;

import com.example.backend.domain.Account;
import com.example.backend.repository.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements AccountService{
    @Autowired
    private AccountRepo accountRepo;

    @Override
    public Account saveAccount(Account account) {
        return accountRepo.save(account);
    }

    @Override
    public Account getAccountById(int id) {
        return accountRepo.findById(id).orElse(null);
    }

    @Override
    public Account getAccountByUsername(String username) {
        return accountRepo.findAccountByUsername(username);
    }
}
