package com.example.teamsix.persistance;

import com.example.teamsix.domain.Message;
import org.springframework.data.repository.ListCrudRepository;

public interface MessageRepository extends ListCrudRepository<Message,Long> {
}
