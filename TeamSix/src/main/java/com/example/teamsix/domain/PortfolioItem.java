package com.example.teamsix.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

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

    @ManyToMany(mappedBy = "favoritedItems", cascade = CascadeType.ALL)
    private List<UserEntity> favoritedByUsers;

    private boolean isFavorite;

    @ManyToOne
    @JoinColumn(name = "username")
    @JsonIgnore
    private UserEntity user;

    @OneToMany(mappedBy = "portfolioItem", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StockOrder> stockOrder;

    private String name;

    @Column(length = 255)
    private String description;

    private String type;
    private String isin;
    private Float currentPrice;


    public PortfolioItem() {
    }

    public PortfolioItem(Long id, Portfolio portfolio, List<UserEntity> favoritedByUsers, boolean isFavorite,
                         UserEntity user, List<StockOrder> stockOrder, String name, String description,
                         String type, String isin, Float currentPrice) {
        this.id = id;
        this.portfolio = portfolio;
        this.favoritedByUsers = favoritedByUsers;
        this.isFavorite = isFavorite;
        this.user = user;
        this.stockOrder = stockOrder;
        this.name = name;
        this.description = description;
        this.type = type;
        this.isin = isin;
        this.currentPrice = currentPrice;
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

    public boolean isFavorite() {
        return isFavorite;
    }

    public void setFavorite(boolean favorite) {
        isFavorite = favorite;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public List<StockOrder> getStockOrder() {
        return stockOrder;
    }

    public void setStockOrder(List<StockOrder> stockOrder) {
        this.stockOrder = stockOrder;
    }
}
