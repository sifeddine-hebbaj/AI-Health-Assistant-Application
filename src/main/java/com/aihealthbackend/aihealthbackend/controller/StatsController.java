package com.aihealthbackend.aihealthbackend.controller;

import com.aihealthbackend.aihealthbackend.dto.StatsDto;
import com.aihealthbackend.aihealthbackend.service.StatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stats")
@RequiredArgsConstructor
public class StatsController {

    private final StatsService statsService;

    @GetMapping
    public ResponseEntity<StatsDto> getStats() {
        return ResponseEntity.ok(statsService.getStats());
    }
}
