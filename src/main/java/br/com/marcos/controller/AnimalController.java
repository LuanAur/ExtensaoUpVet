package br.com.marcos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.marcos.dto.RequestAnimal;
import br.com.marcos.model.Animal;
import br.com.marcos.service.AnimalService;

	@RestController
	@RequestMapping("/animal")
	public class AnimalController {
		
		@Autowired
		private AnimalService animalService;
				
		@GetMapping
		   public ResponseEntity<List<Animal>> list() {
	        List<Animal> animal = animalService.findAll();
	        return ResponseEntity.ok(animal);
	    }
		
		@DeleteMapping(value = "/{id}")
		public ResponseEntity<Void> delete(@PathVariable Long id){
			animalService.delete(id);
			return ResponseEntity.ok().build();			
		}
				
		@PutMapping
		public ResponseEntity<Animal> update(@RequestBody RequestAnimal dto , @RequestBody Long id){
			Animal newAnimal = animalService.update(id, dto);
			return ResponseEntity.ok(newAnimal);			
		}
				
		@PostMapping
		public ResponseEntity<Animal> post(@RequestBody RequestAnimal dto ){
			Animal animal = animalService.create(dto);
			return ResponseEntity.ok(animal);			
		}
				

	}	

