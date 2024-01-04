package com.example.teamsix.DTO;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public class SaveItemDTO {

    @NotBlank(message = "isin darf nicht leer sein")
    private String isin;

    @NotNull(message = "Menge darf nicht null sein")
    private Long quantity;
    @NotNull(message = "Kaufdatum darf nicht null sein")
    private Date purchaseDate;


    public SaveItemDTO() {
    }

    public SaveItemDTO(String isin, Long quantity, Date purchaseDate) {
        this.isin = isin;
        this.quantity = quantity;
        this.purchaseDate = purchaseDate;
    }


    public String getIsin() {
        return isin;
    }

    public void setIsin(String isin) {
        this.isin = isin;
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
