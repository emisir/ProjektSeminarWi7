package dehsaa.teamsix.teamsix.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table(name = "message")
@Entity
public class Message {

    @Id
    @GeneratedValue

    private Long id;
    private String Message;

    public Long getId() {
        return id;
    }

    public String getMessage() {
        return Message;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setMessage(String message) {
        Message = message;
    }
}
