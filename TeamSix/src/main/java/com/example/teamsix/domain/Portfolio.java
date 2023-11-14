package com.example.teamsix.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import com.example.teamsix.domain.WknTable;

import java.util.List;

@Table(name = "portfolio")
@Entity
public class Portfolio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    @Column(length = 255)
    private String description;

    private String category;

    @OneToMany(mappedBy = "portfolio",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<WknTable> purchases;



    public Portfolio(Long id,  String name, String description, String category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;

    }

    public Portfolio() {

    }

    public Portfolio(Long id ){
        this.id = id;
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

    public List<WknTable> getPurchases() {
        return purchases;
    }

    public void setPurchases(List<WknTable> purchases) {
        this.purchases = purchases;
    }


}
//*Getter und Setter Methoden*