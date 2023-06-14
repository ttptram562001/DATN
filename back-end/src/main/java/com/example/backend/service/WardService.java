package com.example.backend.service;

import com.example.backend.domain.Ward;

import java.util.List;

public interface WardService {
    List<Ward> saveListWard(List<Ward> wards);
    List<Ward> getAll();
}
