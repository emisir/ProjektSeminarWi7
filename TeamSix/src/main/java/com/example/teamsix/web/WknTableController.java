package com.example.teamsix.web;

import com.example.teamsix.domain.WknTable;
import com.example.teamsix.service.WknTableService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/wknTable")
public class WknTableController {

    private final WknTableService wknTableService;

    public WknTableController(WknTableService wknTableService){
        this.wknTableService = wknTableService;
    }



    @PostMapping()
    public void addValues(@RequestBody WknTable wknTable){
        wknTableService.addValues(wknTable);
    }

    @GetMapping()
    public ResponseEntity<List<WknTable>> getWkn(){
        List<WknTable> wknTable = wknTableService.getWknTable();

        return new ResponseEntity<>(wknTable, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WknTable> getWknById(@PathVariable Long id){
        WknTable wknTable = wknTableService.getWknById(id);

        if(wknTable != null){
            return ResponseEntity.ok(wknTable);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/totalValues")
    public Map<String, Map<String, Object>> getTotalValues() {
        return wknTableService.totalValues();
    }

    @GetMapping("/aggregation")
    public Map<String, List<WknTable>> getAggregatedWkn() {
        return wknTableService.aggregateWkn();
    }
}
