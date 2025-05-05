package br.com.marcos.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import br.com.marcos.dto.RequestEntrada;
import br.com.marcos.exceptionResponse.ResourceNotFoundException;
import br.com.marcos.model.Entrada;
import br.com.marcos.repository.EntradaRepository;

import org.springframework.beans.factory.annotation.Autowired;


@Service
public class EntradaService {
	
	@Autowired
	private EntradaRepository entradaRepository;
		
	
	public List<Entrada> findAll(){
		List<Entrada> list = entradaRepository.findAll();
		return list;		
	}
	
	
	public Entrada create (RequestEntrada entradaDto) {
		Entrada entrada = new Entrada(entradaDto);
		entradaRepository.save(entrada);
		return entrada;		
	}
	
	
	public Entrada update(Long id, RequestEntrada updateEntrada) {
	    Entrada entradaOld = entradaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Entrada não encontrado"));	   
       return entradaRepository.save(entradaOld);
	}
	
		
	public void delete(Long id) {
		entradaRepository.deleteById(id);
	}



}
