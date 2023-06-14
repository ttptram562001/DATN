package com.example.backend.service;

import com.example.backend.domain.Comment;

import java.util.ArrayList;
import java.util.Collection;

public interface CommentService {
    Collection<Comment> getAllComment(Integer bookId);
    Comment addComment(Comment comment);
    Comment updateComment(String content, Integer idCmt);
    void deleteComment(Integer idCmt);
}
