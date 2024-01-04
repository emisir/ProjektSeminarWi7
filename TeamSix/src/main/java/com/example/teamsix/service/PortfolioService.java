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

    public PortfolioItem getPortfolioItemById(Long itemId) {
        return portfolioItemRepository.findById(itemId).orElseThrow(() -> new NoSuchElementException("Portfolio Item not found with ID: " + itemId));
    }

    public List<PortfolioItem> getPortfolioItems() {
        return portfolioItemRepository.findAll();
    }

    private boolean isIsinExistsInPortfolio(Long portfolioId, String isin) {
        return portfolioItemRepository.existsByIsinAndPortfolioId(isin, portfolioId);
    }

    public List<PortfolioSummary> getPortfolioSummary(Long portfolioId) {
        List<PortfolioItem> portfolioItems = getPortfolio(portfolioId).getPurchases();
        return getPortfolioSummaries(portfolioItems);
    }

    public List<PortfolioSummary> getFavPortfolioItemsByUser(String username) {
        UserEntity user = userRepository.findByUsername(username);
        List<PortfolioItem> favoritedItems = portfolioItemRepository.findByFavoritedByUsersContains(user);
        return getPortfolioSummaries(favoritedItems);

    }


    public PortfolioDetailDTO getPortfolioItemsByPortfolioId(Long portfolioId, String isin) {
        Optional<PortfolioItem> portfolioItemOptional = getPortfolio(portfolioId).getPurchases().stream().filter(item -> item.getIsin().equals(isin)).findFirst();
        if (portfolioItemOptional.isEmpty()) {
            return null;
        }
        PortfolioItem portfolioItem = portfolioItemOptional.get();

        String name = portfolioItem.getName();
        String description = portfolioItem.getDescription();
        String type = portfolioItem.getType();
        Float currentPrice = stockItemClient.getStockItem(apiKey, isin).price();


        long totalQuantity = portfolioItem.getStockOrder().stream().mapToLong(StockOrder::getQuantity).sum();
        float totalPrice = (float) portfolioItem.getStockOrder().stream().mapToDouble(stockOrder -> stockOrder.getQuantity() * stockOrder.getPurchasePrice()).sum();
        float averagePrice = totalPrice / totalQuantity;
        float profitLossPerStock = currentPrice - averagePrice;
        float profitLossSum = (totalQuantity * currentPrice) - totalPrice;


        List<PortfolioDetailItemDTO> portfolioDetailItemDTO = portfolioItem.getStockOrder().stream().map(stockOrder ->
                new PortfolioDetailItemDTO(stockOrder.getPurchaseDate(), stockOrder.getQuantity(), stockOrder.getPurchasePrice(),
                        stockOrder.getPurchasePrice() * stockOrder.getQuantity())).toList();

        return new PortfolioDetailDTO(isin, name, description, type, totalQuantity, averagePrice, profitLossPerStock, profitLossSum, currentPrice, portfolioDetailItemDTO);
    }

    public UserEntity getCurrentUser(String username) {
        userRepository.findByUsername(username);
        return userRepository.findByUsername(username);
    }

    public List<UserEntity> getUserEntities() {
        return userRepository.findAll();
    }


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


    public void addUserEntity(UserEntity userEntity) {

        userEntity.setName(userEntity.getName());
        userEntity.setUsername(userEntity.getUsername());
        userEntity.setPassword(userEntity.getPassword());
        userEntity.setRole(userEntity.getRole());

        userRepository.save(userEntity);
    }

    public boolean deleteUser(String username) {
        if (userRepository.existsById(username)) {
            userRepository.deleteById(username);
            return true;
        } else {
            return false;
        }
    }

    public boolean deletePortfolioItem(Long portfolioItemId) {
        // Find the PortfolioItem by ID
        Optional<PortfolioItem> portfolioItemOptional = portfolioItemRepository.findById(portfolioItemId);

        if (portfolioItemOptional.isPresent()) {
            PortfolioItem portfolioItem = portfolioItemOptional.get();
            Portfolio portfolio = portfolioItem.getPortfolio();

            // Remove the PortfolioItem from the Portfolio's purchases list
            portfolio.getPurchases().remove(portfolioItem);

            // Save the updated Portfolio
            portfolioRepository.save(portfolio);

            // Delete the PortfolioItem
            portfolioItemRepository.delete(portfolioItem);
            return true;
        } else {
            return false;
        }
    }
    public void updateUserEntity(String username, UserEntity userEntityDetails) {
        UserEntity userEntity = userRepository.findByUsername(username);

        userEntity.setName(userEntityDetails.getName());
        userEntity.setPassword(userEntityDetails.getPassword());
        userEntity.setRole(userEntityDetails.getRole());

        userRepository.save(userEntity);
    }

    public void updateFavoriteStatus(String username, PortfolioItem item) {
        UserEntity user = userRepository.findById(username).orElseThrow();
        List<PortfolioItem> favorites = user.getFavoritedItems();
        item.setFavorite(true);
        if (!favorites.contains(item)) {
            favorites.add(item);
            user.setFavoritedItems(favorites);
            userRepository.save(user);
        } else {
            throw new IllegalArgumentException("Item is already in the favorites list.");
        }
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
}
