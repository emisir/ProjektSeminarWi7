package com.example.teamsix.web;

import com.example.teamsix.domain.Message;
import com.example.teamsix.service.MessageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1")
public class HelloController {


    private final MessageService messageService;
        public HelloController(MessageService messageService) {

            this.messageService = messageService;
        }


    @GetMapping("/hello")
    public ResponseEntity<String> hello(){
        return new ResponseEntity<>("hello world!", HttpStatus.OK);

    }
    @PostMapping("/message")
    public ResponseEntity<Message> postMessage(@RequestBody String messageContent){
        Message message = new Message();
        message.setMessage(messageContent);
        return new ResponseEntity<>(messageService.saveMessage(message), HttpStatus.OK);

    }

}