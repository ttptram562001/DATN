package com.example.backend.api;

import com.example.backend.domain.Rate;
import com.example.backend.domain.User;
import com.example.backend.service.BookService;
import com.example.backend.service.RateService;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rates")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000/")
public class RateResource {
    @Autowired
    private  RateService rateService;

    @Autowired
    private  UserService userService;

    @Autowired
    private  BookService bookService;

    @GetMapping("/{idBook}/{username}")
    public ResponseEntity<?> getRate(@PathVariable(name = "idBook") Integer idBook,
                                           @PathVariable(name = "username") String username) {
        Integer idUser = userService.getUser(username).getId();

        if (rateService.getRate(idUser, idBook) != null)
            return ResponseEntity.ok().body(rateService.getRate(idUser, idBook).getAmount());
        else return ResponseEntity.ok().body(0);


    }

    @PostMapping("/{idBook}/{username}/{amount}")
    public ResponseEntity<Rate> AddRate(@PathVariable(name = "idBook") Integer idBook,
                                        @PathVariable(name = "username") String username,
                                        @PathVariable(name = "amount") int amount) {

        User user = userService.getUser(username);
        Rate curRate = rateService.getRate(user.getId(), idBook);
        if ( curRate != null) {
            return ResponseEntity.ok().body(rateService.updateRate(curRate, amount));
        } else {
            Rate rate = new Rate(null, amount, user.getId(), idBook);
            return ResponseEntity.ok().body(rateService.addRate(rate));
        }

    }

}
