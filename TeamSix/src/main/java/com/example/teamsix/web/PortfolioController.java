package com.example.teamsix.web;
import com.example.teamsix.domain.Portfolio;
import com.example.teamsix.service.PortfolioService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Portfolio")
public class PortfolioController {


    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {

        this.portfolioService = portfolioService;
    }

    @GetMapping("/portfolio")
    @JsonView(Portfolio.DetailView.class)
    public ResponseEntity<List<Portfolio>> getPortfolio() {
        List<Portfolio> portfolio = portfolioService.getAllPortfolio();
        return new ResponseEntity<>(portfolio, HttpStatus.OK);


    }


    @PostMapping("/portfolio")
    public void addPortfolio(@RequestBody Portfolio portfolio){
        portfolioService.addPortfolio(portfolio);


    }
    @GetMapping("/portfolio/{id}")
    public Portfolio getPortfolioId(@PathVariable Long id){
        return portfolioService.getPortfoliobyId(id);

    }

}




    //@GetMapping()
    //@PostMapping()
    //@DeleteMapping()
    //@PatchMapping()
    //@PutMapping()




