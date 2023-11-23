package com.example.teamsix.persistance;

import com.example.teamsix.domain.PortfolioItem;
import org.springframework.data.repository.ListCrudRepository;

public interface PortfolioItemRepository extends ListCrudRepository <PortfolioItem,String> {
    boolean existsByWknAndPortfolioId(String wkn, Long portfolioId);

}
