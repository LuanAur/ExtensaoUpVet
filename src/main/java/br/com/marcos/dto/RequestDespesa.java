package br.com.marcos.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import br.com.marcos.enums.ValorEnum;

public record RequestDespesa(Long id, String nome, BigDecimal valor,ValorEnum tipo ) {

}
