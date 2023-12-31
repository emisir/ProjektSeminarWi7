package com.example.teamsix.domain;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class StockOrder {

    @Id
    @GeneratedValue
    private Long id;

    private Long quantity;

    private Date purchaseDate;

    private Float purchasePrice;

    @ManyToOne
    @JoinColumn(name = "portfolio_item_id")
    private PortfolioItem portfolioItem;


    public StockOrder() {
    }

    public StockOrder(Long id, Long quantity, Date purchaseDate, Float purchasePrice) {
        this.id = id;
        this.quantity = quantity;
        this.purchaseDate = purchaseDate;
        this.purchasePrice = purchasePrice;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Date getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(Date purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public Float getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(Float purchasePrice) {
        this.purchasePrice = purchasePrice;
    }
}
