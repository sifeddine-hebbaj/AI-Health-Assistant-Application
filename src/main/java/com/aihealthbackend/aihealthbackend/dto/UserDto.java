package com.aihealthbackend.aihealthbackend.dto;

import com.aihealthbackend.aihealthbackend.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private Role role;
    private LocalDateTime createdAt;
}
