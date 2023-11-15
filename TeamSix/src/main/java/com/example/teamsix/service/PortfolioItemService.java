package com.example.teamsix.service;

import com.example.teamsix.domain.PortfolioItem;
import com.example.teamsix.persistance.PortfolioItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PortfolioItemService {

    private final PortfolioItemRepository portfolioItemRepository;


    public PortfolioItemService(PortfolioItemRepository portfolioItemRepository) {
        this.portfolioItemRepository = portfolioItemRepository;
    }

    public List<PortfolioItem> getWknTable(){
        return portfolioItemRepository.findAll();
    }

    public PortfolioItem getWknById(Long id){
        return portfolioItemRepository.findById(String.valueOf(id)).orElse(null);
    }

    public void addValues(PortfolioItem portfolioItem){
        portfolioItemRepository.save(portfolioItem);
    }

    public Map<String, List<PortfolioItem>> aggregateWkn(){
        List<PortfolioItem> portfolioItems = portfolioItemRepository.findAll();
        return portfolioItems.stream().collect(Collectors.groupingBy(PortfolioItem::getWkn));
    }




}
