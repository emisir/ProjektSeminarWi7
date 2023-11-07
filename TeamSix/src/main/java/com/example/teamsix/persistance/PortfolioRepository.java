package com.example.teamsix.persistance;

import com.example.teamsix.domain.Portfolio;
import org.springframework.data.repository.ListCrudRepository;



public interface PortfolioRepository extends ListCrudRepository<Portfolio,Long>{

}
