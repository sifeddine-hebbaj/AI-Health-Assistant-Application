package com.aihealthbackend.aihealthbackend.service.impl;

import com.aihealthbackend.aihealthbackend.dto.RegisterRequestDto;
import com.aihealthbackend.aihealthbackend.dto.UserDto;
import com.aihealthbackend.aihealthbackend.mapper.UserMapper;
import com.aihealthbackend.aihealthbackend.model.Role;
import com.aihealthbackend.aihealthbackend.model.User;
import com.aihealthbackend.aihealthbackend.repository.UserRepository;
import com.aihealthbackend.aihealthbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserDto register(RegisterRequestDto registerRequestDto) {
        User user = User.builder()
                .firstName(registerRequestDto.getFirstName())
                .lastName(registerRequestDto.getLastName())
                .email(registerRequestDto.getEmail())
                .password(registerRequestDto.getPassword()) // In a real app, hash the password
                .role(Role.PATIENT)
                .build();
        return userMapper.toUserDto(userRepository.save(user));
    }

    @Override
    public UserDto findByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(userMapper::toUserDto)
                .orElse(null);
    }

    @Override
    public UserDto findById(UUID id) {
        return userRepository.findById(id)
                .map(userMapper::toUserDto)
                .orElse(null);
    }

    @Override
    public List<UserDto> findAll() {
        return userRepository.findAll().stream()
                .map(userMapper::toUserDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<UserDto> findPatients() {
        return userRepository.findByRoleOrderByCreatedAtDesc(Role.PATIENT).stream()
                .map(userMapper::toUserDto)
                .collect(Collectors.toList());
    }
}
