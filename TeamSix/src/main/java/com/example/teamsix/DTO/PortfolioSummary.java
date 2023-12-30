package com.example.teamsix.DTO;

public record PortfolioSummary(Long id, String isin, String name, Long totalQuantity,Float averagePrice,Float totalPrice, Float profitLossSum ) {}
