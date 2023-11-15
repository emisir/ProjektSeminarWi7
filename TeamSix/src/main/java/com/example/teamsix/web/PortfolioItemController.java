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

    @GetMapping()
    public ResponseEntity<List<PortfolioItem>> getWkn(){
        List<PortfolioItem> portfolioItem = portfolioItemService.getWknTable();

        return new ResponseEntity<>(portfolioItem, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PortfolioItem> getWknById(@PathVariable Long id){
        PortfolioItem portfolioItem = portfolioItemService.getWknById(id);

        if(portfolioItem != null){
            return ResponseEntity.ok(portfolioItem);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/totalValues")
    public Map<String, Map<String, Object>> getTotalValues() {
        return portfolioItemService.totalValues();
    }

    @GetMapping("/aggregation")
    public Map<String, List<PortfolioItem>> getAggregatedWkn() {
        return portfolioItemService.aggregateWkn();
    }
}
