package com.aihealthbackend.aihealthbackend.controller;

import com.aihealthbackend.aihealthbackend.dto.AppointmentDto;
import com.aihealthbackend.aihealthbackend.dto.AppointmentRequestDto;
import com.aihealthbackend.aihealthbackend.service.AppointmentService;
import org.springframework.format.annotation.DateTimeFormat;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<AppointmentDto> bookAppointment(@RequestBody AppointmentRequestDto appointmentRequestDto) {
        return ResponseEntity.ok(appointmentService.save(appointmentRequestDto));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<AppointmentDto>> getPatientAppointments(@PathVariable UUID patientId) {
        return ResponseEntity.ok(appointmentService.findByPatientId(patientId));
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<AppointmentDto>> getDoctorAppointments(@PathVariable UUID doctorId) {
        return ResponseEntity.ok(appointmentService.findByDoctorId(doctorId));
    }

    @GetMapping("/available")
    public ResponseEntity<List<LocalTime>> getAvailableTimes(
            @RequestParam UUID doctorId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(appointmentService.getAvailableTimes(doctorId, date));
    }
}
