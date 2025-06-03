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

import br.com.marcos.dto.RequestDespesa;
import br.com.marcos.dto.RequestEntrada;
import br.com.marcos.model.Valor;
import br.com.marcos.model.Entrada;
import br.com.marcos.service.DespesaService;
import br.com.marcos.service.EntradaService;

	@RestController
	@RequestMapping("/despesa")
	public class DespesaController {
		
		@Autowired
		private DespesaService despesaService;
				
		@GetMapping
		   public ResponseEntity<List<Valor>> list() {
	        List<Valor> despesa = despesaService.findAll();
	        return ResponseEntity.ok(despesa);
	    }
		
		@DeleteMapping(value = "/{id}")
		public ResponseEntity<Void> delete(@PathVariable Long id){
			despesaService.delete(id);
			return ResponseEntity.ok().build();			
		}
				
		@PutMapping
		public ResponseEntity<Valor> update(@RequestBody RequestDespesa dto , @RequestBody Long id){
			Valor newDespesa = despesaService.update(id, dto);
			return ResponseEntity.ok(newDespesa);			
		}
				
		@PostMapping
		public ResponseEntity<Valor> post(@RequestBody RequestDespesa dto ){
			Valor despesa = despesaService.create(dto);
			return ResponseEntity.ok(despesa);			
		}
				

	}	

