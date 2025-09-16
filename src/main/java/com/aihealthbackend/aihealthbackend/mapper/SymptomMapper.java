package com.aihealthbackend.aihealthbackend.mapper;

import com.aihealthbackend.aihealthbackend.dto.SymptomDto;
import com.aihealthbackend.aihealthbackend.model.Symptom;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface SymptomMapper {

    SymptomMapper INSTANCE = Mappers.getMapper(SymptomMapper.class);

    SymptomDto toSymptomDto(Symptom symptom);

    Symptom toSymptom(SymptomDto symptomDto);
}
