package com.aihealthbackend.aihealthbackend.service;

import com.aihealthbackend.aihealthbackend.dto.RegisterRequestDto;
import com.aihealthbackend.aihealthbackend.dto.UserDto;

import java.util.List;
import java.util.UUID;

public interface UserService {
    UserDto register(RegisterRequestDto registerRequestDto);
    UserDto findByEmail(String email);
    UserDto findById(UUID id);
    List<UserDto> findAll();
    List<UserDto> findPatients();
}
