package dto;
 
 import java.math.BigDecimal;
 
 public record RequestVoluntarios(Long id, String nome, String autenticacao, String cargo , BigDecimal salario) {
 }