package br.com.marcos.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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
import io.netty.util.internal.logging.Log4J2LoggerFactory;

@RequestMapping(value = "/funcionario")

@RestController
public class FuncionarioController {
	
	private static final Logger logger = LoggerFactory.getLogger(FuncionarioController.class);

			
	@Autowired
	private FuncionarioService funcionarioService;
	
	
	@GetMapping
	public ResponseEntity<List<Funcionario>> getAll(){
		
		List<Funcionario> funcionarios = funcionarioService.list();
	
		return ResponseEntity.ok(funcionarios);
		
	}
	
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id){
		logger.debug("Iniciando requisicao Delete Funcionario para o Id:"+id);
		funcionarioService.delete(id);
		return ResponseEntity.ok().build();
		
	}
	
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Funcionario> update(@RequestBody RequestFuncionario dto , @PathVariable Long id){
		logger.debug("Iniciando requisicao Update!"); 
		logger.debug("Id do funcionario a ser atualizado:"+id);
		logger.debug("Atualizando funcionario para novos dados:"+dto);
		Funcionario newFuncionario = funcionarioService.updte(id, dto);
		return ResponseEntity.ok(newFuncionario);
		
	}
	
	
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Funcionario> post(@RequestBody RequestFuncionario dto ){
		logger.debug("Iniciando requisicao Post para Funcionario!");
		logger.debug("Inserindo novo Funcionario:"+dto);
		Funcionario funcionario = funcionarioService.create(dto);
		return ResponseEntity.ok(funcionario);
		
	}
	
	

}
