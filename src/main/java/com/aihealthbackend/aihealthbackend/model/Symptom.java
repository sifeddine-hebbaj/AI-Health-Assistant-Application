package com.aihealthbackend.aihealthbackend.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class Symptom {

    private String name;
    private String severity;
    private String duration;
    private String description;
}
