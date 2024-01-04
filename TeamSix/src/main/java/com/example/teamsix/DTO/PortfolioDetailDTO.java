package com.example.teamsix.DTO;


import java.util.List;

public record PortfolioDetailDTO(String isin, String name, String description, String type,
                                 Long totalQuantity, Float averagePrice, Float profitLossPerStock, Float profitLossSum, Float currentPrice,
                                 List<PortfolioDetailItemDTO> portfolioItems ) {

}

