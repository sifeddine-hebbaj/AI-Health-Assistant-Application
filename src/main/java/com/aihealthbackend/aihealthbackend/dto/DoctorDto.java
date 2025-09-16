package com.aihealthbackend.aihealthbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDto {
    private UUID id;
    private String firstName;
    private String lastName;
    private String specialty;
}
