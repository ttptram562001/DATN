package com.example.backend.service;

import com.example.backend.domain.Book;
import com.example.backend.domain.Cart;

public interface CartService {
    Cart addItemToCart(String username, Book book, int amount);
    Cart getCart(Integer id);
    Boolean deleteItem(Integer idItem);
    Cart getCartByUser(String username);
    Cart saveCart(Cart cart);
}
