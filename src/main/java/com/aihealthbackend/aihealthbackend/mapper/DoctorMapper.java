package com.aihealthbackend.aihealthbackend.mapper;

import com.aihealthbackend.aihealthbackend.dto.DoctorDto;
import com.aihealthbackend.aihealthbackend.model.Doctor;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface DoctorMapper {

    DoctorMapper INSTANCE = Mappers.getMapper(DoctorMapper.class);

    DoctorDto toDoctorDto(Doctor doctor);

    Doctor toDoctor(DoctorDto doctorDto);
}
