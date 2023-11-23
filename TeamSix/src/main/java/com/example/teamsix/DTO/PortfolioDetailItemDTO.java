package com.example.teamsix.DTO;

import java.util.Date;

public record PortfolioDetailItemDTO(Date purchaseDate, Long quantity, Float purchasePrice, Float totalPrice) {

}
