package br.com.marcos.service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import br.com.marcos.dto.RequestCuidadoAnimal;
import br.com.marcos.exceptionResponse.ResourceNotFoundException;
import br.com.marcos.model.CuidadoAnimal;
import br.com.marcos.repository.CuidadoAnimalRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;


@Service
public class CuidadoAnimalService {
	
	private static final Logger logger = LoggerFactory.getLogger(FuncionarioService.class);
	
	@Autowired
	private CuidadoAnimalRepository cuidadoanimalRepository;
		
	
	public List<CuidadoAnimal> findAll(){
		logger.debug("Iniciando repository CuidadoAnimal findAll");
		List<CuidadoAnimal> list = cuidadoanimalRepository.findAll();
		logger.debug("CuidadoAnimal encontrado: "+list);
		return list;		
	}
	
	
	public CuidadoAnimal create (RequestCuidadoAnimal cuidadoanimalDto) {
		logger.debug("Inicializando Repository CuidadoAnimal create");
		CuidadoAnimal cuidadoanimal = new CuidadoAnimal(cuidadoanimalDto);
		cuidadoanimalRepository.save(cuidadoanimal);
		logger.debug("CuidadoAnimal Create :"+cuidadoanimal);
		return cuidadoanimal;		
	}
	
	
	public CuidadoAnimal update(Long id, RequestCuidadoAnimal updateCuidadoAnimal) {
	   CuidadoAnimal cuidadoanimalOld = cuidadoanimalRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Cuidado animal não encontrado"));
	   logger.debug("Inicializando Repository CuidadoAnimal update,oldCuidadoAnimal:"+cuidadoanimalOld.toString());
	   cuidadoanimalOld.setIdade(updateCuidadoAnimal.idade());
	   cuidadoanimalOld.setNome(updateCuidadoAnimal.nome());
	   cuidadoanimalOld.setReceita(updateCuidadoAnimal.receita());
	   cuidadoanimalOld.setSexo(updateCuidadoAnimal.nome());
	   cuidadoanimalOld.setVeterinarioresponsavel(updateCuidadoAnimal.veterinarioresponsavel());
	   logger.debug("Novo cuidado Animal:"+cuidadoanimalOld.toString());
       return cuidadoanimalRepository.save(cuidadoanimalOld);
	}
	
		
	public void delete(Long id) {
		logger.debug("Inicializando repository CuidadoAnimal delete");
		Optional<CuidadoAnimal> c = Optional.of(new CuidadoAnimal());
		c = cuidadoanimalRepository.findById(id);
		logger.debug("Cuidado Animal deletado:"+c.toString());
		cuidadoanimalRepository.deleteById(id);
	}



}
