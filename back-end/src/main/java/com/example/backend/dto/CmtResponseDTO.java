package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CmtResponseDTO {
    private int id;
    private String content;
    private boolean isActive;
    private Date createdAt;
    private String username;
    private String bookName;
}
