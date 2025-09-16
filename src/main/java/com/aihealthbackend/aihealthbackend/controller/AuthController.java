package com.aihealthbackend.aihealthbackend.controller;

import com.aihealthbackend.aihealthbackend.dto.LoginRequestDto;
import com.aihealthbackend.aihealthbackend.dto.RegisterRequestDto;
import com.aihealthbackend.aihealthbackend.dto.UserDto;
import com.aihealthbackend.aihealthbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody RegisterRequestDto registerRequestDto) {
        return ResponseEntity.ok(userService.register(registerRequestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody LoginRequestDto loginRequestDto) {
        UserDto userDto = userService.findByEmail(loginRequestDto.getEmail());
        if (userDto != null) { // In a real app, check the password
            return ResponseEntity.ok(userDto);
        }
        return ResponseEntity.status(401).build();
    }
}
