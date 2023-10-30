package dehsaa.teamsix.teamsix.portfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/portfolio")
public class PortfolioController {

    @Autowired
    private PortfolioItemRepository portfolioItemRepository;

    @GetMapping("/items")
    public List<PortfolioItem> getAllPortfolioItems() {
        return portfolioItemRepository.findAll();
    }

    @PostMapping("/items")
    public PortfolioItem createPortfolioItem(@RequestBody PortfolioItem portfolioItem) {

        PortfolioItem savedItem = portfolioItemRepository.save(portfolioItem);

        return savedItem;
    }

    @GetMapping("/{id}")
    public ResponseEntity<PortfolioItem> getPortfolioItemById(@PathVariable Long id) {
        Optional<PortfolioItem> portfolioItem = portfolioItemRepository.findById(id);

        if (portfolioItem.isPresent()) {
            return ResponseEntity.ok(portfolioItem.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}


