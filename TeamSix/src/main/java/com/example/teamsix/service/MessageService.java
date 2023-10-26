package com.example.teamsix.service;

import com.example.teamsix.domain.Message;
import com.example.teamsix.persistance.MessageRepository;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        // Konstruktor für MessageService, injiziert MessageRepository
        this.messageRepository = messageRepository;
    }

    public Message saveMessage(Message message){
        // Methode zum Speichern einer Nachricht in der Datenbank
        return messageRepository.save(message);
        // Gibt die gespeicherte Nachricht zurück
    }
}
