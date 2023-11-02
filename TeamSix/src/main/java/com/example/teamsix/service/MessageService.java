package com.example.teamsix.service;

import com.example.teamsix.domain.Message;
import com.example.teamsix.persistance.MessageRepository;
import org.springframework.stereotype.Service;
@Service
public class MessageService {
    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public Message saveMessage(Message message) {
        return messageRepository.save(message);

    }
}

