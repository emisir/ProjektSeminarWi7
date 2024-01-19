package com.example.teamsix.web;
import com.example.teamsix.DTO.*;


import com.example.teamsix.domain.PortfolioItem;
import com.example.teamsix.domain.UserEntity;
import com.example.teamsix.service.PortfolioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/portfolio")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)

public class PortfolioController {

    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    /**
     * Gibt alle Portfolio-Elemente zurück.
     *
     * @return ResponseEntity mit der Liste aller Portfolio-Elemente.
     */
    @GetMapping()
    public ResponseEntity<List<PortfolioItem>> getPortfolioItem(){
        List<PortfolioItem> portfolioItems = portfolioService.getPortfolioItems();
        return ResponseEntity.ok(portfolioItems);
    }

    /**
     * Gibt die favorisierten Portfolio-Elemente eines bestimmten Benutzers zurück.
     *
     * @param username Der Benutzername des Benutzers, dessen Favoriten abgerufen werden.
     * @return ResponseEntity mit der Liste der favorisierten Portfolio-Elemente.
     */
    @GetMapping("/favorite/{username}")
    public ResponseEntity<List<PortfolioSummary>> getFavoritePortfolioItems(@PathVariable String username) {
        List<PortfolioSummary> favoriteItems = portfolioService.getFavPortfolioItemsByUser(username);
        return ResponseEntity.ok(favoriteItems);
    }

    /**
     * Gibt alle Benutzerentitäten zurück.
     *
     * @return ResponseEntity mit der Liste aller Benutzerentitäten.
     */
    @GetMapping("/userTable")
    public ResponseEntity<List<UserEntity>> getUserEntity(){
        List<UserEntity> userEntities = portfolioService.getUserEntities();
        return ResponseEntity.ok(userEntities);
    }

    /**
     * Gibt eine Zusammenfassung des Portfolios für eine gegebene Portfolio-ID zurück.
     * Überprüft, ob eine Zusammenfassung für das angegebene Portfolio vorhanden ist.
     * Gibt die Zusammenfassung zurück, wenn sie existiert, andernfalls einen Not Found Status.
     *
     * @param id Die ID des Portfolios, für das die Zusammenfassung abgerufen wird.
     * @return ResponseEntity mit der Portfoliozusammenfassung, wenn vorhanden, sonst ein Not Found Status.
     */
    @GetMapping("/{id}/summary")
    public ResponseEntity<List<PortfolioSummary>> getPortfolioSummary(@PathVariable("id") Long id) {
        List<PortfolioSummary> portfolioSummary = portfolioService.getPortfolioSummary(id);

        // Prüfe, ob eine Zusammenfassung vorhanden ist
        if (portfolioSummary != null) {
            return ResponseEntity.ok(portfolioSummary);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    /**
     * Gibt Details eines Portfolio-Elements für eine gegebene Portfolio-ID und ISIN zurück.
     *
     * @param portfolioId Die ID des Portfolios.
     * @param isin Die ISIN des Portfolio-Elements.
     * @return ResponseEntity mit den Details des Portfolio-Elements.
     */
    @GetMapping("/{id}/detail/{isin}")
    public ResponseEntity<PortfolioDetailDTO> getPortfolioItem(@PathVariable("id")Long portfolioId, @PathVariable("isin") String isin){
        PortfolioDetailDTO portfolioItems = portfolioService.getPortfolioItemsByPortfolioId(portfolioId,isin);
        return ResponseEntity.ok(portfolioItems);
    }

    /**
     * Fügt ein neues Portfolio-Element zu einem Portfolio hinzu.
     * Versucht, ein Portfolio-Element hinzuzufügen, und fängt etwaige IllegalArgumentExceptions.
     * Bestätigt den Erfolg der Operation oder liefert eine Fehlermeldung, falls eine Ausnahme auftritt.
     *
     * @param id Die ID des Portfolios, zu dem das Element hinzugefügt wird.
     * @param saveItemDTO Die Daten des zu speichernden Portfolio-Elements.
     * @return ResponseEntity, die den Erfolg der Operation bestätigt oder eine Fehlermeldung enthält, falls eine Ausnahme auftritt.
     */
    @PostMapping("/{id}/add-item")
    public ResponseEntity<String> addPortfolioItem(@PathVariable("id") Long id, @RequestBody @Valid SaveItemDTO saveItemDTO) {
        try {
            // Versuche, das Portfolio-Element hinzuzufügen
            portfolioService.addPortfolioItem(id, saveItemDTO);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            // Fange und verarbeite IllegalArgumentException
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Kauft ein Portfolio-Element für ein bestimmtes Portfolio.
     * Versucht, ein Portfolio-Element zu kaufen, und fängt IllegalArgumentExceptions, falls diese auftreten.
     * Bestätigt den Erfolg der Operation oder liefert eine Fehlermeldung, falls eine Ausnahme auftritt.
     *
     * @param id Die ID des Portfolios, in dem das Element gekauft wird.
     * @param isin Die ISIN des zu kaufenden Portfolio-Elements.
     * @param saveItemDTO Die Kaufdetails.
     * @return ResponseEntity, die den Erfolg der Operation bestätigt oder eine Fehlermeldung enthält.
     */
    @PostMapping("/{id}/buy-item/{isin}")
    public ResponseEntity<String> buyItem(@PathVariable("id") Long id, @PathVariable("isin") String isin, @Valid @RequestBody SaveItemDTO saveItemDTO) {
        try {
            // Versuche, das Portfolio-Element zu kaufen
            portfolioService.buyItem(id, isin, saveItemDTO);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            // Fange und verarbeite IllegalArgumentException
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Fügt eine neue Benutzerentität hinzu.
     * Versucht, eine Benutzerentität hinzuzufügen, und fängt IllegalArgumentExceptions, falls diese auftreten.
     * Bestätigt den Erfolg der Operation oder liefert eine Fehlermeldung, falls eine Ausnahme auftritt.
     *
     * @param userEntity Die hinzuzufügende Benutzerentität.
     * @return ResponseEntity, die den Erfolg der Operation bestätigt oder eine Fehlermeldung enthält.
     */
    @PostMapping("/add-user")
    public ResponseEntity<String> addUserEntity(@RequestBody UserEntity userEntity) {
        try {
            // Versuche, die Benutzerentität hinzuzufügen
            portfolioService.addUserEntity(userEntity);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            // Fange und verarbeite IllegalArgumentException
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    /**
     * Aktualisiert den Favoritenstatus eines Portfolio-Elements für einen Benutzer.
     *
     * @param username Der Benutzername des Benutzers.
     * @param itemId Die ID des Portfolio-Elements.
     * @return ResponseEntity, die den Erfolg der Operation bestätigt.
     */
    @PutMapping("/favorite/{username}")
    public ResponseEntity<?> favoritePortfolioItem(@PathVariable String username, @RequestBody Long itemId) {
        PortfolioItem item = portfolioService.getPortfolioItemById(itemId);
        portfolioService.updateFavoriteStatus(username, item);
        return ResponseEntity.ok().body("Item favorited successfully");
    }

    /**
     * Löscht ein Portfolio-Element anhand seiner ID.
     * Überprüft, ob das Element erfolgreich entfernt wurde.
     * Gibt einen Not Found Status zurück, falls das Element nicht entfernt werden konnte.
     *
     * @param id Die ID des zu löschenden Portfolio-Elements.
     * @return ResponseEntity, die den Erfolg der Operation bestätigt oder einen Not Found Status enthält, falls das Element nicht gelöscht werden konnte.
     */
    @DeleteMapping("/delete-portfolioItem/{id}")
    public ResponseEntity<String> deletePortfolioItem(@PathVariable Long id) {
        boolean isRemoved = portfolioService.deletePortfolioItem(id);

        // Prüfe, ob das Element erfolgreich gelöscht wurde
        if (!isRemoved) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }

    /**
     * Löscht eine Benutzerentität anhand des Benutzernamens.
     * Überprüft, ob der Benutzer erfolgreich entfernt wurde.
     * Gibt einen Not Found Status zurück, falls der Benutzer nicht entfernt werden konnte.
     *
     * @param username Der Benutzername des zu löschenden Benutzers.
     * @return ResponseEntity, die den Erfolg der Operation bestätigt oder einen Not Found Status enthält, falls der Benutzer nicht gelöscht werden konnte.
     */
    @DeleteMapping("/delete-user/{username}")
    public ResponseEntity<String> deleteUserEntity(@PathVariable String username) {
        boolean isRemoved = portfolioService.deleteUser(username);

        // Prüfe, ob der Benutzer erfolgreich gelöscht wurde
        if (!isRemoved) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }


    /**
     * Aktualisiert eine Benutzerentität.
     * Versucht, eine Benutzerentität zu aktualisieren, und fängt IllegalArgumentExceptions, falls diese auftreten.
     * Bestätigt den Erfolg der Operation oder liefert eine Fehlermeldung, falls eine Ausnahme auftritt.
     *
     * @param userEntity Die zu aktualisierende Benutzerentität.
     * @param username Der Benutzername des zu aktualisierenden Benutzers.
     * @return ResponseEntity, die den Erfolg der Operation bestätigt oder eine Fehlermeldung enthält.
     */
    @PutMapping("/update-user/{username}")
    public ResponseEntity<String> updateUserEntity(@RequestBody UserEntity userEntity, @PathVariable String username) {
        try {
            // Versuche, die Benutzerentität zu aktualisieren
            portfolioService.updateUserEntity(username, userEntity);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            // Fange und verarbeite IllegalArgumentException
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}




