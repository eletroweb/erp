package com.erp.rh.service;

import com.erp.rh.entity.ColaboradorEntity;
import com.erp.rh.entity.dto.ColaboradorRequestDTO;
import com.erp.rh.repository.ColaboradorRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ColaboradorService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ColaboradorRepository colaboradorRepository;

    public ColaboradorRequestDTO convertToDto(ColaboradorEntity colaboradorEntity) {
        return modelMapper.map(colaboradorEntity, ColaboradorRequestDTO.class);
    }

    public ColaboradorEntity convertToEntity(ColaboradorRequestDTO colaboradorRequestDTO) {
        return modelMapper.map(colaboradorRequestDTO, ColaboradorEntity.class);
    }

    public List<ColaboradorRequestDTO> findAll() {
        List<ColaboradorEntity> entities = colaboradorRepository.findAll();
        return entities.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public ColaboradorEntity save(ColaboradorRequestDTO request) {
        ColaboradorEntity entity = convertToEntity(request);
        return colaboradorRepository.save(entity);
    }
}
