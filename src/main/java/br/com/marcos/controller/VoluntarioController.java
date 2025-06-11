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

import br.com.marcos.dto.RequestVoluntarios;
import br.com.marcos.model.Voluntarios;
import br.com.marcos.service.VoluntarioService;

	@RestController
	@RequestMapping("/voluntarios")
	public class VoluntarioController {
		
		@Autowired
		private VoluntarioService voluntarioService;
				
		@GetMapping
		   public ResponseEntity<List<Voluntarios>> list() {
	        List<Voluntarios> voluntarios = voluntarioService.findAll();
	        return ResponseEntity.ok(voluntarios);
	    }
		
		@DeleteMapping(value = "/{id}")
		public ResponseEntity<Void> delete(@PathVariable Long id){
			voluntarioService.delete(id);
			return ResponseEntity.ok().build();			
		}
				
		@PutMapping(value = "/{id}")
		public ResponseEntity<Voluntarios> update(@RequestBody RequestVoluntarios dto , @PathVariable Long id){
			Voluntarios newVoluntarios = voluntarioService.update(id, dto);
			return ResponseEntity.ok(newVoluntarios);			
		}
				
		@PostMapping
		public ResponseEntity<Voluntarios> post(@RequestBody RequestVoluntarios dto ){
			Voluntarios voluntario = voluntarioService.create(dto);
			return ResponseEntity.ok(voluntario);			
		}
				

	}	


