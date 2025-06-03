package br.com.marcos.model;


import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.format.annotation.NumberFormat;

import br.com.marcos.dto.RequestDespesa;
import br.com.marcos.dto.RequestEntrada;
import br.com.marcos.enums.valorEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "Despesa")
public class Valor {	
	
	
	@Id
	@GeneratedValue(strategy  = GenerationType.IDENTITY)
	private Long id;	
	private String nome;
	@NumberFormat(pattern = "#,##0,	00")
	private BigDecimal valor;
	private String categoria;
	private valorEnum tipo;
	private LocalDateTime time;
	
	
	
	
	


	public Valor(Long id, String nome, BigDecimal valor, String categoria, valorEnum tipo, LocalDateTime time) {
		super();
		this.id = id;
		this.nome = nome;
		this.valor = valor;
		this.categoria = categoria;
		this.tipo = tipo;
		this.time = time;
	}


	public Valor() {
		
	}


	public Valor(RequestDespesa despesaDto) {
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


	public valorEnum getTipo() {
		return tipo;
	}


	public void setTipo(valorEnum tipo) {
		this.tipo = tipo;
	}


	public LocalDateTime getTime() {
		return time;
	}


	public void setTime(LocalDateTime time) {
		this.time = time;
	}

	
	
}