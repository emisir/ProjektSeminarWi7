package com.example.teamsix.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.example.teamsix.domain.UserEntity; // Annahme: Du hast eine User-Klasse für die Benutzerdaten
import com.example.teamsix.service.PortfolioService;

@RestController
@RequestMapping()
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class LoginController {

    private final PortfolioService portfolioService;

    public LoginController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping("/login")
    public ResponseEntity<UserEntity> getLoggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserEntity loggedInUser = portfolioService.getCurrentUser(authentication.getName());

        if (loggedInUser != null) {
            return new ResponseEntity<>(loggedInUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
