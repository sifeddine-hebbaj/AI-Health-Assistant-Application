package com.aihealthbackend.aihealthbackend.model;

import jakarta.persistence.*;
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
@Entity
@Table(name = "symptom_analyses")
public class SymptomAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private User patient;

    @ElementCollection
    private List<Symptom> symptoms;

    private String riskLevel;
    private String aiRecommendation;
    private String suggestedSpecialty;

    private LocalDateTime createdAt;
}
