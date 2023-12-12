package com.example.teamsix.service;

import com.example.teamsix.DTO.PortfolioDetailDTO;
import com.example.teamsix.DTO.PortfolioDetailItemDTO;
import com.example.teamsix.DTO.SaveItemDTO;
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

    private boolean isWknExistsInPortfolio(Long portfolioId, String wkn) {
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


    public PortfolioDetailDTO getPortfolioItemsByPortfolioId(Long portfolioId, String wkn) {
        List<PortfolioItem> portfolioItems = getPortfolio(portfolioId).getPurchases().stream().filter(item -> item.getWkn().equals(wkn)).toList();
        String name = portfolioItems.get(0).getName();
        String description = portfolioItems.get(0).getDescription();
        String category = portfolioItems.get(0).getCategory();
        String plusButton = portfolioItems.get(0).getPlusButton();

        long totalQuantity = portfolioItems.stream()
                .mapToLong(PortfolioItem::getQuantity)
                .sum();
        float totalPrice = (float) portfolioItems.stream()
                .mapToDouble(portfolioItem -> portfolioItem.getQuantity() * portfolioItem.getPurchasePrice())
                .sum();
        float averagePrice = totalPrice / totalQuantity;

        List<PortfolioDetailItemDTO> portfolioDetailItemDTO = portfolioItems.stream().map(portfolioItem -> new PortfolioDetailItemDTO(
                portfolioItem.getPurchaseDate(),
                portfolioItem.getQuantity(),
                portfolioItem.getPurchasePrice(),
                portfolioItem.getPurchasePrice() * portfolioItem.getQuantity()
                )).toList();

        return new PortfolioDetailDTO(
                portfolioItems.get(0).getWkn(),
                name,
                description,
                category,
                totalQuantity,
                averagePrice,
                plusButton,
                portfolioDetailItemDTO
        );
    }
    public void addPortfolioItem(Long portfolioId, SaveItemDTO saveItemDTO) {
        Portfolio portfolio = getPortfolio(portfolioId);

        // Überprüfen, ob der WKN-Wert bereits in der Datenbank vorhanden ist
        String wkn = saveItemDTO.getWkn();
        if (isWknExistsInPortfolio(portfolioId, wkn)) {
            // Hier lösen wir eine Exception aus
            throw new IllegalArgumentException("WKN " + wkn + " bereits vorhanden.");
        }

        // Wenn der WKN-Wert nicht vorhanden ist, fahren Sie fort mit der Hinzufügung
        PortfolioItem portfolioItem = new PortfolioItem();
        portfolioItem.setWkn(wkn);
        portfolioItem.setName(saveItemDTO.getName());
        portfolioItem.setDescription(saveItemDTO.getDescription());
        portfolioItem.setCategory(saveItemDTO.getCategory());
        portfolioItem.setQuantity(saveItemDTO.getQuantity());
        portfolioItem.setPurchasePrice(saveItemDTO.getPurchasePrice());
        portfolioItem.setPurchaseDate(saveItemDTO.getPurchaseDate());
        portfolioItem.setPortfolio(portfolio);

        portfolio.getPurchases().add(portfolioItem);

        portfolioRepository.save(portfolio);
    }

    public void buyItem(Long portfolioId, SaveItemDTO saveItemDTO) {
        Portfolio portfolio = getPortfolio(portfolioId);

        // Überprüfen, ob der WKN-Wert bereits in der Datenbank vorhanden ist
        String wkn = saveItemDTO.getWkn();

        // Wenn der WKN-Wert nicht vorhanden ist, fahren Sie fort mit der Hinzufügung
        PortfolioItem portfolioItem = new PortfolioItem();
        portfolioItem.setWkn(wkn);
        portfolioItem.setName(saveItemDTO.getName());
        portfolioItem.setDescription(saveItemDTO.getDescription());
        portfolioItem.setCategory(saveItemDTO.getCategory());
        portfolioItem.setQuantity(saveItemDTO.getQuantity());
        portfolioItem.setPurchasePrice(saveItemDTO.getPurchasePrice());
        portfolioItem.setPurchaseDate(saveItemDTO.getPurchaseDate());
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
