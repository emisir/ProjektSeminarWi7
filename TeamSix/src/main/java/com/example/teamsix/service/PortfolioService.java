package com.example.teamsix.service;

import com.example.teamsix.domain.Portfolio;
import com.example.teamsix.domain.PortfolioItem;
import com.example.teamsix.persistance.PortfolioInfoProjection;
import com.example.teamsix.persistance.PortfolioRepository;
import com.example.teamsix.DTO.PortfolioSummary;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Collection;
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

    private static final Logger log = LoggerFactory.getLogger(PortfolioService.class);

    public Collection<PortfolioSummary> getPortfolioSummary(Long portfolioId) {
        List<PortfolioItem> portfolioItems = getPortfolio(portfolioId).getPurchases();

        return portfolioItems.stream()
                .collect(Collectors.groupingBy(PortfolioItem::getWkn,
                        Collectors.collectingAndThen(
                                Collectors.toList(),
                                portfolioItemList -> {
                                    log.info("Processing group for WKN: {} with {} items", portfolioItemList.get(0).getWkn(), portfolioItemList.size());

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
                )).values();
    }

}
    