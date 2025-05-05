package br.com.marcos.service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import br.com.marcos.dto.RequestAnimal;
import br.com.marcos.exceptionResponse.ResourceNotFoundException;
import br.com.marcos.model.Animal;
import br.com.marcos.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;


@Service
public class AnimalService {
	
	@Autowired
	private AnimalRepository animalRepository;
		
	
	public List<Animal> findAll(){
		List<Animal> list = animalRepository.findAll();
		return list;		
	}
	
	
	public Animal create (RequestAnimal animalDto) {
		Animal animal = new Animal(animalDto);
		animalRepository.save(animal);
		return animal;		
	}
	
	
	public Animal update(Long id, RequestAnimal updateAnimal) {
	   Animal animalOld = animalRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Animal não encontrado"));	   
       return animalRepository.save(animalOld);
	}
	
		
	public void delete(Long id) {
		animalRepository.deleteById(id);
	}



}
