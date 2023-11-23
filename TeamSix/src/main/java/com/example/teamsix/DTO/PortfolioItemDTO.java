package com.example.teamsix.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public class PortfolioItemDTO {

    @NotBlank(message = "WKN darf nicht leer sein")
    private String wkn;

    @NotBlank(message = "Name darf nicht leer sein")
    private String name;

    @NotBlank(message = "Beschreibung darf nicht leer sein")
    private String description;
    @NotBlank(message = "Kategorie darf nicht leer sein")
    private String category;
    @NotNull(message = "Kaufpreis darf nicht null sein")
    private Float purchasePrice;
    @NotNull(message = "Menge darf nicht null sein")
    private Long quantity;
    @NotNull(message = "Kaufdatum darf nicht null sein")
    private Date purchaseDate;

    public PortfolioItemDTO() {
    }

    public PortfolioItemDTO(String wkn, String name, String description, String category, Float purchasePrice, Long quantity, Date purchaseDate) {
        this.wkn = wkn;
        this.name = name;
        this.description = description;
        this.category = category;
        this.purchasePrice = purchasePrice;
        this.quantity = quantity;
        this.purchaseDate = purchaseDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getWkn() {
        return wkn;
    }

    public void setWkn(String wkn) {
        this.wkn = wkn;
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
}
