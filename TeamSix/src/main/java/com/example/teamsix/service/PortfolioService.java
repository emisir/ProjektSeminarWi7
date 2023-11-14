package com.example.teamsix.service;

import com.example.teamsix.domain.Portfolio;
import com.example.teamsix.domain.PortfolioDetailDTO;
import com.example.teamsix.persistance.PortfolioInfoProjection;
import com.example.teamsix.persistance.PortfolioRepository;
import org.springframework.stereotype.Service;
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




        public PortfolioDetailDTO getPortfolioDetails(Long portfolioId) {
            Portfolio portfolio = portfolioRepository.findById(portfolioId)
                    .orElseThrow(() -> new NoSuchElementException("Portfolio not found"));

            PortfolioDetailDTO dto = new PortfolioDetailDTO();
            // Setzen der Portfolio-Attribute
            dto.setId(portfolio.getId());
            dto.setName(portfolio.getName());
            dto.setDescription(portfolio.getDescription());
            dto.setCategory(portfolio.getCategory());

            // Konvertieren der Käufe in PurchaseDTOs und Hinzufügen zum PortfolioDetailDTO
            List<PortfolioDetailDTO.PurchaseDTO> purchaseDTOs = portfolio.getPurchases().stream().map(purchase -> {
                PortfolioDetailDTO.PurchaseDTO purchaseDTO = new PortfolioDetailDTO.PurchaseDTO();
                purchaseDTO.setWkn(purchase.getWkn());
                purchaseDTO.setPurchaseDate(purchase.getPurchaseDate());
                purchaseDTO.setPurchasePrice(purchase.getPurchasePrice());
                purchaseDTO.setQuantity(purchase.getQuantity());
                purchaseDTO.setTotalPrice(purchase.getTotalPrice());
                return purchaseDTO;
            }).collect(Collectors.toList());

            dto.setPurchases(purchaseDTOs);

            return dto;
        }


    public List<PortfolioInfoProjection> getPortfolioInfo() {
        return portfolioRepository.findAllBy();
    }

}
    