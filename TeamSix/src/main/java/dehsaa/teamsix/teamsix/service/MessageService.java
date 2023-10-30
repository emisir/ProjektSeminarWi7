package dehsaa.teamsix.teamsix.service;

import dehsaa.teamsix.teamsix.persistence.MessageRepository;
import dehsaa.teamsix.teamsix.domain.Message;
import org.springframework.stereotype.Service;

@Service
public class MessageService  {
    private final MessageRepository messageRepository;
    public MessageService (MessageRepository messageRepository) {
        this.messageRepository = messageRepository;

    }

    public Message saveMessage(Message message){
        return messageRepository.save(message);

    }

}
