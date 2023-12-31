package com.example.teamsix.web;
import com.example.teamsix.DTO.PortfolioDetailDTO;
import com.example.teamsix.DTO.SaveItemDTO;
import com.example.teamsix.DTO.PortfolioSummary;


import com.example.teamsix.DTO.StockItemDTO;
import com.example.teamsix.domain.PortfolioItem;
import com.example.teamsix.domain.UserEntity;
import com.example.teamsix.service.PortfolioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/portfolio")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)

public class PortfolioController {

    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping()
    public ResponseEntity<List<PortfolioItem>> getPortfolioItem(){
        List<PortfolioItem> portfolioItems = portfolioService.getPortfolioItems();
        return ResponseEntity.ok(portfolioItems);
    }

    @GetMapping("/favorite/{username}")
    public ResponseEntity<List<PortfolioSummary>> getFavoritePortfolioItems(@PathVariable String username) {
        List<PortfolioSummary> favoriteItems = portfolioService.getFavPortfolioItemsByUser(username);
        return ResponseEntity.ok(favoriteItems);
    }
    @GetMapping("/userTable")
    public ResponseEntity<List<UserEntity>> getUserEntity(){
        List<UserEntity> userEntities = portfolioService.getUserEntities();
        return ResponseEntity.ok(userEntities);
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

    @GetMapping("/{id}/detail/{isin}")
    public ResponseEntity<PortfolioDetailDTO> getPortfolioItem(@PathVariable("id")Long portfolioId, @PathVariable("isin") String isin){
        PortfolioDetailDTO portfolioItems = portfolioService.getPortfolioItemsByPortfolioId(portfolioId,isin);
        return ResponseEntity.ok(portfolioItems);
    }


    @PostMapping("/{id}/add-item")
    public ResponseEntity<String> addPortfolioItem(@PathVariable("id") Long id, @RequestBody @Valid SaveItemDTO saveItemDTO) {
        try {
            portfolioService.addPortfolioItem(id, saveItemDTO);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/buy-item")
    public ResponseEntity<String> buyItem(@PathVariable("id") Long id, @Valid @RequestBody SaveItemDTO saveItemDTO) {
        try {
            portfolioService.buyItem(id, saveItemDTO);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PostMapping("/add-user")
    public ResponseEntity<String> addUserEntity(@RequestBody UserEntity userEntity){
        try {
            portfolioService.addUserEntity(userEntity);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/favorite/{username}")
    public ResponseEntity<?> favoritePortfolioItem(@PathVariable String username, @RequestBody Long itemId) {
        PortfolioItem item = portfolioService.getPortfolioItemById(itemId);
        portfolioService.updateFavoriteStatus(username, item);
        return ResponseEntity.ok().body("Item favorited successfully");
    }

    @DeleteMapping("/delete-user/{username}")
    public ResponseEntity<String> deleteUserEntity(@PathVariable String username){
        boolean isRemoved = portfolioService.deleteUser(username);

        if (!isRemoved){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update-user/{username}")
    public ResponseEntity<String> updateUserEntity(@RequestBody UserEntity userEntity, @PathVariable String username){
        try{
            portfolioService.updateUserEntity(username, userEntity);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }





}




