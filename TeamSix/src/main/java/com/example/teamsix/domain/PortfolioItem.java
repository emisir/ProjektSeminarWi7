package com.example.teamsix.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "portfolioitemtable")
public class PortfolioItem {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    private String wkn;

    private Float purchasePrice;
    private Long quantity;
    private Date purchaseDate;

    private String name;
    @Column(length = 255)
    private String description;

    private String category;

    private String plusButton;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "portfolio_id")
    @JsonBackReference
    private Portfolio portfolio;

    public PortfolioItem() {
    }

    public PortfolioItem(Long id) {
        this.id = id;
    }

    public PortfolioItem(Long id, String wkn, Float purchasePrice, Long quantity, Date purchaseDate,
                         String name, String description, String category, String plusButton, Portfolio portfolio) {
        this.id = id;
        this.wkn = wkn;
        this.purchasePrice = purchasePrice;
        this.quantity = quantity;
        this.purchaseDate = purchaseDate;
        this.name = name;
        this.description = description;
        this.category = category;
        this.plusButton= plusButton;
        this.portfolio = portfolio;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWkn() {
        return wkn;
    }

    public void setWkn(String wkn) {
        this.wkn = wkn;
    }
    public Float getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(Float purchasePrice) {
        this.purchasePrice = purchasePrice;
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

    public Portfolio getPortfolio() {
        return portfolio;
    }

    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }


    public String getPlusButton() {
        return plusButton;
    }

    public void setPlusButton(String plusButton) {
        this.plusButton = plusButton;
    }
}
