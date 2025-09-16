package com.aihealthbackend.aihealthbackend.service;

import com.aihealthbackend.aihealthbackend.model.Symptom;

import java.util.List;
import java.util.Map;

public interface AiAnalysisService {
    /**
     * Calls an AI provider to analyze symptoms and returns a structured map with keys:
     * - riskLevel: one of low|medium|high|urgent
     * - aiRecommendation: string
     * - suggestedSpecialty: string (optional)
     */
    Map<String, String> analyze(List<Symptom> symptoms) throws Exception;
}
