package br.com.marcos.model;


import java.math.BigDecimal;

import org.springframework.format.annotation.NumberFormat;

<<<<<<< HEAD
=======

>>>>>>> 82f9b6edf944b01807f5f8eb4aaab90ebf351b53
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "Entrada")
public class Entrada {	
	
	
	@Id
	@GeneratedValue(strategy  = GenerationType.IDENTITY)
	private Long id;	
	private String nome;
	private BigDecimal valor;
	
	
	public Entrada(Long id, String nome, BigDecimal valor) {
		super();
		this.id = id;
		this.nome = nome;
		this.valor = valor;
	}
	
	public Entrada() {
		
	}


<<<<<<< HEAD
	
=======

>>>>>>> 82f9b6edf944b01807f5f8eb4aaab90ebf351b53

	
	
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
