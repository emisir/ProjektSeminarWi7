package com.example.teamsix.service;

import com.example.teamsix.domain.UserEntity;
import com.example.teamsix.persistance.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailService implements UserDetailsService {

    private final UserRepository userRepository;


    public UserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Lädt Benutzerdetails anhand des Benutzernamens.
     * Wenn der Benutzer gefunden wird, werden seine Details als UserDetails-Objekt zurückgegeben.
     * Wirft eine UsernameNotFoundException, wenn kein Benutzer mit dem angegebenen Benutzernamen gefunden wird.
     *
     * @param username Der Benutzername des zu ladenden Benutzers.
     * @return Ein UserDetails-Objekt, das die Benutzerdaten enthält.
     * @throws UsernameNotFoundException, wenn kein Benutzer mit dem angegebenen Benutzernamen gefunden wird.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Suche den Benutzer anhand des Benutzernamens
        UserEntity user = userRepository.findByUsername(username);

        // Erstelle UserDetails, wenn der Benutzer gefunden wird
        if (user != null) {
            return new User(user.getUsername(), user.getPassword(), buildSimpleGrantedAuthorities(user.getRole()));
        } else {
            // Werfe eine Ausnahme, wenn kein Benutzer gefunden wird
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }

    private static List<SimpleGrantedAuthority> buildSimpleGrantedAuthorities(final String roles) {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(roles));
        return authorities;
    }

}