package br.com.marcos.model;

import br.com.marcos.dto.RequestFuncionario;
import br.com.marcos.dto.RequestVoluntarios;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.security.auth.message.callback.PrivateKeyCallback.Request;


@Entity
@Table(name = "Voluntario")
public class Voluntarios {	
	
	
	@Id
	@GeneratedValue(strategy  = GenerationType.IDENTITY)
	private Long id;	
	private String nome;
	private String autenticacao;
	private String cargo;
	
	
	public Voluntarios(Long id, String nome, String autenticacao, String cargo) {
		super();
		this.id = id;
		this.nome = nome;
		this.autenticacao = autenticacao;
		this.cargo = cargo;
	}


	public Voluntarios(RequestVoluntarios voluntariosDto) {
		this.id = voluntariosDto.id();
		this.nome = voluntariosDto.nome();
		this.autenticacao = voluntariosDto.autenticacao();
		this.cargo = voluntariosDto.cargo();							
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
	

}
