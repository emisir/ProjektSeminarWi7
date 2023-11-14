package com.example.teamsix.service;

import com.example.teamsix.domain.WknTable;
import com.example.teamsix.persistance.WknTableRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class WknTableService {

    private final WknTableRepository wknTableRepository;


    public WknTableService(WknTableRepository wknTableRepository) {
        this.wknTableRepository = wknTableRepository;
    }

    public List<WknTable> getWknTable(){
        return wknTableRepository.findAll();
    }

    public WknTable getWknById(Long id){
        return wknTableRepository.findById(String.valueOf(id)).orElse(null);
    }

    public void addValues(WknTable wknTable){
        wknTableRepository.save(wknTable);
    }

    public Map<String, List<WknTable>> aggregateWkn(){
        List<WknTable> wknTables = wknTableRepository.findAll();
        return wknTables.stream().collect(Collectors.groupingBy(WknTable::getWkn));
    }


        public Map<String, Map<String, Object>> totalValues() {
            List<WknTable> wknTables = wknTableRepository.findAll();

            // Gruppierung nach WKN und Aggregation der Portfolio-Items
            return wknTables.stream()
                    .collect(Collectors.groupingBy(WknTable::getWkn,
                            Collectors.collectingAndThen(
                                    Collectors.toList(),
                                    wknTableList -> {
                                        // Berechnung des Durchschnittspreises und der Gesamtanzahl
                                        float averagePrice = (float) wknTableList.stream()
                                                .mapToDouble(WknTable::getPurchasePrice)
                                                .average()
                                                .orElse(0.0);
                                        long totalQuantity = wknTableList.stream()
                                                .mapToLong(WknTable::getQuantity)
                                                .sum();
                                        float totalPrice = (float) wknTableList.stream()
                                                .mapToDouble(wknTable -> wknTable.getPurchasePrice() * wknTable.getQuantity())
                                                .sum();

                                        // Erstellen einer Map mit den aggregierten Daten
                                        return Map.of(
                                                "wkn", wknTableList.get(0).getWkn(),
                                                "totalQuantity", totalQuantity,
                                                "averagePrice", averagePrice,
                                                "totalPrice", totalPrice
                                        );
                                    }
                            )
                    ));
        }

}
