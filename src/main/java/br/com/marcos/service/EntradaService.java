package br.com.marcos.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import br.com.marcos.dto.RequestEntrada;
import br.com.marcos.exceptionResponse.ResourceNotFoundException;
import br.com.marcos.model.Despesa;
import br.com.marcos.model.Entrada;
import br.com.marcos.repository.EntradaRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;


@Service
public class EntradaService {
	
	private static final Logger logger = LoggerFactory.getLogger(FuncionarioService.class);

	
	@Autowired
	private EntradaRepository entradaRepository;
		
	
	public List<Entrada> findAll(){
		List<Entrada> list = entradaRepository.findAll();
		logger.debug("Iniciando repository Entrada findAll");
		logger.debug("Entradas encontrado: "+list);
		return list;		
	}
	
	
	public Entrada create (RequestEntrada entradaDto) {
		logger.debug("Inicializando Repository Entrada create");
		Entrada entrada = new Entrada(entradaDto);
		logger.debug("Entrada criada:"+entrada);
		entradaRepository.save(entrada);
		return entrada;		
	}
	
	
	public Entrada update(Long id, RequestEntrada updateEntrada) {
	    Entrada entradaOld = entradaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Entrada não encontrado"));	
		logger.debug("Inicializando Repository Entrada update,oldEntrada:"+entradaOld.toString());
		entradaOld.setNome(updateEntrada.nome());
		entradaOld.setValor(updateEntrada.valor());
		logger.debug("Inicializando Repository Entrada update,newEntrada:"+entradaOld.toString());
       return entradaRepository.save(entradaOld);
	}
	
		
	public void delete(Long id) {
		Optional<Entrada> e = Optional.of(new Entrada());
		e = entradaRepository.findById(id);
		logger.debug("Entrada Excluida:"+e);
		entradaRepository.deleteById(id);
	}



}
