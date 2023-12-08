package com.example.teamsix.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import javax.sound.sampled.Port;
import java.util.List;

@Entity

@Table(name = "usertable")
public class UserEntity  {

    @Id
    @Column(nullable = false, unique = true)
    private String username;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "portfolio_id")
    @JsonBackReference
    private Portfolio portfolio;
    private String name;
    private String password;

    private String role;

    public UserEntity() {
    }

    public UserEntity(String username, Portfolio portfolio, String name, String password, String role) {
        this.username = username;
        this.portfolio = portfolio;
        this.name = name;
        this.password = password;
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}