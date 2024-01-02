package com.example.teamsix.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "stock_order")
public class StockOrder {

    @Id
    @GeneratedValue
    private Long id;

    private Long quantity;

    private Date purchaseDate;

    private Float purchasePrice;

    @ManyToOne
    @JoinColumn(name = "portfolio_item_id")
    @JsonIgnore
    private PortfolioItem portfolioItem;


    public StockOrder() {
    }

    public StockOrder(Long quantity, Date purchaseDate, Float purchasePrice, PortfolioItem portfolioItem) {
        this.quantity = quantity;
        this.purchaseDate = purchaseDate;
        this.purchasePrice = purchasePrice;
        this.portfolioItem = portfolioItem;
    }

    public Long getId() {
        return id;
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

    public PortfolioItem getPortfolioItem() {
        return portfolioItem;
    }

    public void setPortfolioItem(PortfolioItem portfolioItem) {
        this.portfolioItem = portfolioItem;
    }
}
