package com.example.teamsix.service;

import com.example.teamsix.domain.Portfolio;
import com.example.teamsix.persistance.PortfolioRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;


@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;

    public PortfolioService(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;

    }

    public Portfolio savePortfolio(Portfolio portfolio) {

        return portfolioRepository.save(portfolio);
    }

    public List<Portfolio> getAllPortfolio() {

        return portfolioRepository.findAll();
    }

    public Portfolio getPortfoliobyId(Long id) {
       return portfolioRepository.findById(id).orElse(null);


    }

    public void addPortfolio(Portfolio portfolio) {
        portfolioRepository.save(portfolio);

    }

}
