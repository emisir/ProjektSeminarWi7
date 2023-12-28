package com.example.teamsix.DTO;

public record PortfolioSummary(String isin, String name, Long totalQuantity,Float averagePrice,Float totalPrice, Float profitLossSum) {
}
