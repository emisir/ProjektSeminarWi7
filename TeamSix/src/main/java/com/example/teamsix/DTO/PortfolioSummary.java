package com.example.teamsix.DTO;

public class PortfolioSummary {
    private String wkn;
    private Long totalQuantity;

    private Float averagePrice;

    private Float totalPrice;

    public PortfolioSummary(String wkn, Long totalQuantity, Float averagePrice, Float totalPrice) {
        this.wkn = wkn;
        this.totalQuantity = totalQuantity;
        this.averagePrice = averagePrice;
        this.totalPrice = totalPrice;
    }

    public String getWkn() {
        return wkn;
    }

    public Long getTotalQuantity() {
        return totalQuantity;
    }

    public Float getAveragePrice() {
        return averagePrice;
    }

    public Float getTotalPrice() {
        return totalPrice;
    }
}
