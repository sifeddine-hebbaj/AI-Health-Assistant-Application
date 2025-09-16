package com.aihealthbackend.aihealthbackend.mapper;

import com.aihealthbackend.aihealthbackend.dto.SymptomAnalysisDto;
import com.aihealthbackend.aihealthbackend.model.SymptomAnalysis;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {SymptomMapper.class})
public interface SymptomAnalysisMapper {

    SymptomAnalysisMapper INSTANCE = Mappers.getMapper(SymptomAnalysisMapper.class);

    @Mapping(source = "patient.id", target = "patientId")
    SymptomAnalysisDto toSymptomAnalysisDto(SymptomAnalysis symptomAnalysis);

    @Mapping(source = "patientId", target = "patient.id")
    SymptomAnalysis toSymptomAnalysis(SymptomAnalysisDto symptomAnalysisDto);
}
