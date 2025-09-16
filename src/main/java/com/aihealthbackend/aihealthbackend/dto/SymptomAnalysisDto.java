package com.aihealthbackend.aihealthbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SymptomAnalysisDto {
    private UUID id;
    private UUID patientId;
    private List<SymptomDto> symptoms;
    private String riskLevel;
    private String aiRecommendation;
    private String suggestedSpecialty;
    private LocalDateTime createdAt;
}
