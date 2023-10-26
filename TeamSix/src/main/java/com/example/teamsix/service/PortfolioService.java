package com.example.teamsix.service;

import com.example.teamsix.persistance.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.teamsix.domain.Portfolio;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


@Service
public class PortfolioService {
    Portfolio portfolio = new Portfolio();


    private final PortfolioRepository portfolioRepository;
    @Autowired
    public PortfolioService(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;
    }

    public Portfolio savePortfolio(Portfolio portfolio){
        return portfolioRepository.save(portfolio);
    }

    public List<Portfolio> getAllPortfolio() {
        return portfolioRepository.findAll();
    }

    public Portfolio addPortfolio(@RequestBody Portfolio newPortfolio) {
        portfolioRepository.save(portfolio);

        return newPortfolio;
    }
}

