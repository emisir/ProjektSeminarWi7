package com.example.teamsix.web;
import com.example.teamsix.domain.Portfolio;
import com.example.teamsix.persistance.PortfolioInfoProjection;
import com.example.teamsix.service.PortfolioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/portfolio")
public class PortfolioController {


    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {

        this.portfolioService = portfolioService;
    }

    @GetMapping()
    public ResponseEntity<List<PortfolioInfoProjection>> getPortfolio() {
        List<PortfolioInfoProjection> portfolio = portfolioService.getPortfolioInfo();
        return new ResponseEntity<>(portfolio, HttpStatus.OK);


    }


    @PostMapping()
    public void addPortfolio(@RequestBody Portfolio portfolio){
        portfolioService.addPortfolio(portfolio);


    }
    @GetMapping("/{id}")
    public ResponseEntity<Portfolio> getPortfolioId(@PathVariable Long id) {
        Portfolio portfolio = portfolioService.getPortfolioById(id);

        if (portfolio != null) {
            return ResponseEntity.ok(portfolio);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}




