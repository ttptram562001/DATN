package com.example.backend.api;


import com.example.backend.domain.Book;
import com.example.backend.domain.Comment;
import com.example.backend.domain.User;
import com.example.backend.dto.CmtDTO;
import com.example.backend.dto.CmtResponseDTO;
import com.example.backend.service.BookService;
import com.example.backend.service.CommentService;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
@CrossOrigin()
public class CommentResource {
    private final CommentService commentService;
    private final UserService userService;
    private final BookService bookService;

    @GetMapping
    public ResponseEntity<Collection<CmtResponseDTO>> getComment() {
        Collection<Comment> comments = commentService.getComment();
        Collection<CmtResponseDTO> dtoCollection = new ArrayList<>();
        comments.forEach(i -> {
            dtoCollection.add(new CmtResponseDTO(i.getId(),
                                                    i.getContent() ,
                                                    i.getIsActive(),
                                                    i.getCreatedAt(),
                                                    i.getUser().getUsername() ,
                                                    i.getBook().getTitle()));
        });
                return ResponseEntity.ok().body(dtoCollection);
    }

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

    @PostMapping("/active-cmt/{idCmt}")
    public ResponseEntity<Boolean> deleteComment(@PathVariable(name = "idCmt") Integer idCmt) {
        Boolean isActive = commentService.activeComment(idCmt);
        return ResponseEntity.ok().body(isActive);
    }
}
