package com.aihealthbackend.aihealthbackend.controller;

import com.aihealthbackend.aihealthbackend.dto.SymptomAnalysisDto;
import com.aihealthbackend.aihealthbackend.service.SymptomAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/symptom-analyses")
@RequiredArgsConstructor
public class SymptomAnalysisController {

    private final SymptomAnalysisService symptomAnalysisService;

    @PostMapping
    public ResponseEntity<SymptomAnalysisDto> analyzeSymptoms(@RequestBody SymptomAnalysisDto symptomAnalysisDto) {
        return ResponseEntity.ok(symptomAnalysisService.save(symptomAnalysisDto));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<SymptomAnalysisDto>> getPatientHistory(@PathVariable UUID patientId) {
        return ResponseEntity.ok(symptomAnalysisService.findByPatientId(patientId));
    }
}
