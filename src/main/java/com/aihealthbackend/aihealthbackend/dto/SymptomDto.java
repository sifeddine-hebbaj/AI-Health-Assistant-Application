package com.aihealthbackend.aihealthbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SymptomDto {
    private String name;
    private String severity;
    private String duration;
    private String description;
}
