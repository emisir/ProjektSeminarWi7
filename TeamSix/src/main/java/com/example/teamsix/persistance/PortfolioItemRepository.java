package com.example.teamsix.persistance;

import com.example.teamsix.domain.PortfolioItem;
import com.example.teamsix.domain.UserEntity;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface PortfolioItemRepository extends ListCrudRepository <PortfolioItem, Long> {
    boolean existsByIsinAndPortfolioId(String isin, Long portfolioId);
    List<PortfolioItem> findByFavoritedByUsersContains(UserEntity user);
}
