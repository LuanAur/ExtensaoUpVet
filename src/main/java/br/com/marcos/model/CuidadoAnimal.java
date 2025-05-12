package br.com.marcos.model;


import br.com.marcos.dto.RequestCuidadoAnimal;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "CuidadoAnimal")
public class CuidadoAnimal {	
	
	
	@Id
	@GeneratedValue(strategy  = GenerationType.IDENTITY)	
	private Long id;
	private String nome;
	private String sexo;
	private String veterinarioresponsavel;
	private int idade;
	private String receita;
	
	

	public CuidadoAnimal(Long id, String nome, String sexo, String veterinarioresponsavel, int idade, String receita) {
		super();
		this.id = id;
		this.nome = nome;
		this.sexo = sexo;
		this.veterinarioresponsavel = veterinarioresponsavel;
		this.idade = idade;
		this.receita = receita;
	}
	
	public CuidadoAnimal() {
		
	}


	public CuidadoAnimal(RequestCuidadoAnimal cuidadoanimalDto) {
		this.id = cuidadoanimalDto.id();
		this.nome = cuidadoanimalDto.nome();
		this.sexo = cuidadoanimalDto.sexo();
		this.veterinarioresponsavel = cuidadoanimalDto.veterinarioresponsavel();
		this.idade = cuidadoanimalDto.idade();
		this.receita = cuidadoanimalDto.receita();
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

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public String getVeterinarioresponsavel() {
		return veterinarioresponsavel;
	}

	public void setVeterinarioresponsavel(String veterinarioresponsavel) {
		this.veterinarioresponsavel = veterinarioresponsavel;
	}

	public int getIdade() {
		return idade;
	}

	public void setIdade(int idade) {
		this.idade = idade;
	}

	public String getReceita() {
		return receita;
	}

	public void setReceita(String receita) {
		this.receita = receita;
	}
	
	
	
	

}