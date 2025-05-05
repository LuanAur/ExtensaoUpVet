package br.com.marcos.model;


import java.math.BigDecimal;
import org.springframework.format.annotation.NumberFormat;

import br.com.marcos.dto.RequestDespesa;
import br.com.marcos.dto.RequestEntrada;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "Despesa")
public class Despesa {	
	
	
	@Id
	@GeneratedValue(strategy  = GenerationType.IDENTITY)
	private Long id;	
	private String nome;
	@NumberFormat(pattern = "#,##0,	00")
	private BigDecimal valor;
	private String categoria;
	
	
	public Despesa(Long id, String nome, BigDecimal valor, String categoria) {
		super();
		this.id = id;
		this.nome = nome;
		this.valor = valor;
		this.categoria = categoria;
	}
	
	public Despesa() {
		
	}


	public Despesa(RequestDespesa despesaDto) {
		this.id = despesaDto.id();
		this.nome = despesaDto.nome();
		this.valor = despesaDto.valor();
		this.categoria = despesaDto.categoria();
	}

	
	
	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public BigDecimal getValor() {
		return valor;
	}

	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}

	
	
}