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

import br.com.marcos.dto.RequestVeterinarios;
import br.com.marcos.model.Veterinarios;
import br.com.marcos.service.VeterinarioService;

	@RestController
	@RequestMapping("/veterinarios")
	public class VeterinarioController {
		
		@Autowired
		private VeterinarioService veterinarioService;
				
		@GetMapping
		   public ResponseEntity<List<Veterinarios>> list() {
	        List<Veterinarios> veterinarios = veterinarioService.findAll();
	        return ResponseEntity.ok(veterinarios);
	    }
		
		@DeleteMapping(value = "/{id}")
		public ResponseEntity<Void> delete(@PathVariable Long id){
			veterinarioService.delete(id);
			return ResponseEntity.ok().build();			
		}
				
		@PutMapping
		public ResponseEntity<Veterinarios> update(@RequestBody RequestVeterinarios dto , @PathVariable Long id){
			Veterinarios newVeterinarios = veterinarioService.update(id, dto);
			return ResponseEntity.ok(newVeterinarios);			
		}
				
		@PostMapping
		public ResponseEntity<Veterinarios> post(@RequestBody RequestVeterinarios dto ){
			Veterinarios veterinario = veterinarioService.create(dto);
			return ResponseEntity.ok(veterinario);			
		}
				

	}	


