package com.aihealthbackend.aihealthbackend.scheduler;

import com.aihealthbackend.aihealthbackend.model.AppointmentStatus;
import com.aihealthbackend.aihealthbackend.repository.AppointmentRepository;
import com.aihealthbackend.aihealthbackend.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Slf4j
@Component
@RequiredArgsConstructor
public class ReminderScheduler {

    private final AppointmentRepository appointmentRepository;
    private final EmailService emailService;

    private static final DateTimeFormatter DATE_FMT = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    /**
     * Runs every day at 08:00 server time to remind patients of appointments scheduled for tomorrow.
     */
    @Scheduled(cron = "0 0 8 * * *")
    public void sendTomorrowReminders() {
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        var appts = appointmentRepository.findByDateAndStatus(tomorrow, AppointmentStatus.SCHEDULED);
        if (appts.isEmpty()) {
            log.debug("No appointments scheduled for {}", tomorrow);
            return;
        }
        appts.forEach(a -> {
            try {
                if (a.getPatient() == null || a.getPatient().getEmail() == null) return;
                String to = a.getPatient().getEmail();
                String subject = "Rappel de Rendez-vous - AI Health Assistant";
                String body = "Bonjour " + a.getPatient().getFirstName() + ",\n\n" +
                        "Ceci est un rappel pour votre rendez-vous de demain :\n" +
                        "- Date : " + a.getDate().format(DATE_FMT) + "\n" +
                        "- Heure : " + a.getTime() + "\n" +
                        (a.getDoctor() != null ? "- Médecin : Dr. " + a.getDoctor().getFirstName() + " " + a.getDoctor().getLastName() + "\n" : "") +
                        (a.getDoctor() != null ? "- Spécialité : " + a.getDoctor().getSpecialty() + "\n" : "") +
                        (a.getSymptoms() != null && !a.getSymptoms().isBlank() ? "- Motif : " + a.getSymptoms() + "\n" : "") +
                        "\nMerci de vous présenter quelques minutes en avance.\n\n" +
                        "Cordialement,\nAI Health Assistant";
                emailService.send(to, subject, body);
            } catch (Exception ex) {
                log.warn("Failed to send reminder for appointment {}: {}", a.getId(), ex.getMessage());
            }
        });
    }
}
