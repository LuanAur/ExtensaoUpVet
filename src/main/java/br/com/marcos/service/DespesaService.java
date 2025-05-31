package br.com.marcos.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import br.com.marcos.dto.RequestDespesa;
import br.com.marcos.exceptionResponse.ResourceNotFoundException;
import br.com.marcos.model.Despesa;
import br.com.marcos.repository.DespesaRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;


@Service
public class DespesaService {
	
	private static final Logger logger = LoggerFactory.getLogger(FuncionarioService.class);

	
	@Autowired
	private DespesaRepository despesaRepository;
		
	
	public List<Despesa> findAll(){
		logger.debug("Iniciando repository Despesa findAll");
		List<Despesa> list = despesaRepository.findAll();
		logger.debug("DespesaService encontrado: "+list);
		return list;		
	}
	
	
	public Despesa create (RequestDespesa despesaDto) {
		logger.debug("Inicializando Repository Despesa create");
		Despesa despesa = new Despesa(despesaDto);
		logger.debug("Despesa criada:"+despesa);
		despesaRepository.save(despesa);
		return despesa;		
	}
	
	
	public Despesa update(Long id, RequestDespesa updateDespesa) {
	   Despesa despesaOld = despesaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Despesa não encontrado"));
	   logger.debug("Inicializando Repository Despesas update,oldDespesa:"+despesaOld.toString());
	   despesaOld.setCategoria(updateDespesa.categoria());
	   despesaOld.setNome(updateDespesa.nome());
	   despesaOld.setValor(updateDespesa.valor());
	   logger.debug("Inicializando Repository CuidadoAnimal update,newDespesa:"+despesaOld.toString());
       return despesaRepository.save(despesaOld);
	}
	
		
	public void delete(Long id) {
		Optional<Despesa> d = Optional.of(new Despesa());
		d = despesaRepository.findById(id);
		logger.debug("Despesa Excluida:"+d);
		despesaRepository.deleteById(id);
	}



}
