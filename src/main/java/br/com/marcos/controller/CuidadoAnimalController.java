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

import br.com.marcos.dto.RequestCuidadoAnimal;
import br.com.marcos.model.CuidadoAnimal;
import br.com.marcos.service.CuidadoAnimalService;

	@RestController
	@RequestMapping("/cuidadoanimal")
	public class CuidadoAnimalController {
		
		@Autowired
		private CuidadoAnimalService cuidadoanimalService;
				
		@GetMapping("/cuidadoanimal")
		   public ResponseEntity<List<CuidadoAnimal>> list() {
	        List<CuidadoAnimal> cuidadoanimal = cuidadoanimalService.findAll();
	        return ResponseEntity.ok(cuidadoanimal);
	    }
		
		@DeleteMapping(value = "/{id}")
		public ResponseEntity<Void> delete(@PathVariable Long id){
			cuidadoanimalService.delete(id);
			return ResponseEntity.ok().build();			
		}
				
		@PutMapping
		public ResponseEntity<CuidadoAnimal> update(@RequestBody RequestCuidadoAnimal dto , @RequestBody Long id){
			CuidadoAnimal newCuidadoAnimal = cuidadoanimalService.update(id, dto);
			return ResponseEntity.ok(newCuidadoAnimal);			
		}
				
		@PostMapping
		public ResponseEntity<CuidadoAnimal> post(@RequestBody RequestCuidadoAnimal dto ){
			CuidadoAnimal cuidadoanimal = cuidadoanimalService.create(dto);
			return ResponseEntity.ok(cuidadoanimal);			
		}
				

	}	

