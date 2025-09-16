package com.aihealthbackend.aihealthbackend.dto;

import com.aihealthbackend.aihealthbackend.model.AppointmentStatus;
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
public class AppointmentDto {
    private UUID id;
    private UUID patientId;
    private DoctorDto doctor;
    private LocalDate date;
    private LocalTime time;
    private String symptoms;
    private AppointmentStatus status;
}
