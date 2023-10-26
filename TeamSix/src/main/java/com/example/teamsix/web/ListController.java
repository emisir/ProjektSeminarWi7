package com.example.teamsix.web;

import com.example.teamsix.service.PortfolioService;
import com.example.teamsix.domain.Portfolio;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/list")
public class ListController {

    private final PortfolioService portfolioService;

    public ListController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return new ResponseEntity<>("Hello, world!", HttpStatus.OK);
    }


    @GetMapping   ("/portfolio")
    public ResponseEntity<List<Portfolio>> getPortfolio(@RequestParam(value = "selektiv", required = false)String selektiv) {
        List<Portfolio> portfolio = portfolioService.getAllPortfolio();

        if (portfolio.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(portfolio, HttpStatus.OK);
        }
    }
    @PostMapping("/addPortfolio")
    public ResponseEntity<Portfolio> addPortfolio(@RequestBody Portfolio newPortfolio) {
        if (newPortfolio == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Portfolio createdPortfolio = portfolioService.addPortfolio(newPortfolio);

        if (createdPortfolio != null) {
            return new ResponseEntity<>(createdPortfolio, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}