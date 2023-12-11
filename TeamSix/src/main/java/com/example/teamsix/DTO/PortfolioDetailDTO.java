package com.example.teamsix.DTO;


import java.util.List;

public record PortfolioDetailDTO(String wkn, String name, String description, String category, Long totalQuantity, Float averagePrice, /*String plusButton,*/
                                 String plusButton, List<PortfolioDetailItemDTO> portfolioItems ) {

}

