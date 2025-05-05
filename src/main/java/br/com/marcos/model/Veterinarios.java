package br.com.marcos.model;


import br.com.marcos.dto.RequestVeterinarios;
//import br.com.marcos.dto.RequestVeterinarios;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.security.auth.message.callback.PrivateKeyCallback.Request;


@Entity
@Table(name = "Veterinario")
public class Veterinarios {	
	
	
	@Id
	@GeneratedValue(strategy  = GenerationType.IDENTITY)
	private Long id;	
	private String nome;
	private String autenticacao;
	private String receita;
	private String diagnostisco;
	private String nomedoanimal;
	
	
	public Veterinarios(Long id, String nome, String autenticacao, String receita,String diagnostico, String nomedoanimal) {
		super();
		this.id = id;
		this.nome = nome;
		this.autenticacao = autenticacao;
		this.receita = receita;
		this.diagnostisco = diagnostico;
		this.nomedoanimal = nomedoanimal;
	}
	
	public Veterinarios() {
		
	}


	public Veterinarios(RequestVeterinarios veterinariosDto) {
		this.id = veterinariosDto.id();
		this.nome = veterinariosDto.nome();
		this.autenticacao = veterinariosDto.autenticacao();
		this.receita = veterinariosDto.receita();
		this.diagnostisco = veterinariosDto.diagnostico();
		this.nomedoanimal = veterinariosDto.nomedoanimal();
	}

	
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getReceita() {
		return receita;
	}


	public void setReceita(String receita) {
		this.receita = receita;
	}


	public String getDiagnostisco() {
		return diagnostisco;
	}


	public void setDiagnostisco(String diagnostisco) {
		this.diagnostisco = diagnostisco;
	}


	public String getNomedoanimal() {
		return nomedoanimal;
	}


	public void setNomedoanimal(String nomedoanimal) {
		this.nomedoanimal = nomedoanimal;
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


}
