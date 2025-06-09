package br.com.marcos.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import br.com.marcos.dto.RequestDespesa;
import br.com.marcos.exceptionResponse.ResourceNotFoundException;
import br.com.marcos.model.Valor;
import br.com.marcos.repository.ValorRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;


@Service
public class DespesaService {
	
	private static final Logger logger = LoggerFactory.getLogger(FuncionarioService.class);

	
	@Autowired
	private ValorRepository despesaRepository;
		
	
	public List<Valor> findAll(){
		logger.debug("Iniciando repository Despesa findAll");
		List<Valor> list = despesaRepository.findAll();
		logger.debug("DespesaService encontrado: "+list);
		return list;		
	}
	
	
	public Valor create (RequestDespesa despesaDto) {
		logger.debug("Inicializando Repository Despesa create");
		Valor despesa = new Valor(despesaDto);
		logger.debug("Despesa criada:"+despesa);
		despesaRepository.save(despesa);
		return despesa;		
	}
	
	
	public Valor update(Long id, RequestDespesa updateDespesa) {
	   Valor despesaOld = despesaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Despesa não encontrado"));
	   logger.debug("Inicializando Repository Despesas update,oldDespesa:"+despesaOld.toString());
	   despesaOld.setCategoria(updateDespesa.categoria());
	   despesaOld.setNome(updateDespesa.nome());
	   despesaOld.setValor(updateDespesa.valor());
	   logger.debug("Inicializando Repository CuidadoAnimal update,newDespesa:"+despesaOld.toString());
       return despesaRepository.save(despesaOld);
	}
	
		
	public void delete(Long id) {
		Optional<Valor> d = Optional.of(new Valor());
		d = despesaRepository.findById(id);
		logger.debug("Despesa Excluida:"+d);
		despesaRepository.deleteById(id);
	}



}
