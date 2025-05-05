package br.com.marcos.dto;

import java.math.BigDecimal;

public record RequestDespesa(Long id, String nome, BigDecimal valor, String categoria) {

}
