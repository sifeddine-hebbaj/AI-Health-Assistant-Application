package com.aihealthbackend.aihealthbackend.service.impl;

import com.aihealthbackend.aihealthbackend.dto.SymptomAnalysisDto;
import com.aihealthbackend.aihealthbackend.mapper.SymptomAnalysisMapper;
import com.aihealthbackend.aihealthbackend.model.SymptomAnalysis;
import com.aihealthbackend.aihealthbackend.repository.SymptomAnalysisRepository;
import com.aihealthbackend.aihealthbackend.service.AiAnalysisService;
import com.aihealthbackend.aihealthbackend.service.SymptomAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SymptomAnalysisServiceImpl implements SymptomAnalysisService {

    private final SymptomAnalysisRepository symptomAnalysisRepository;
    private final SymptomAnalysisMapper symptomAnalysisMapper;
    private final AiAnalysisService aiAnalysisService;

    @Override
    public SymptomAnalysisDto save(SymptomAnalysisDto symptomAnalysisDto) {
        symptomAnalysisDto.setCreatedAt(LocalDateTime.now());

        // Map DTO to entity to access embedded symptoms
        SymptomAnalysis toAnalyze = symptomAnalysisMapper.toSymptomAnalysis(symptomAnalysisDto);

        try {
            var ai = aiAnalysisService.analyze(toAnalyze.getSymptoms());
            toAnalyze.setRiskLevel(ai.getOrDefault("riskLevel", "medium"));
            toAnalyze.setAiRecommendation(ai.getOrDefault("aiRecommendation", "Consultez un médecin généraliste."));
            toAnalyze.setSuggestedSpecialty(ai.getOrDefault("suggestedSpecialty", "General Medicine"));
        } catch (Exception e) {
            // Fallback defaults if AI call fails
            toAnalyze.setRiskLevel("medium");
            toAnalyze.setAiRecommendation("Consultez un médecin généraliste si les symptômes persistent.");
            toAnalyze.setSuggestedSpecialty("General Medicine");
        }

        return symptomAnalysisMapper.toSymptomAnalysisDto(symptomAnalysisRepository.save(toAnalyze));
    }

    @Override
    public List<SymptomAnalysisDto> findByPatientId(UUID patientId) {
        return symptomAnalysisRepository.findByPatientId(patientId).stream()
                .map(symptomAnalysisMapper::toSymptomAnalysisDto)
                .collect(Collectors.toList());
    }
}
