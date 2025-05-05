package br.com.marcos.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import br.com.marcos.dto.RequestVeterinarios;
import br.com.marcos.exceptionResponse.ResourceNotFoundException;
import br.com.marcos.model.Veterinarios;
import br.com.marcos.repository.VeterinarioRepository;

import org.springframework.beans.factory.annotation.Autowired;



@Service
public class VeterinarioService {
	
	@Autowired
	private VeterinarioRepository veterinarioRepository;
		
	
	public List<Veterinarios> findAll(){
		List<Veterinarios> list = veterinarioRepository.findAll();
		return list;		
	}
	
	
	public Veterinarios create (RequestVeterinarios veterinariosDto) {
		Veterinarios veterinarios = new Veterinarios(veterinariosDto);
		veterinarioRepository.save(veterinarios);
		return veterinarios;		
	}
	
	
	public Veterinarios update(Long id, RequestVeterinarios updateVeterinarios) {
	    Veterinarios veterinariosOld = veterinarioRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Veterinário não encontrado"));	   
       return veterinarioRepository.save(veterinariosOld);
	}
	
		
	public void delete(Long id) {
		veterinarioRepository.deleteById(id);
	}



}
