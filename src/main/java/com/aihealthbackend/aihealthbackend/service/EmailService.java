package com.aihealthbackend.aihealthbackend.service;

public interface EmailService {
    void send(String to, String subject, String text);
}
