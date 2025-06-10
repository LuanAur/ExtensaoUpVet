package br.com.marcos.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.com.marcos.dto.RequestDespesa;
import br.com.marcos.dto.RequestValorDto;
import br.com.marcos.exceptionResponse.ResourceNotFoundException;
import br.com.marcos.model.Valor;
import br.com.marcos.repository.ValorRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;


@Service
public class EntradaService {
	
	private static final Logger logger = LoggerFactory.getLogger(FuncionarioService.class);

	
	@Autowired
	private ValorRepository entradaRepository;
		
	
	public List<Valor> findAll(){
		List<Valor> list = entradaRepository.findAll();
		logger.debug("Iniciando repository Entrada findAll");
		logger.debug("Entradas encontrado: "+list);
		return list;		
	}
	
	
	public Valor create (RequestValorDto entradaDto) {
		logger.debug("Inicializando Repository Entrada create");
		Valor entrada = new Valor(entradaDto);
		logger.debug("Entrada criada:"+entrada);
		entradaRepository.save(entrada);
		return entrada;		
	}
	
	
	public Valor update(Long id, RequestDespesa updateEntrada) {
		Valor entradaOld = entradaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Entrada não encontrado"));	
		logger.debug("Inicializando Repository Entrada update,oldEntrada:"+entradaOld.toString());
		entradaOld.setNome(updateEntrada.nome());
		entradaOld.setValor(updateEntrada.valor());
		logger.debug("Inicializando Repository Entrada update,newEntrada:"+entradaOld.toString());
       return entradaRepository.save(entradaOld);
	}
	
		
	public void delete(Long id) {
		Optional<Valor> e = Optional.of(new Valor());
		e = entradaRepository.findById(id);
		logger.debug("Entrada Excluida:"+e);
		entradaRepository.deleteById(id);
	}



}
