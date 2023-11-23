package com.example.teamsix.DTO;

import java.util.Date;

public record PortfolioDetailDTO(String wkn, String name, String description, String category, Date purchaseDate, Long quantity, Float purchasePrice, Long totalQuantity, Float averagePrice, Float totalPrice) {
}
