package com.example.teamsix.domain;

import com.example.teamsix.DTO.StockItemDTO;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "portfolioitemtable")
public class PortfolioItem {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "portfolio_id")
    @JsonBackReference
    private Portfolio portfolio;

    @ManyToMany(mappedBy = "favoritedItems")
    private List<UserEntity> favoritedByUsers;

    @ManyToOne
    @JoinColumn(name = "username")
    @JsonIgnore
    private UserEntity user;

    private Float purchasePrice;

    private Long quantity;

    private Date purchaseDate;

    private String name;

    @Column(length = 255)
    private String description;

    private String type;
    private String isin;
    private Float currentPrice;


    public PortfolioItem() {
    }

    public PortfolioItem(Long id, Float purchasePrice, Long quantity, Date purchaseDate, String name, String description,
                         String type, String isin, Float currentPrice,
                         Portfolio portfolio, List<UserEntity> favoritedByUsers) {
        this.id = id;
        this.purchasePrice = purchasePrice;
        this.quantity = quantity;
        this.purchaseDate = purchaseDate;
        this.name = name;
        this.description = description;
        this.type = type;
        this.isin = isin;
        this.currentPrice = currentPrice;
        this.portfolio = portfolio;
        this.favoritedByUsers = favoritedByUsers;
    }

    public PortfolioItem(Long id) {
        this.id = id;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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


    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getIsin() {
        return isin;
    }

    public void setIsin(String isin) {
        this.isin = isin;
    }

    public Float getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(Float currentPrice) {
        this.currentPrice = currentPrice;
    }

    public List<UserEntity> getFavoritedByUsers() {
        return favoritedByUsers;
    }

    public void setFavoritedByUsers(List<UserEntity> favoritedByUsers) {
        this.favoritedByUsers = favoritedByUsers;
    }


}
