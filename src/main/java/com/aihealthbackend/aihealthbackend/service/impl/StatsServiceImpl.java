package com.aihealthbackend.aihealthbackend.service.impl;

import com.aihealthbackend.aihealthbackend.dto.StatsDto;
import com.aihealthbackend.aihealthbackend.repository.SymptomAnalysisRepository;
import com.aihealthbackend.aihealthbackend.repository.AppointmentRepository;
import com.aihealthbackend.aihealthbackend.repository.UserRepository;
import com.aihealthbackend.aihealthbackend.service.StatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StatsServiceImpl implements StatsService {

    private final UserRepository userRepository;
    private final SymptomAnalysisRepository symptomAnalysisRepository;
    private final AppointmentRepository appointmentRepository;

    @Override
    public StatsDto getStats() {
        long totalPatients = userRepository.count();
        long totalAnalyses = symptomAnalysisRepository.count();
        long totalAppointments = appointmentRepository.count();
        long highRiskCases = symptomAnalysisRepository.countByRiskLevelIn(java.util.List.of("high", "urgent"));
        return StatsDto.builder()
                .totalPatients(totalPatients)
                .totalAnalyses(totalAnalyses)
                .totalAppointments(totalAppointments)
                .highRiskCases(highRiskCases)
                .diagnosticAccuracy("95%")
                .build();
    }
}
