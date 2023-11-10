package com.example.teamsix.service;

import com.example.teamsix.domain.Portfolio;
import com.example.teamsix.persistance.PortfolioRepository;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;

    public PortfolioService(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;

    }

    public List<Portfolio> getAllPortfolio() {

        return portfolioRepository.findAll();
    }

    public Portfolio getPortfolioById(Long id) {
        return portfolioRepository.findById(id).orElse(null);
    }

    public void addPortfolio(Portfolio portfolio) {
        portfolioRepository.save(portfolio);

    }



}
    