package com.example.teamsix.service;

import com.example.teamsix.DTO.*;
import com.example.teamsix.client.StockItemClient;
import com.example.teamsix.domain.Portfolio;
import com.example.teamsix.domain.PortfolioItem;
import com.example.teamsix.domain.UserEntity;
import com.example.teamsix.domain.StockOrder;

import com.example.teamsix.persistance.PortfolioItemRepository;
import com.example.teamsix.persistance.PortfolioRepository;
import com.example.teamsix.persistance.UserRepository;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;

    private final PortfolioItemRepository portfolioItemRepository;

    private final UserRepository userRepository;

    private final StockItemClient stockItemClient;


    private final String apiKey = "Team#6-ApiKey-o9HsZzVXSA";


    public PortfolioService(PortfolioRepository portfolioRepository, PortfolioItemRepository portfolioItemRepository, UserRepository userRepository, StockItemClient stockItemClient) {
        this.portfolioRepository = portfolioRepository;
        this.portfolioItemRepository = portfolioItemRepository;
        this.userRepository = userRepository;
        this.stockItemClient = stockItemClient;
    }

    /**
     * Ruft ein Portfolio-Element anhand seiner ID ab.
     *
     * @param itemId Die ID des abzurufenden Portfolio-Elements.
     * @return Das PortfolioItem-Objekt, das mit der gegebenen ID verknüpft ist.
     * @throws NoSuchElementException, falls kein Portfolio-Element mit der angegebenen ID gefunden wird.
     */
    public PortfolioItem getPortfolioItemById(Long itemId) {
        return portfolioItemRepository.findById(itemId).orElseThrow(() -> new NoSuchElementException("Portfolio Item not found with ID: " + itemId));
    }

    /**
     * Ruft alle Portfolio-Elemente ab.
     *
     * @return Eine Liste aller PortfolioItem-Objekte.
     */
    public List<PortfolioItem> getPortfolioItems() {
        return portfolioItemRepository.findAll();
    }


    /**
     * Ermittelt eine Zusammenfassung des Portfolios für eine gegebene Portfolio-ID.
     *
     * @param portfolioId Die ID des Portfolios.
     * @return Eine Liste von PortfolioSummary-Objekten für das angegebene Portfolio.
     */
    public List<PortfolioSummary> getPortfolioSummary(Long portfolioId) {
        List<PortfolioItem> portfolioItems = getPortfolio(portfolioId).getPurchases();
        return getPortfolioSummaries(portfolioItems);
    }

    /**
     * Ruft bevorzugte Portfolio-Elemente für einen bestimmten Benutzer ab.
     *
     * @param username Der Benutzername des Benutzers.
     * @return Eine Liste von PortfolioSummary-Objekten, die vom Benutzer favorisiert werden.
     */
    public List<PortfolioSummary> getFavPortfolioItemsByUser(String username) {
        UserEntity user = userRepository.findByUsername(username);
        List<PortfolioItem> favoritedItems = portfolioItemRepository.findByFavoritedByUsersContains(user);
        return getPortfolioSummaries(favoritedItems);

    }

    /**
     * Ruft Details eines Portfolio-Elements anhand von Portfolio-ID und ISIN ab.
     *
     * @param portfolioId Die ID des Portfolios.
     * @param isin Die ISIN des Portfolio-Elements.
     * @return PortfolioDetailDTO mit Details des Elements, oder null, falls nicht gefunden.
     */
    public PortfolioDetailDTO getPortfolioItemsByPortfolioId(Long portfolioId, String isin) {
        // Suche das Portfolio-Element basierend auf ID und ISIN
        Optional<PortfolioItem> portfolioItemOptional = getPortfolio(portfolioId).getPurchases().stream()
                .filter(item -> item.getIsin().equals(isin))
                .findFirst();

        // Frühzeitige Rückgabe, falls das Element nicht gefunden wird
        if (portfolioItemOptional.isEmpty()) {
            return null;
        }

        PortfolioItem portfolioItem = portfolioItemOptional.get();

        // Extrahiere und berechne Details des Portfolio-Elements
        String name = portfolioItem.getName();
        String description = portfolioItem.getDescription();
        String type = portfolioItem.getType();
        Float currentPrice = stockItemClient.getStockItem(apiKey, isin).price();

        long totalQuantity = portfolioItem.getStockOrder().stream().mapToLong(StockOrder::getQuantity).sum();
        float totalPrice = (float) portfolioItem.getStockOrder().stream()
                .mapToDouble(stockOrder -> stockOrder.getQuantity() * stockOrder.getPurchasePrice()).sum();
        float averagePrice = totalPrice / totalQuantity;
        float profitLossPerStock = currentPrice - averagePrice;
        float profitLossSum = (totalQuantity * currentPrice) - totalPrice;

        List<PortfolioDetailItemDTO> portfolioDetailItemDTO = portfolioItem.getStockOrder().stream()
                .map(stockOrder -> new PortfolioDetailItemDTO(stockOrder.getPurchaseDate(), stockOrder.getQuantity(),
                        stockOrder.getPurchasePrice(), stockOrder.getPurchasePrice() * stockOrder.getQuantity()))
                .toList();

        // Erstelle und gib das PortfolioDetailDTO zurück
        return new PortfolioDetailDTO(isin, name, description, type, totalQuantity, averagePrice,
                profitLossPerStock, profitLossSum, currentPrice, portfolioDetailItemDTO);
    }

    /**
     * Ruft den aktuellen Benutzer anhand des Benutzernamens ab.
     *
     * @param username Der Benutzername des Benutzers.
     * @return Das UserEntity-Objekt, das mit dem gegebenen Benutzernamen verknüpft ist.
     */
    public UserEntity getCurrentUser(String username) {
        userRepository.findByUsername(username);
        return userRepository.findByUsername(username);
    }

    /**
     * Ruft alle Benutzer-Entitäten ab.
     *
     * @return Eine Liste aller UserEntity-Objekte.
     */
    public List<UserEntity> getUserEntities() {
        return userRepository.findAll();
    }

    /**
     * Fügt einem Portfolio ein neues Portfolio-Element hinzu.
     *
     * @param portfolioId Die ID des Portfolios, zu dem das Element hinzugefügt werden soll.
     * @param saveItemDTO Das Datenübertragungsobjekt, das die Informationen über das zu speichernde Element enthält.
     */
    public void addPortfolioItem(Long portfolioId, SaveItemDTO saveItemDTO) {
        Portfolio portfolio = getPortfolio(portfolioId);

        String isin = saveItemDTO.getIsin();
        if (isIsinExistsInPortfolio(portfolioId, isin)) {
            throw new IllegalArgumentException("ISIN " + isin + " bereits vorhanden.");
        }

        StockItemDTO stockItem = stockItemClient.getStockItem(apiKey, isin);
        PortfolioItem portfolioItem = mapSaveItemToPortfolioItem(saveItemDTO, stockItem, portfolio);
        portfolio.getPurchases().add(portfolioItem);
        portfolioRepository.save(portfolio);
    }

    /**
     * Kauft ein Portfolio-Element für ein gegebenes Portfolio.
     * Wenn das angegebene Portfolio-Element nicht existiert, wird die Methode beendet, ohne dass eine Aktion ausgeführt wird.
     *
     * @param portfolioId Die ID des Portfolios, in dem das Element gekauft wird.
     * @param isin Die ISIN des zu kaufenden Elements.
     * @param saveItemDTO Das DTO mit den Details des zu kaufenden Elements.
     */
    public void buyItem(Long portfolioId, String isin, SaveItemDTO saveItemDTO) {
        Optional<PortfolioItem> portfolioItemOptional = getPortfolio(portfolioId).getPurchases().stream().filter(item -> item.getIsin().equals(isin)).findFirst();
        if (portfolioItemOptional.isEmpty()) {
            return;
        }
        PortfolioItem portfolioItem = portfolioItemOptional.get();
        List<StockOrder> stockOrders = portfolioItem.getStockOrder();

        StockItemDTO stockItem = stockItemClient.getStockItem(apiKey, saveItemDTO.getIsin());
        StockOrder stockOrder = new StockOrder(saveItemDTO.getQuantity(), saveItemDTO.getPurchaseDate(), stockItem.price(), portfolioItem);
        stockOrders.add(stockOrder);
        portfolioItem.setStockOrder(stockOrders);

        portfolioItemRepository.save(portfolioItem);
    }

    /**
     * Fügt eine neue UserEntity hinzu.
     * Speichert die übergebene UserEntity in der Benutzerdatenbank.
     *
     * @param userEntity Die UserEntity, die hinzugefügt werden soll.
     */
    public void addUserEntity(UserEntity userEntity) {

        userEntity.setName(userEntity.getName());
        userEntity.setUsername(userEntity.getUsername());
        userEntity.setPassword(userEntity.getPassword());
        userEntity.setRole(userEntity.getRole());

        userRepository.save(userEntity);
    }

    /**
     * Löscht einen Benutzer anhand des Benutzernamens.
     * Gibt 'true' zurück, wenn der Benutzer erfolgreich gelöscht wurde, andernfalls 'false'.
     *
     * @param username Der Benutzername des zu löschenden Benutzers.
     * @return 'true', wenn der Benutzer gelöscht wurde, sonst 'false'.
     */
    public boolean deleteUser(String username) {
        if (userRepository.existsById(username)) {
            userRepository.deleteById(username);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Löscht ein Portfolio-Element anhand seiner ID.
     * Die Operation ist transaktional und aktualisiert auch die Favoritenliste der Benutzer.
     *
     * @param portfolioItemId Die ID des zu löschenden Portfolio-Elements.
     * @return 'true', wenn das Element erfolgreich gelöscht wurde, sonst 'false'.
     */
    @Transactional
    public boolean deletePortfolioItem(Long portfolioItemId) {
        // Finde das Portfolio-Element anhand der ID
        Optional<PortfolioItem> portfolioItemOptional = portfolioItemRepository.findById(portfolioItemId);

        // Prüfe, ob das Element vorhanden ist
        if (portfolioItemOptional.isPresent()) {
            PortfolioItem portfolioItem = portfolioItemOptional.get();

            // Aktualisiere die Favoritenliste aller Benutzer
            List<UserEntity> users = userRepository.findAll();
            for (UserEntity user : users) {
                user.getFavoritedItems().remove(portfolioItem);
                userRepository.save(user);
            }

            // Entferne das Portfolio-Element aus dem Portfolio und speichere die Änderungen
            Portfolio portfolio = portfolioItem.getPortfolio();
            portfolio.getPurchases().remove(portfolioItem);
            portfolioRepository.save(portfolio);

            // Lösche das Portfolio-Element
            portfolioItemRepository.delete(portfolioItem);
            return true;
        } else {
            // Rückgabe 'false', wenn das Element nicht gefunden wurde
            return false;
        }
    }


    /**
     * Aktualisiert die Daten einer UserEntity anhand des Benutzernamens.
     * Nimmt eine UserEntity mit den Details, die aktualisiert werden sollen.
     *
     * @param username Der Benutzername der zu aktualisierenden UserEntity.
     * @param userEntityDetails Die Details der UserEntity, die aktualisiert werden sollen.
     */
    public void updateUserEntity(String username, UserEntity userEntityDetails) {
        UserEntity userEntity = userRepository.findByUsername(username);

        userEntity.setName(userEntityDetails.getName());
        userEntity.setPassword(userEntityDetails.getPassword());
        userEntity.setRole(userEntityDetails.getRole());

        userRepository.save(userEntity);
    }

    /**
     * Aktualisiert den Favoritenstatus eines Portfolio-Elements für einen Benutzer.
     * Entfernt das Element aus den Favoriten, falls es bereits favorisiert wurde,
     * oder fügt es hinzu, falls es noch nicht favorisiert ist.
     *
     * @param username Der Benutzername des Benutzers.
     * @param item Das Portfolio-Element, dessen Favoritenstatus aktualisiert wird.
     */
    public void updateFavoriteStatus(String username, PortfolioItem item) {
        // Finde den Benutzer basierend auf dem Benutzernamen
        UserEntity user = userRepository.findById(username).orElseThrow();
        List<PortfolioItem> favorites = user.getFavoritedItems();

        // Suche nach dem Portfolio-Element in den Favoriten
        PortfolioItem foundItem = null;
        for (PortfolioItem favoriteItem : favorites) {
            if (favoriteItem.getId().equals(item.getId())) {
                foundItem = favoriteItem;
                break;
            }
        }

        // Aktualisiere die Favoritenliste: Entferne, falls vorhanden, füge hinzu, falls nicht
        if (foundItem != null) {
            favorites.remove(foundItem);
        } else {
            favorites.add(item);
        }
        user.setFavoritedItems(favorites);

        // Speichere die aktualisierte Benutzerdaten
        userRepository.save(user);
    }


//private Methods

    private Portfolio getPortfolio(Long portfolioId) {
        return portfolioRepository.findById(portfolioId).orElseThrow(() -> new NoSuchElementException("Portfolio not found"));

    }

    private static PortfolioItem mapSaveItemToPortfolioItem(SaveItemDTO saveItemDTO, StockItemDTO stockItem, Portfolio portfolio) {
        PortfolioItem portfolioItem = new PortfolioItem();
        StockOrder stockOrder = new StockOrder(saveItemDTO.getQuantity(), saveItemDTO.getPurchaseDate(), stockItem.price(), portfolioItem);

        portfolioItem.setStockOrder(List.of(stockOrder));

        portfolioItem.setIsin(stockItem.isin());
        portfolioItem.setPortfolio(portfolio);
        portfolioItem.setDescription(stockItem.description());
        portfolioItem.setType(stockItem.type());
        portfolioItem.setCurrentPrice(stockItem.price());
        portfolioItem.setName(stockItem.name());
        return portfolioItem;
    }


    private List<PortfolioSummary> getPortfolioSummaries(List<PortfolioItem> portfolioItems) {
        return portfolioItems.stream().map(portfolioItem -> {
            String isin = portfolioItem.getIsin();
            String name = portfolioItem.getName();
            long totalQuantity = portfolioItem.getStockOrder().stream().mapToLong(StockOrder::getQuantity).sum();
            float totalPrice = (float) portfolioItem.getStockOrder().stream().mapToDouble(it -> it.getPurchasePrice() * it.getQuantity()).sum();
            float averagePrice = totalPrice / totalQuantity;
            float profitLossSum = (totalQuantity * stockItemClient.getStockItem(apiKey, isin).price()) - totalPrice;

            return new PortfolioSummary(portfolioItem.getId(), portfolioItem.getIsin(), name, totalQuantity, averagePrice, totalPrice, profitLossSum);
        }).toList();
    }

    private boolean isIsinExistsInPortfolio(Long portfolioId, String isin) {
        return portfolioItemRepository.existsByIsinAndPortfolioId(isin, portfolioId);
    }

}
