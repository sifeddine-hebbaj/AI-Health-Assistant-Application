package com.aihealthbackend.aihealthbackend.service;

import com.aihealthbackend.aihealthbackend.dto.AppointmentDto;
import com.aihealthbackend.aihealthbackend.dto.AppointmentRequestDto;

import java.util.List;
import java.util.UUID;
import java.time.LocalDate;
import java.time.LocalTime;

public interface AppointmentService {
    AppointmentDto save(AppointmentRequestDto appointmentRequestDto);
    List<AppointmentDto> findByPatientId(UUID patientId);
    List<AppointmentDto> findByDoctorId(UUID doctorId);
    List<LocalTime> getAvailableTimes(UUID doctorId, LocalDate date);
}
