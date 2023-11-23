package com.example.teamsix.service;

import com.example.teamsix.DTO.PortfolioDetailDTO;
import com.example.teamsix.DTO.PortfolioItemDTO;
import com.example.teamsix.domain.Portfolio;
import com.example.teamsix.domain.PortfolioItem;
import com.example.teamsix.persistance.PortfolioItemRepository;
import com.example.teamsix.persistance.PortfolioRepository;
import com.example.teamsix.DTO.PortfolioSummary;
import org.springframework.stereotype.Service;

import java.util.*;


import java.util.stream.Collectors;



@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;

    private final PortfolioItemRepository portfolioItemRepository;


    public PortfolioService(PortfolioRepository portfolioRepository, PortfolioItemRepository portfolioItemRepository) {
        this.portfolioRepository = portfolioRepository;
        this.portfolioItemRepository = portfolioItemRepository;
    }


    public void addPortfolioItem(PortfolioItem item) {
        portfolioItemRepository.save(item);
    }

    private boolean isWknExistsInPortfolio( Long portfolioId, String wkn) {
        return portfolioItemRepository.existsByWknAndPortfolioId(wkn,portfolioId);
    }

    public void addPortfolio(Portfolio portfolio) {
        portfolioRepository.save(portfolio);

    }


    public List<PortfolioSummary> getPortfolioSummary(Long portfolioId) {
        List<PortfolioItem> portfolioItems = getPortfolio(portfolioId).getPurchases();

        Map<String, PortfolioSummary> collect = portfolioItems.stream()
                .collect(Collectors.groupingBy(PortfolioItem::getWkn,
                        Collectors.collectingAndThen(
                                Collectors.toList(),
                                portfolioItemList -> {

                                    String name = portfolioItemList.get(0).getName();
                                    long totalQuantity = portfolioItemList.stream()
                                            .mapToLong(PortfolioItem::getQuantity)
                                            .sum();
                                    float totalPrice = (float) portfolioItemList.stream()
                                            .mapToDouble(portfolioItem -> portfolioItem.getPurchasePrice() * portfolioItem.getQuantity())
                                            .sum();
                                    float averagePrice = totalPrice / totalQuantity;

                                    return new PortfolioSummary(
                                            portfolioItemList.get(0).getWkn(),
                                            name,
                                            totalQuantity,
                                            averagePrice,
                                            totalPrice
                                    );
                                }
                        )
                ));

        return new ArrayList<>(collect.values());
    }


    public List<PortfolioDetailDTO> getPortfolioItemsByPortfolioId(Long portfolioId, String wkn) {
        List<PortfolioItem> portfolioItems = getPortfolio(portfolioId).getPurchases();

        Map<String, PortfolioDetailDTO> collect = portfolioItems.stream()
                .filter(item -> item.getWkn().equals(wkn))
                .collect(Collectors.groupingBy(
                        PortfolioItem::getWkn,
                        Collectors.collectingAndThen(
                                Collectors.toList(),
                                portfolioItemList -> {
                                    String name = portfolioItemList.get(0).getName();
                                    String description = portfolioItemList.get(0).getDescription();
                                    String category = portfolioItemList.get(0).getCategory();
                                    Date purchaseDate = portfolioItemList.get(0).getPurchaseDate();
                                    Long quantity = portfolioItemList.get(0).getQuantity();
                                    Float purchasePrice = portfolioItemList.get(0).getPurchasePrice();

                                    long totalQuantity = portfolioItemList.stream()
                                            .mapToLong(PortfolioItem::getQuantity)
                                            .sum();
                                    float totalPrice = (float) portfolioItemList.stream()
                                            .mapToDouble(portfolioItem -> portfolioItem.getQuantity() * portfolioItem.getPurchasePrice())
                                            .sum();
                                    float averagePrice = totalPrice / totalQuantity;

                                    return new PortfolioDetailDTO(
                                            portfolioItemList.get(0).getWkn(),
                                            name,
                                            description,
                                            category,
                                            purchaseDate,
                                            quantity,
                                            purchasePrice,
                                            totalQuantity,
                                            averagePrice,
                                            totalPrice
                                    );
                                }
                        )
                ));
        return new ArrayList<>(collect.values());
    }
    public void addPortfolioItem(Long portfolioId, PortfolioItemDTO portfolioItemDTO) {
        Portfolio portfolio = getPortfolio(portfolioId);

        // Überprüfen, ob der WKN-Wert bereits in der Datenbank vorhanden ist
        String wkn = portfolioItemDTO.getWkn();
        if (isWknExistsInPortfolio(portfolioId, wkn)) {
            // Hier lösen wir eine Exception aus
            throw new IllegalArgumentException("WKN " + wkn + " bereits vorhanden.");
        }

        // Wenn der WKN-Wert nicht vorhanden ist, fahren Sie fort mit der Hinzufügung
        PortfolioItem portfolioItem = new PortfolioItem();
        portfolioItem.setWkn(wkn);
        portfolioItem.setName(portfolioItemDTO.getName());
        portfolioItem.setDescription(portfolioItemDTO.getDescription());
        portfolioItem.setCategory(portfolioItemDTO.getCategory());
        portfolioItem.setQuantity(portfolioItemDTO.getQuantity());
        portfolioItem.setPurchasePrice(portfolioItemDTO.getPurchasePrice());
        portfolioItem.setPurchaseDate(portfolioItemDTO.getPurchaseDate());
        portfolioItem.setPortfolio(portfolio);

        portfolio.getPurchases().add(portfolioItem);

        portfolioRepository.save(portfolio);
    }


    private Portfolio getPortfolio(Long portfolioId) {
        return portfolioRepository.findById(portfolioId)
                .orElseThrow(() -> new NoSuchElementException("Portfolio not found"));

    }


    public List<PortfolioItem> getPortfolioItems() {
        return portfolioItemRepository.findAll();
    }
}
