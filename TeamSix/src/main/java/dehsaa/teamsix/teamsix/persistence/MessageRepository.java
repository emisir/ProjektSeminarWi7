package dehsaa.teamsix.teamsix.persistence;


import org.springframework.data.repository.ListCrudRepository;
import dehsaa.teamsix.teamsix.domain.Message;


public interface MessageRepository extends ListCrudRepository<Message,Long> {
}
