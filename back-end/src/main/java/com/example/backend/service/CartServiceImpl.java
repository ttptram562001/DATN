package com.example.backend.service;

import com.example.backend.domain.Book;
import com.example.backend.domain.Cart;
import com.example.backend.domain.CartItem;
import com.example.backend.domain.User;
import com.example.backend.repository.CartItemRepo;
import com.example.backend.repository.CartRepo;
import com.example.backend.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CartServiceImpl implements CartService{
    private final CartRepo cartRepo;

    @Autowired
    private CartItemRepo cartItemRepo;
    private final UserRepo userRepo;

    @Override
    public Cart addItemToCart(String username, Book book, int amount) {
        User user = userRepo.findByUsername(username);
        Cart cart = cartRepo.findCartByUser(user);
        if (cart != null) {
            CartItem cartItem = new CartItem(null, amount, book.getPrice(), book, cart);
            cart.getCartItems().add(cartItem);
        }
        return cart;
    }

    @Override
    public Cart getCart(Integer id) {
        return cartRepo.findById(id).orElse(null);
    }

    @Override
    public Boolean deleteItem(Integer idItem) {
        CartItem cartItem = cartItemRepo.findById(idItem).orElse(null);
        if (cartItem != null) {
            cartItemRepo.deleteById(idItem);
            return true;
        }
        return false;
    }

    @Override
    public Cart getCartByUser(String username) {
        User user = userRepo.findByUsername(username);
        if (user != null) {
            return cartRepo.findCartByUser(user);
        }
        return null;
    }

    @Override
    public Cart saveCart(Cart cart) {
        return cartRepo.save(cart);
    }
}
