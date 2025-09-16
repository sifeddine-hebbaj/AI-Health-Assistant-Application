package com.aihealthbackend.aihealthbackend.service;

import com.aihealthbackend.aihealthbackend.dto.DoctorDto;

import java.util.List;

public interface DoctorService {
    List<DoctorDto> findAll();
}
