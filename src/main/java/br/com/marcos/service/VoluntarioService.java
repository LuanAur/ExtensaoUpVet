package br.com.marcos.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import br.com.marcos.dto.RequestVoluntarios;
import br.com.marcos.exceptionResponse.ResourceNotFoundException;
import br.com.marcos.model.Voluntarios;
import br.com.marcos.repository.VoluntarioRepository;

import org.springframework.beans.factory.annotation.Autowired;



@Service
public class VoluntarioService {
	
	@Autowired
	private VoluntarioRepository voluntarioRepository;
		
	
	public List<Voluntarios> findAll(){
		List<Voluntarios> list = voluntarioRepository.findAll();
		return list;		
	}
	
	
	public Voluntarios create (RequestVoluntarios voluntariosDto) {
		Voluntarios voluntarios = new Voluntarios(voluntariosDto);
		voluntarioRepository.save(voluntarios);
		return voluntarios;		
	}
	
	
	public Voluntarios update(Long id, RequestVoluntarios updateVoluntarios) {
	    Voluntarios voluntariosOld = voluntarioRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Voluntário não encontrado"));	   
       return voluntarioRepository.save(voluntariosOld);
	}
	
		
	public void delete(Long id) {
		voluntarioRepository.deleteById(id);
	}



}
