package com.example.teamsix.web;

import com.example.teamsix.domain.PortfolioItem;
import com.example.teamsix.service.PortfolioItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/portfolioItem")
public class PortfolioItemController {

    private final PortfolioItemService portfolioItemService;

    public PortfolioItemController(PortfolioItemService portfolioItemService){
        this.portfolioItemService = portfolioItemService;
    }

    @PostMapping()
    public void addValues(@RequestBody PortfolioItem portfolioItem){
        portfolioItemService.addValues(portfolioItem);
    }

}
