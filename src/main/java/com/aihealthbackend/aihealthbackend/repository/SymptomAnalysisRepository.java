package com.aihealthbackend.aihealthbackend.repository;

import com.aihealthbackend.aihealthbackend.model.SymptomAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SymptomAnalysisRepository extends JpaRepository<SymptomAnalysis, UUID> {
    List<SymptomAnalysis> findByPatientId(UUID patientId);
    long countByRiskLevelIn(List<String> riskLevels);
}
