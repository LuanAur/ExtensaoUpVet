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
import br.com.marcos.dto.RequestValorDto;
import br.com.marcos.model.Valor;
import br.com.marcos.service.DespesaService;

	@RestController
	@RequestMapping("/valor")
	public class ValorController {
		
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
				
		@PutMapping(value = "/{id}")
		public ResponseEntity<Valor> update(@RequestBody RequestDespesa dto , @PathVariable Long id){
			Valor newDespesa = despesaService.update(id, dto);
			return ResponseEntity.ok(newDespesa);			
		}
				
		@PostMapping
		public ResponseEntity<Valor> post(@RequestBody RequestValorDto dto ){
			Valor despesa = despesaService.create(dto);
			System.out.print("Tipo"+dto.tipo());
			return ResponseEntity.ok(despesa);			
		}
				

	}	

