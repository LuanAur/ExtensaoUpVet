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

import br.com.marcos.dto.RequestFuncionario;
import br.com.marcos.model.Funcionario;
import br.com.marcos.service.FuncionarioService;

@RestController
@RequestMapping("/funcionario")
public class Controller {
	
	@Autowired
	private FuncionarioService funcionarioService;
	
	
	@GetMapping
	public ResponseEntity<List<Funcionario>> getAll(){
		List<Funcionario> funcionarios = funcionarioService.list();
		return ResponseEntity.ok(funcionarios);
		
	}
	
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id){
		funcionarioService.delete(id);
		return ResponseEntity.ok().build();
		
	}
	
	
	@PutMapping
	public ResponseEntity<Funcionario> update(@RequestBody RequestFuncionario dto , @RequestBody Long id){
		Funcionario newFuncionario = funcionarioService.updte(id, dto);
		return ResponseEntity.ok(newFuncionario);
		
	}
	
	
	@PostMapping
	public ResponseEntity<Funcionario> post(@RequestBody RequestFuncionario dto ){
		Funcionario funcionario = funcionarioService.create(dto);
		return ResponseEntity.ok(funcionario);
		
	}
	
	
	

}
