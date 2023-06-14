package com.example.backend.api;


import com.example.backend.domain.Book;
import com.example.backend.domain.Comment;
import com.example.backend.domain.User;
import com.example.backend.dto.CmtDTO;
import com.example.backend.service.BookService;
import com.example.backend.service.CommentService;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000/")
public class CommentResource {
    private final CommentService commentService;
    private final UserService userService;
    private final BookService bookService;

    @PostMapping
    public ResponseEntity<Comment> saveComment(@RequestBody CmtDTO cmtDTO) {
        User user = userService.getUser(cmtDTO.getUsername());
        Book book = bookService.findBookById(cmtDTO.getIdBook());
        Comment comment = new Comment(null, cmtDTO.getContent(), user, book );
        return ResponseEntity.ok().body(commentService.addComment(comment));
    }

    @PostMapping("/{idCmt}")
    public ResponseEntity<Comment> updateComment(@RequestParam(name = "content") String content,
                                                 @PathVariable(name = "idCmt") Integer idCmt) {
        return ResponseEntity.ok().body(commentService.updateComment(content, idCmt));
    }

    @DeleteMapping("/{idCmt}")
    public ResponseEntity<String> deleteComment(@PathVariable(name = "idCmt") Integer idCmt) {
        commentService.deleteComment(idCmt);
        return ResponseEntity.ok().body("successful delete");
    }
}
