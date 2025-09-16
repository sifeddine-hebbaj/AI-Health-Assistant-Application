package com.aihealthbackend.aihealthbackend.mapper;

import com.aihealthbackend.aihealthbackend.dto.AppointmentDto;
import com.aihealthbackend.aihealthbackend.model.Appointment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {DoctorMapper.class})
public interface AppointmentMapper {

    AppointmentMapper INSTANCE = Mappers.getMapper(AppointmentMapper.class);

    @Mapping(source = "patient.id", target = "patientId")
    AppointmentDto toAppointmentDto(Appointment appointment);

    @Mapping(source = "patientId", target = "patient.id")
    Appointment toAppointment(AppointmentDto appointmentDto);
}
