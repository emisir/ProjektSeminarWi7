package com.example.teamsix.service;

import com.example.teamsix.DTO.*;
import com.example.teamsix.client.StockItemClient;
import com.example.teamsix.domain.Portfolio;
import com.example.teamsix.domain.PortfolioItem;
import com.example.teamsix.domain.UserEntity;
import com.example.teamsix.persistance.PortfolioItemRepository;
import com.example.teamsix.persistance.PortfolioRepository;
import com.example.teamsix.persistance.UserRepository;

import org.springframework.stereotype.Service;

import java.util.*;


import java.util.stream.Collectors;



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
        return portfolioItemRepository.findById(itemId)
                .orElseThrow(() -> new NoSuchElementException("Portfolio Item not found with ID: " + itemId));
    }


    public void addPortfolioItem(PortfolioItem item) {
        portfolioItemRepository.save(item);
    }

    private boolean isIsinExistsInPortfolio(Long portfolioId, String isin) {
        return portfolioItemRepository.existsByIsinAndPortfolioId(isin,portfolioId);
    }

    public void addPortfolio(Portfolio portfolio) {
        portfolioRepository.save(portfolio);

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
        List<PortfolioItem> portfolioItems = getPortfolio(portfolioId).getPurchases().stream().filter(item -> item.getIsin().equals(isin)).toList();
        String name = portfolioItems.get(0).getName();
        String description = portfolioItems.get(0).getDescription();
        String type = portfolioItems.get(0).getType();
        Float currentPrice = stockItemClient.getStockItem(apiKey,isin).price();
        String plusButton = portfolioItems.get(0).getPlusButton();

        long totalQuantity = portfolioItems.stream()
                .mapToLong(PortfolioItem::getQuantity)
                .sum();
        float totalPrice = (float) portfolioItems.stream()
                .mapToDouble(portfolioItem -> portfolioItem.getQuantity() * portfolioItem.getPurchasePrice())
                .sum();
        float averagePrice = totalPrice / totalQuantity;
        float profitLossPerStock =  currentPrice - averagePrice;
        float profitLossSum =    (totalQuantity * currentPrice)- totalPrice;


        List<PortfolioDetailItemDTO> portfolioDetailItemDTO = portfolioItems.stream().map(portfolioItem -> new PortfolioDetailItemDTO(
                portfolioItem.getPurchaseDate(),
                portfolioItem.getQuantity(),
                portfolioItem.getPurchasePrice(),
                portfolioItem.getPurchasePrice() * portfolioItem.getQuantity()
                )).toList();

        return new PortfolioDetailDTO(
                isin,
                name,
                description,
                type,
                totalQuantity,
                averagePrice,
                plusButton,
                profitLossPerStock,
                profitLossSum,
                currentPrice,
                portfolioDetailItemDTO
        );
    }

    public UserEntity getCurrentUser(String username) {
        userRepository.findByUsername(username);
        return userRepository.findByUsername(username);
    }

    public StockItemDTO getStockItem(String isin){
        return stockItemClient.getStockItem(apiKey,isin);
    }

    public List<PortfolioItem> getPortfolioItems() {
        return portfolioItemRepository.findAll();
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
        PortfolioItem portfolioItem = getPortfolioItem(saveItemDTO, stockItem, portfolio);
        portfolio.getPurchases().add(portfolioItem);
        portfolioRepository.save(portfolio);
    }



    public void buyItem(Long portfolioId, SaveItemDTO saveItemDTO) {
        Portfolio portfolio = getPortfolio(portfolioId);

        String isin = saveItemDTO.getIsin();

        StockItemDTO stockItem = stockItemClient.getStockItem(apiKey, isin);
        PortfolioItem portfolioItem = getPortfolioItem(saveItemDTO, stockItem, portfolio);
        portfolioItem.setQuantity(saveItemDTO.getQuantity());
        portfolioItem.setPurchaseDate(saveItemDTO.getPurchaseDate());
        portfolioItem.setPortfolio(portfolio);

        portfolio.getPurchases().add(portfolioItem);

        portfolioRepository.save(portfolio);
    }



    public void addUserEntity(UserEntity userEntity) {

        userEntity.setName(userEntity.getName());
        userEntity.setUsername(userEntity.getUsername());
        userEntity.setPassword(userEntity.getPassword());
        userEntity.setRole(userEntity.getRole());

        userRepository.save(userEntity);
    }

    public boolean deleteUser(String username){
        if (userRepository.existsById(username)) {
            userRepository.deleteById(username);
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
            favorites.add(item);
            user.setFavoritedItems(favorites);
            userRepository.save(user);
        }


//private Methods

        private Portfolio getPortfolio(Long portfolioId) {
        return portfolioRepository.findById(portfolioId)
                .orElseThrow(() -> new NoSuchElementException("Portfolio not found"));

    }

    private static PortfolioItem getPortfolioItem(SaveItemDTO saveItemDTO, StockItemDTO stockItem, Portfolio portfolio) {
        PortfolioItem portfolioItem = new PortfolioItem();
        portfolioItem.setIsin(stockItem.isin());
        portfolioItem.setQuantity(saveItemDTO.getQuantity());
        portfolioItem.setPurchaseDate(saveItemDTO.getPurchaseDate());
        portfolioItem.setPortfolio(portfolio);
        portfolioItem.setDescription(stockItem.description());
        portfolioItem.setPurchasePrice(stockItem.price());
        portfolioItem.setType(stockItem.type());
        portfolioItem.setCurrentPrice(stockItem.price());
        portfolioItem.setName(stockItem.name());
        return portfolioItem;
    }


    private ArrayList<PortfolioSummary> getPortfolioSummaries(List<PortfolioItem> portfolioItems) {
        Map<String, PortfolioSummary> collect = portfolioItems.stream()
                .collect(Collectors.groupingBy(PortfolioItem::getIsin,
                        Collectors.collectingAndThen(
                                Collectors.toList(),
                                portfolioItemList -> {
                                    String isin = portfolioItemList.get(0).getIsin();
                                    String name = portfolioItemList.get(0).getName();
                                    long totalQuantity = portfolioItemList.stream()
                                            .mapToLong(PortfolioItem::getQuantity)
                                            .sum();
                                    float totalPrice = (float) portfolioItemList.stream()
                                            .mapToDouble(portfolioItem -> portfolioItem.getPurchasePrice() * portfolioItem.getQuantity())
                                            .sum();
                                    float averagePrice = totalPrice / totalQuantity;
                                    float profitLossSum =    (totalQuantity * stockItemClient.getStockItem(apiKey,isin).price())- totalPrice;

                                    return new PortfolioSummary(
                                            portfolioItemList.get(0).getId(),
                                            portfolioItemList.get(0).getIsin(),
                                            name,
                                            totalQuantity,
                                            averagePrice,
                                            totalPrice,
                                            profitLossSum
                                    );
                                }
                        )
                ));

        return new ArrayList<>(collect.values());
    }
}
