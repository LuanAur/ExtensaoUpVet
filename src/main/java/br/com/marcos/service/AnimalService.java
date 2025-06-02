package br.com.marcos.service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import br.com.marcos.dto.RequestAnimal;
import br.com.marcos.exceptionResponse.ResourceNotFoundException;
import br.com.marcos.model.Animal;
import br.com.marcos.repository.AnimalRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;


@Service
public class AnimalService {
	
	
	private static final Logger logger = LoggerFactory.getLogger(FuncionarioService.class);

	
	@Autowired
	private AnimalRepository animalRepository;
		
	
	public List<Animal> findAll(){
		logger.debug("Inicializando repository Animal findAll");
		List<Animal> list = animalRepository.findAll();
		logger.debug("Animais encontrados:"+list);
		return list;		
	}
	
	
	public Animal create (RequestAnimal animalDto) {
		logger.debug("Inicializando repository Animal create ");
		Animal animal = new Animal(animalDto);
		animalRepository.save(animal);
		logger.debug("Animal criado:"+animal.toString());
		return animal;		
	}
	
	
	public Animal update(Long id, RequestAnimal updateAnimal) {
		logger.debug("Inicializando repository Animal update");
	   Animal animalOld = animalRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Animal não encontrado"));
	   animalOld.setContatodono(updateAnimal.contatodono());
	   animalOld.setContatoemergenciadono(updateAnimal.contatoemergenciadono());
	   animalOld.setNomeanimal(updateAnimal.nomeanimal());
	   animalOld.setNomedono(updateAnimal.nomedono());
	   logger.debug("dados Antigo Animal: "+animalOld.toString()+"novo animal: "+animalOld.toString());
       return animalRepository.save(animalOld);
	}
	
		
	public void delete(Long id) {
		logger.debug("Inicializando repository animal delete");
		Optional<Animal> n =Optional.of(new Animal());
		n = animalRepository.findById(id);
		logger.debug("Animal deletado: "+n.toString());
		animalRepository.deleteById(id);
		
	}



}
