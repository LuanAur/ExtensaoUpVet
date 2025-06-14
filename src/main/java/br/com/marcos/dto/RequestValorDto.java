package br.com.marcos.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import br.com.marcos.enums.ValorEnum;

public record RequestValorDto(Long id, String nome, BigDecimal valor, ValorEnum tipo, LocalDateTime time) {

}
