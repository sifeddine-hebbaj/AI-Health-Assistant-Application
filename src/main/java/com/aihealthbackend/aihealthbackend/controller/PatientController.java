package com.aihealthbackend.aihealthbackend.controller;

import com.aihealthbackend.aihealthbackend.dto.UserDto;
import com.aihealthbackend.aihealthbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllPatients() {
        return ResponseEntity.ok(userService.findPatients());
    }
}
