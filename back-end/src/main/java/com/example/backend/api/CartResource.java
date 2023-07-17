package com.example.backend.api;

import com.example.backend.domain.Book;
import com.example.backend.domain.Cart;
import com.example.backend.domain.CartItem;
import com.example.backend.repository.CartItemRepo;
import com.example.backend.repository.CartRepo;
import com.example.backend.service.BookService;
import com.example.backend.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/carts")
@RequiredArgsConstructor
@CrossOrigin()
@Slf4j
public class CartResource {
    private final CartService cartService;
    private final BookService bookService;


    @GetMapping("/{id}")
    public ResponseEntity<Cart> getCart(@PathVariable(name = "id") Integer id) {
        return ResponseEntity.ok().body(cartService.getCart(id));
    }

    @GetMapping("/by-user")
    public ResponseEntity<Cart> getCartByUser(@RequestParam(name = "username") String username) {
        return ResponseEntity.ok().body(cartService.getCartByUser(username));
    }

    @PostMapping("/add-item/{username}/{amount}/{idBook}")
    public ResponseEntity<Cart> addItemToCart(@PathVariable(name = "username") String username,
                                              @PathVariable(name = "amount") int amount,
                                              @PathVariable(name = "idBook") Integer idBook) {
        Book book = bookService.findBookById(idBook);
        return ResponseEntity.ok().body(cartService.addItemToCart(username, book, amount));
    }

    @DeleteMapping("/{idCartItem}")
    public ResponseEntity<String> removeCartItem(@PathVariable(name = "idCartItem") Integer idCartItem) {
        log.info(String.valueOf(idCartItem));
        if (cartService.deleteItem(idCartItem)) {
            return ResponseEntity.ok().body("Successful delete");
        }
        return ResponseEntity.badRequest().body("Failed delete");
    }


}
