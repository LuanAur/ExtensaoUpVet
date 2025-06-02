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

import br.com.marcos.dto.RequestEntrada;
import br.com.marcos.model.Entrada;
import br.com.marcos.service.EntradaService;

	@RestController
	@RequestMapping("/entrada")
	public class EntradaController {
		
		@Autowired
		private EntradaService entradaService;
				
		@GetMapping
		   public ResponseEntity<List<Entrada>> list() {
	        List<Entrada> entrada = entradaService.findAll();
	        return ResponseEntity.ok(entrada);
	    }
		
		@DeleteMapping(value = "/{id}")
		public ResponseEntity<Void> delete(@PathVariable Long id){
			entradaService.delete(id);
			return ResponseEntity.ok().build();			
		}
				
		@PutMapping
		public ResponseEntity<Entrada> update(@RequestBody RequestEntrada dto , @RequestBody Long id){
			Entrada newEntrada = entradaService.update(id, dto);
			return ResponseEntity.ok(newEntrada);			
		}
				
		@PostMapping
		public ResponseEntity<Entrada> post(@RequestBody RequestEntrada dto ){
			Entrada entrada = entradaService.create(dto);
			return ResponseEntity.ok(entrada);			
		}
				

	}	


