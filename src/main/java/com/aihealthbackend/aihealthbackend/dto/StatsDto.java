package com.aihealthbackend.aihealthbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StatsDto {
    private long totalPatients;
    private long totalAnalyses;
    private long totalAppointments;
    private long highRiskCases;
    private String diagnosticAccuracy;
}
