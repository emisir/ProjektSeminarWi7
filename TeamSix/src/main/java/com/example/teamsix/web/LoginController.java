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

    /**
     * Liefert den derzeit eingeloggten Benutzer.
     * Gibt den eingeloggten Benutzer als UserEntity zurück, wenn dieser authentifiziert ist.
     * Gibt einen UNAUTHORIZED Status zurück, wenn kein Benutzer eingeloggt ist.
     *
     * @return ResponseEntity mit dem eingeloggten UserEntity oder UNAUTHORIZED Status.
     */
    @GetMapping("/login")
    public ResponseEntity<UserEntity> getLoggedInUser() {
        // Holt die Authentifizierungsinformationen des derzeit eingeloggten Benutzers
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Ruft die Details des eingeloggten Benutzers ab
        UserEntity loggedInUser = portfolioService.getCurrentUser(authentication.getName());

        // Gibt die Benutzerdaten zurück, wenn der Benutzer gefunden wird
        if (loggedInUser != null) {
            return new ResponseEntity<>(loggedInUser, HttpStatus.OK);
        } else {
            // Gibt einen UNAUTHORIZED Status zurück, wenn kein Benutzer eingeloggt ist
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

}
