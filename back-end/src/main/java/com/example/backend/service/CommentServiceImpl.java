package com.example.backend.service;

import com.example.backend.domain.Book;
import com.example.backend.domain.Comment;
import com.example.backend.repository.BookRepo;
import com.example.backend.repository.CommentRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.Date;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CommentServiceImpl implements CommentService{
    private final CommentRepo commentRepo;
    private final BookRepo bookRepo;

    @Override
    public Collection<Comment> getAllComment(Integer bookId) {
        Book book = bookRepo.findById(bookId).orElse(null);
        return book.getComments();
    }

    @Override
    public Collection<Comment> getComment() {
        return commentRepo.findAll();
    }

    @Override
    public Comment addComment(Comment comment) {
        return commentRepo.save(comment);
    }

    @Override
    public Comment updateComment(String content, Integer idCmt) {
        Comment curCmt = commentRepo.findById(idCmt).orElse(null);
        if (curCmt != null) {
            curCmt.setContent(content);
            curCmt.setUpdatedAt(new Date());
            return curCmt;
        }
        return null;
    }

    @Override
    public boolean activeComment(Integer idCmt) {
        Comment cmt = commentRepo.findById(idCmt).orElse(null);
        if (cmt != null) {
            cmt.setIsActive(!cmt.getIsActive());
            commentRepo.save(cmt);
            return true;
        }
        return false;
    }
}
