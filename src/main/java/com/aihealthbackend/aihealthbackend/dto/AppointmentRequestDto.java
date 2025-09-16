package com.aihealthbackend.aihealthbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentRequestDto {
    private UUID patientId;
    private UUID doctorId;
    private LocalDate date;
    private LocalTime time;
    private String symptoms;
}
