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


        public Map<String, Map<String, Object>> totalValues() {
            List<PortfolioItem> portfolioItems = portfolioItemRepository.findAll();

            // Gruppierung nach WKN und Aggregation der Portfolio-Items
            return portfolioItems.stream()
                    .collect(Collectors.groupingBy(PortfolioItem::getWkn,
                            Collectors.collectingAndThen(
                                    Collectors.toList(),
                                    portfolioItemList -> {
                                        // Berechnung des Durchschnittspreises und der Gesamtanzahl
                                        float averagePrice = (float) portfolioItemList.stream()
                                                .mapToDouble(PortfolioItem::getPurchasePrice)
                                                .average()
                                                .orElse(0.0);
                                        long totalQuantity = portfolioItemList.stream()
                                                .mapToLong(PortfolioItem::getQuantity)
                                                .sum();
                                        float totalPrice = (float) portfolioItemList.stream()
                                                .mapToDouble(portfolioItem -> portfolioItem.getPurchasePrice() * portfolioItem.getQuantity())
                                                .sum();

                                        // Erstellen einer Map mit den aggregierten Daten
                                        return Map.of(
                                                "wkn", portfolioItemList.get(0).getWkn(),
                                                "totalQuantity", totalQuantity,
                                                "averagePrice", averagePrice,
                                                "totalPrice", totalPrice
                                        );
                                    }
                            )
                    ));
        }

}
