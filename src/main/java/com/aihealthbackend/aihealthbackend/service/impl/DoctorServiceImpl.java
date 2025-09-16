package com.aihealthbackend.aihealthbackend.service.impl;

import com.aihealthbackend.aihealthbackend.dto.DoctorDto;
import com.aihealthbackend.aihealthbackend.mapper.DoctorMapper;
import com.aihealthbackend.aihealthbackend.repository.DoctorRepository;
import com.aihealthbackend.aihealthbackend.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;
    private final DoctorMapper doctorMapper;

    @Override
    public List<DoctorDto> findAll() {
        return doctorRepository.findAll().stream()
                .map(doctorMapper::toDoctorDto)
                .collect(Collectors.toList());
    }
}
