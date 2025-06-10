package br.com.marcos.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import br.com.marcos.enums.valorEnum;

public record RequestValorDto(Long id, String nome, BigDecimal valor, valorEnum tipo, LocalDateTime time) {

}
