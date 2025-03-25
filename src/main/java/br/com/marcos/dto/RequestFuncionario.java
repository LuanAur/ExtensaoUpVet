package br.com.marcos.dto;

import java.math.BigDecimal;

public record RequestFuncionario(Long id, String nome, String autenticacao, String cargo , BigDecimal salario) {

}
