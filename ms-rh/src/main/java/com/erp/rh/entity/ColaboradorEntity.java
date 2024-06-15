package com.erp.rh.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "colaboradores")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class ColaboradorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String nome;
    private Double salario;
}
