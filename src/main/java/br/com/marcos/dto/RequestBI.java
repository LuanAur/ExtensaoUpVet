package br.com.marcos.dto;

import java.math.BigDecimal;

public record RequestBI(BigDecimal totalEntrada, BigDecimal totalDespesa, BigDecimal resultado) {
	
}