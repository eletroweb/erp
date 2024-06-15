package com.erp.rh.controller;

import com.erp.rh.entity.dto.ColaboradorRequestDTO;
import com.erp.rh.service.ColaboradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/colaboradores")
public class ColaboradorController {

    @Autowired
    private ColaboradorService colaboradorService;

    @GetMapping
    public List<ColaboradorRequestDTO> findAll() {
        return colaboradorService.findAll();
    }

    @PostMapping
    public ColaboradorRequestDTO save(@RequestBody ColaboradorRequestDTO request) {
        return colaboradorService.convertToDto(colaboradorService.save(request));
    }
}
