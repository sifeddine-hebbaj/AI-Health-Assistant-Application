package com.aihealthbackend.aihealthbackend.repository;

import com.aihealthbackend.aihealthbackend.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import com.aihealthbackend.aihealthbackend.model.AppointmentStatus;
import java.util.List;
import java.util.UUID;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {
    List<Appointment> findByPatientId(UUID patientId);
    List<Appointment> findByDoctorId(UUID doctorId);
    List<Appointment> findByDoctorIdAndDate(UUID doctorId, LocalDate date);
    List<Appointment> findByDate(LocalDate date);
    List<Appointment> findByDateAndStatus(LocalDate date, AppointmentStatus status);
}
