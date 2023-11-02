package com.example.teamsix.domain;

import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Table(name = "portfolio")
@Entity
public class Portfolio {
    public static class SummaryView{}
    public static class DetailView extends SummaryView{}

    @Id
    @GeneratedValue
    @JsonView(Portfolio.DetailView.class)
    private Long id;

    @JsonView(Portfolio.DetailView.class)
    private String wkn;
    @JsonView(Portfolio.DetailView.class)
    private String name;
    @JsonView(Portfolio.DetailView.class)
    private Float purchasePrice;
    @JsonView(Portfolio.DetailView.class)
    private Long quantity;
    @Column(length = 255)
    private String description;

    private String category;
    private Date purchaseDate;


    public Portfolio(Long id, String wkn, String name, Float purchasePrice, Long quantity, String description, String category, Date purchaseDate) {
        this.id = id;
        this.wkn = wkn;
        this.name = name;
        this.purchasePrice = purchasePrice;
        this.quantity = quantity;
        this.description = description;
        this.category = category;
        this.purchaseDate = purchaseDate;
    }

    public Portfolio() {

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


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public List<Portfolio> findAll() {
        return null;
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

    public Date getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(Date purchaseDate) {
        this.purchaseDate = purchaseDate;

    }
}
//*Getter und Setter Methoden*