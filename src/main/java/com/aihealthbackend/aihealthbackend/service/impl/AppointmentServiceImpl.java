package com.aihealthbackend.aihealthbackend.service.impl;

import com.aihealthbackend.aihealthbackend.dto.AppointmentDto;
import com.aihealthbackend.aihealthbackend.dto.AppointmentRequestDto;
import com.aihealthbackend.aihealthbackend.mapper.AppointmentMapper;
import com.aihealthbackend.aihealthbackend.model.Appointment;
import com.aihealthbackend.aihealthbackend.model.AppointmentStatus;
import com.aihealthbackend.aihealthbackend.repository.AppointmentRepository;
import com.aihealthbackend.aihealthbackend.repository.DoctorRepository;
import com.aihealthbackend.aihealthbackend.repository.UserRepository;
import com.aihealthbackend.aihealthbackend.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final AppointmentMapper appointmentMapper;
    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;

    @Override
    public AppointmentDto save(AppointmentRequestDto appointmentRequestDto) {
        var patient = userRepository.getReferenceById(appointmentRequestDto.getPatientId());
        var doctor = doctorRepository.getReferenceById(appointmentRequestDto.getDoctorId());

        Appointment appointment = Appointment.builder()
                .patient(patient)
                .doctor(doctor)
                .date(appointmentRequestDto.getDate())
                .time(appointmentRequestDto.getTime())
                .symptoms(appointmentRequestDto.getSymptoms())
                .status(AppointmentStatus.SCHEDULED)
                .build();
        return appointmentMapper.toAppointmentDto(appointmentRepository.save(appointment));
    }

    @Override
    public List<AppointmentDto> findByPatientId(UUID patientId) {
        return appointmentRepository.findByPatientId(patientId).stream()
                .map(appointmentMapper::toAppointmentDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AppointmentDto> findByDoctorId(UUID doctorId) {
        return appointmentRepository.findByDoctorId(doctorId).stream()
                .map(appointmentMapper::toAppointmentDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<LocalTime> getAvailableTimes(UUID doctorId, LocalDate date) {
        // Fetch existing bookings for the doctor on the selected date
        var existing = appointmentRepository.findByDoctorIdAndDate(doctorId, date);
        var taken = new HashSet<LocalTime>();
        for (var a : existing) {
            taken.add(a.getTime());
        }

        // Build all slots between 09:00 and 16:00 inclusive end bound excluded, step 30 minutes
        var start = LocalTime.of(9, 0);
        var lunchStart = LocalTime.of(12, 0);
        var lunchEnd = LocalTime.of(13, 0);
        var end = LocalTime.of(16, 0).plusMinutes(30); // generate until 16:30 exclusive to include 16:00

        List<LocalTime> slots = new ArrayList<>();
        for (LocalTime t = start; t.isBefore(end); t = t.plusMinutes(30)) {
            // skip lunch break 12:00-13:00
            if (!t.isBefore(lunchStart) && t.isBefore(lunchEnd)) {
                continue;
            }
            // do not include 16:30 (due to end bound), effectively last is 16:00
            if (!taken.contains(t)) {
                slots.add(t);
            }
        }
        return slots;
    }
}
