package com.example.teamsix.service;

import com.example.teamsix.domain.Portfolio;
import com.example.teamsix.domain.PortfolioItem;
import com.example.teamsix.persistance.PortfolioInfoProjection;
import com.example.teamsix.persistance.PortfolioRepository;
import com.example.teamsix.DTO.PortfolioSummary;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.NoSuchElementException;


import java.util.List;
import java.util.stream.Collectors;



@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;

    public PortfolioService(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;
    }


    public Portfolio getPortfolioById(Long id) {
        return portfolioRepository.findById(id).orElse(null);
    }

    public void addPortfolio(Portfolio portfolio) {
        portfolioRepository.save(portfolio);

    }


    public Portfolio getPortfolio(Long portfolioId) {
        return portfolioRepository.findById(portfolioId)
                .orElseThrow(() -> new NoSuchElementException("Portfolio not found"));

    }


    public List<PortfolioInfoProjection> getPortfolioInfo() {
        return portfolioRepository.findAllBy();
    }


    public PortfolioSummary getPortfolioSummary(Long portfolioId, String wkn) {
        List<PortfolioItem> portfolioItems = getPortfolio(portfolioId).getPurchases();

        Map<String, PortfolioSummary> collect = portfolioItems.stream()
                .collect(Collectors.groupingBy(PortfolioItem::getWkn,
                        Collectors.collectingAndThen(
                                Collectors.toList(),
                                portfolioItemList -> {

                                    long totalQuantity = portfolioItemList.stream()
                                            .mapToLong(PortfolioItem::getQuantity)
                                            .sum();
                                    float totalPrice = (float) portfolioItemList.stream()
                                            .mapToDouble(portfolioItem -> portfolioItem.getPurchasePrice() * portfolioItem.getQuantity())
                                            .sum();
                                    float averagePrice = totalPrice / totalQuantity;

                                    return new PortfolioSummary(
                                            portfolioItemList.get(0).getWkn(),
                                            totalQuantity,
                                            averagePrice,
                                            totalPrice
                                    );
                                }
                        )
                ));

        return collect.get(wkn);
    }

}
