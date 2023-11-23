package com.example.teamsix.web;
import com.example.teamsix.DTO.PortfolioDetailDTO;
import com.example.teamsix.DTO.PortfolioItemDTO;
import com.example.teamsix.DTO.PortfolioSummary;


import com.example.teamsix.service.PortfolioService;
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

    @GetMapping("/{id}/summary")
    public ResponseEntity<List<PortfolioSummary>> getPortfolioSummary(@PathVariable("id") Long id) {
        List<PortfolioSummary> portfolioSummary = portfolioService.getPortfolioSummary(id);

        if (portfolioSummary != null) {
            return ResponseEntity.ok(portfolioSummary);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/detail/{wkn}")
    public ResponseEntity<List<PortfolioDetailDTO>> getPortfolioItem(@PathVariable("id")Long portfolioId, @PathVariable("wkn") String wkn){
        List<PortfolioDetailDTO> portfolioItems = portfolioService.getPortfolioItemsByPortfolioId(portfolioId,wkn);
        return ResponseEntity.ok(portfolioItems);
    }

    @PostMapping("/{id}/add-item")
    public ResponseEntity<String> addPortfolioItem(@PathVariable("id") Long id, @RequestBody PortfolioItemDTO portfolioItemDTO) {
        try {
            portfolioService.addPortfolioItem(id, portfolioItemDTO);
            return ResponseEntity.ok("Portfolio-Item wurde erfolgreich hinzugefügt.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }



}




