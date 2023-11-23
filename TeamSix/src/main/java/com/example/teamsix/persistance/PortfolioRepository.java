package com.example.teamsix.persistance;

import com.example.teamsix.domain.Portfolio;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PortfolioRepository extends CrudRepository<Portfolio, Long> {

}
