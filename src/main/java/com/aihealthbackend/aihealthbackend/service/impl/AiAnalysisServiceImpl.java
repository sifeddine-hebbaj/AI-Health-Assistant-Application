package com.aihealthbackend.aihealthbackend.service.impl;

import com.aihealthbackend.aihealthbackend.model.Symptom;
import com.aihealthbackend.aihealthbackend.service.AiAnalysisService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AiAnalysisServiceImpl implements AiAnalysisService {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${mistral.api.key}")
    private String apiKey;

    @Value("${mistral.api.url:https://api.mistral.ai/v1/chat/completions}")
    private String apiUrl;

    @Value("${mistral.model:mistral-small-latest}")
    private String model;

    @Override
    public Map<String, String> analyze(List<Symptom> symptoms) throws Exception {
        // Build a concise, deterministic prompt asking for strict JSON
        String symptomsText = symptoms.stream()
                .map(s -> String.format("- name: %s; severity: %s; duration: %s; desc: %s",
                        nullSafe(s.getName()), nullSafe(s.getSeverity()), nullSafe(s.getDuration()), nullSafe(s.getDescription())))
                .collect(Collectors.joining("\n"));

        String systemPrompt = "You are a medical triage assistant. Analyze provided symptoms and return a short JSON with keys: riskLevel (one of: low, medium, high, urgent), aiRecommendation, suggestedSpecialty. Keep it short.";
        String userPrompt = "Symptoms (YAML lines):\n" + symptomsText + "\n\nRespond ONLY with compact JSON like: {\"riskLevel\":\"medium\",\"aiRecommendation\":\"...\",\"suggestedSpecialty\":\"General Medicine\"}";

        RestTemplate rest = new RestTemplate();

        // Build request body according to Mistral chat completions API
        Map<String, Object> body = new HashMap<>();
        body.put("model", model);
        body.put("temperature", 0.2);
        body.put("messages", List.of(
                Map.of("role", "system", "content", systemPrompt),
                Map.of("role", "user", "content", userPrompt)
        ));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = rest.exchange(apiUrl, HttpMethod.POST, entity, String.class);
        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            throw new RuntimeException("Mistral API error: " + response.getStatusCode());
        }

        // Parse completion content
        JsonNode root = objectMapper.readTree(response.getBody());
        JsonNode choices = root.path("choices");
        if (!choices.isArray() || choices.isEmpty()) {
            throw new RuntimeException("No choices returned from Mistral API");
        }
        String content = choices.get(0).path("message").path("content").asText("");
        if (content.isBlank()) {
            throw new RuntimeException("Empty content from Mistral API");
        }

        // Content should be a JSON string per our instruction; attempt to parse
        Map<String, String> result = new HashMap<>();
        try {
            JsonNode json = objectMapper.readTree(content);
            result.put("riskLevel", json.path("riskLevel").asText("medium"));
            result.put("aiRecommendation", json.path("aiRecommendation").asText("Veuillez consulter un médecin si les symptômes persistent."));
            result.put("suggestedSpecialty", json.path("suggestedSpecialty").asText("General Medicine"));
        } catch (Exception e) {
            // Fallback: if content is not pure JSON, set defaults
            result.put("riskLevel", "medium");
            result.put("aiRecommendation", content);
            result.put("suggestedSpecialty", "General Medicine");
        }
        return result;
    }

    private String nullSafe(String s) { return s == null ? "" : s; }
}
