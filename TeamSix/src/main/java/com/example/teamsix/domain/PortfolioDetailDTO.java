package com.example.teamsix.domain;

import java.util.Date;
import java.util.List;

public class PortfolioDetailDTO {
    private String wkn;

    public String getWkn() {
        return wkn;
    }

    public void setWkn(String wkn) {
        this.wkn = wkn;
    }

    private Long id;
    private String name;
    private String description;
    private String category;

    private List<PurchaseDTO> purchases;

    public PortfolioDetailDTO() {
    }

    public PortfolioDetailDTO(Long id, String wkn, String name, String description, String category, List<PurchaseDTO> purchases) {
        this.id = id;
        this.wkn = wkn;
        this.name = name;
        this.description = description;
        this.category = category;
        this.purchases = purchases;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public List<PurchaseDTO> getPurchases() {
        return purchases;
    }

    public void setPurchases(List<PurchaseDTO> purchases) {
        this.purchases = purchases;
    }

    public static class PurchaseDTO {
        private String wkn;

        private Date purchaseDate;
        private Long quantity;
        private Float purchasePrice;
        private Float totalPrice;

        public Date getPurchaseDate() {
            return purchaseDate;
        }

        public void setPurchaseDate(Date purchaseDate) {
            this.purchaseDate = purchaseDate;
        }

        public Long getQuantity() {
            return quantity;
        }

        public void setQuantity(Long quantity) {
            this.quantity = quantity;
        }

        public Float getPurchasePrice() {
            return purchasePrice;
        }

        public void setPurchasePrice(Float purchasePrice) {
            this.purchasePrice = purchasePrice;
        }

        public Float getTotalPrice() {
            return totalPrice;
        }

        public void setTotalPrice(Float totalPrice) {
            this.totalPrice = totalPrice;
        }

        public String getWkn() {
            return wkn;
        }

        public void setWkn(String wkn) {
            this.wkn = wkn;
        }

        public PurchaseDTO() {
        }

        public PurchaseDTO(Date purchaseDate, String wkn, Long quantity, Float purchasePrice, Float totalPrice) {
            this.purchaseDate = purchaseDate;
            this.wkn = wkn;
            this.quantity = quantity;
            this.purchasePrice = purchasePrice;
            this.totalPrice = totalPrice;
        }
    }
}


