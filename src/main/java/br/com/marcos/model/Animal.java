package br.com.marcos.model;


import br.com.marcos.dto.RequestAnimal;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "Animal")
public class Animal {	
	
	
	@Id
	@GeneratedValue(strategy  = GenerationType.IDENTITY)	
	private Long id;
	private String nomedono;	
	private int contatodono;
	private String nomeanimal;
	private int contatoemergenciadono;
	
	

	public Animal(Long id, String nomedono, int contatodono, String nomeanimal, int contatoemergenciadono) {
		super();
		this.id = id;
		this.nomedono = nomedono;
		this.contatodono = contatodono;
		this.nomeanimal = nomeanimal;
		this.contatoemergenciadono = contatoemergenciadono;
	}
	
	public Animal() {
		
	}


	public Animal(RequestAnimal animalDto) {
		this.id = animalDto.id();
		this.nomedono = animalDto.nomedono();
		this.contatodono = animalDto.contatodono();
		this.nomeanimal = animalDto.nomeanimal();
		this.contatoemergenciadono = animalDto.contatoemergenciadono();
	}

	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public String getNomedono() {
		return nomedono;
	}

	public void setNomedono(String nomedono) {
		this.nomedono = nomedono;
	}

	public int getContatodono() {
		return contatodono;
	}

	public void setContatodono(int contatodono) {
		this.contatodono = contatodono;
	}

	public String getNomeanimal() {
		return nomeanimal;
	}

	public void setNomeanimal(String nomeanimal) {
		this.nomeanimal = nomeanimal;
	}

	public int getContatoemergenciadono() {
		return contatoemergenciadono;
	}

	public void setContatoemergenciadono(int contatoemergenciadono) {
		this.contatoemergenciadono = contatoemergenciadono;
	}

	
	
}