package com.example.sxmpchowseeker.dao;

import com.example.sxmpchowseeker.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CommentDAO extends JpaRepository<Comment, UUID> {

}
