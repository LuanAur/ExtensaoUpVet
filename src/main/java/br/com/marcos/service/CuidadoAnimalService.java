package br.com.marcos.service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import br.com.marcos.dto.RequestCuidadoAnimal;
import br.com.marcos.exceptionResponse.ResourceNotFoundException;
import br.com.marcos.model.CuidadoAnimal;
import br.com.marcos.repository.CuidadoAnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;


@Service
public class CuidadoAnimalService {
	
	@Autowired
	private CuidadoAnimalRepository cuidadoanimalRepository;
		
	
	public List<CuidadoAnimal> findAll(){
		List<CuidadoAnimal> list = cuidadoanimalRepository.findAll();
		return list;		
	}
	
	
	public CuidadoAnimal create (RequestCuidadoAnimal cuidadoanimalDto) {
		CuidadoAnimal cuidadoanimal = new CuidadoAnimal(cuidadoanimalDto);
		cuidadoanimalRepository.save(cuidadoanimal);
		return cuidadoanimal;		
	}
	
	
	public CuidadoAnimal update(Long id, RequestCuidadoAnimal updateCuidadoAnimal) {
	   CuidadoAnimal cuidadoanimalOld = cuidadoanimalRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Cuidado animal não encontrado"));	   
       return cuidadoanimalRepository.save(cuidadoanimalOld);
	}
	
		
	public void delete(Long id) {
		cuidadoanimalRepository.deleteById(id);
	}



}
