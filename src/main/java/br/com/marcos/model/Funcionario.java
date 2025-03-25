package br.com.marcos.model;

import java.math.BigDecimal;

import br.com.marcos.dto.RequestFuncionario;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Funcionario")
public class Funcionario {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String nome;
	
	private String autenticacao;
	
	private String cargo;
	
	private BigDecimal salario;

	

	public Funcionario(Long id, String nome, String autenticacao, String cargo, BigDecimal salario) {
		super();
		this.id = id;
		this.nome = nome;
		this.autenticacao = autenticacao;
		this.cargo = cargo;
		this.salario = salario;
	}
	
	
	public Funcionario(RequestFuncionario funcionarioDto) {
		this.id = funcionarioDto.id();
		this.nome = funcionarioDto.nome();
		this.autenticacao = funcionarioDto.autenticacao();
		this.cargo = funcionarioDto.cargo();
		this.salario = funcionarioDto.salario();
	}

	public Funcionario() {
		super();
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

	public String getAutenticacao() {
		return autenticacao;
	}

	public void setAutenticacao(String autenticacao) {
		this.autenticacao = autenticacao;
	}

	public String getCargo() {
		return cargo;
	}

	public void setCargo(String cargo) {
		this.cargo = cargo;
	}

	public BigDecimal getSalario() {
		return salario;
	}

	public void setSalario(BigDecimal salario) {
		this.salario = salario;
	}
	
	
	

}
