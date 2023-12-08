package com.example.teamsix.persistance;

import com.example.teamsix.domain.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity, String> {
    UserEntity findByUsername(String username);

    UserEntity findAllByName(String name);
}