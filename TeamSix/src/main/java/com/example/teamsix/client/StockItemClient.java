package com.example.teamsix.client;

import com.example.teamsix.DTO.StockItemDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(
        value = "stockItemClient",
        url = "https://hsaa-stock-exchange-service.azurewebsites.net")
public interface StockItemClient {

    @GetMapping("/v1/stocks/{isin}")
    StockItemDTO getStockItem(@RequestHeader("Api-Key") String apiKey, @PathVariable("isin") String isin);


}
