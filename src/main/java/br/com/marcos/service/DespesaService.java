package br.com.marcos.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import br.com.marcos.dto.RequestDespesa;
import br.com.marcos.exceptionResponse.ResourceNotFoundException;
import br.com.marcos.model.Despesa;
import br.com.marcos.repository.DespesaRepository;

import org.springframework.beans.factory.annotation.Autowired;


@Service
public class DespesaService {
	
	@Autowired
	private DespesaRepository despesaRepository;
		
	
	public List<Despesa> findAll(){
		List<Despesa> list = despesaRepository.findAll();
		return list;		
	}
	
	
	public Despesa create (RequestDespesa despesaDto) {
		Despesa despesa = new Despesa(despesaDto);
		despesaRepository.save(despesa);
		return despesa;		
	}
	
	
	public Despesa update(Long id, RequestDespesa updateDespesa) {
	   Despesa despesaOld = despesaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Despesa não encontrado"));	   
       return despesaRepository.save(despesaOld);
	}
	
		
	public void delete(Long id) {
		despesaRepository.deleteById(id);
	}



}
