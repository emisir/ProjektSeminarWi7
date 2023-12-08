package com.example.teamsix.web;


import org.apache.tomcat.jni.Library;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@RestController
@RequestMapping()
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class LoginController {


    @GetMapping("/login")
    public ResponseEntity<Void> postMessage() {

        return new ResponseEntity<>(HttpStatus.OK);
    }

}

