package com.example.teamsix.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.Collection;
import java.util.List;

@Table(name = "portfolio")
@Entity
public class Portfolio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @OneToMany(mappedBy = "portfolio",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<PortfolioItem> purchases;

    public Portfolio(Long id) {
        this.id = id;
    }

    public Portfolio() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<PortfolioItem> getPurchases() {
        return purchases;
    }

    public void setPurchases(List<PortfolioItem> purchases) {
        this.purchases = purchases;
    }



}
//*Getter und Setter Methoden*