package dehsaa.teamsix.teamsix.portfolio;


import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Table(name = "portfolioItem")
@Entity
public class PortfolioItem {

    @Id
    @GeneratedValue
//Variablen
    private Long id;
    private String wkn;
    private String name;
    private Float purchasePrice;
    private Long quantity;
    @Column(length = 255)
    private String description;

    private String category;
    private Date purchaseDate;

//*Variablen*

//Getter und Setter Methoden

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

    public List<PortfolioItem> findAll() {
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

    //*Getter und Setter Methoden*






}
