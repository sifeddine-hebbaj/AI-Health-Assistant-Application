package com.aihealthbackend.aihealthbackend.service;

import com.aihealthbackend.aihealthbackend.dto.SymptomAnalysisDto;

import java.util.List;
import java.util.UUID;

public interface SymptomAnalysisService {
    SymptomAnalysisDto save(SymptomAnalysisDto symptomAnalysisDto);
    List<SymptomAnalysisDto> findByPatientId(UUID patientId);
}
