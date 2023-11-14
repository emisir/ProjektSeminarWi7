package com.example.teamsix.persistance;

import com.example.teamsix.domain.WknTable;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface WknTableRepository extends ListCrudRepository <WknTable,String> {
}
