package br.com.marcos.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import br.com.marcos.dto.RequestVoluntarios;
import br.com.marcos.exceptionResponse.ResourceNotFoundException;
import br.com.marcos.model.Funcionario;
import br.com.marcos.model.Voluntarios;
import br.com.marcos.repository.VoluntarioRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;



@Service
public class VoluntarioService {
	
	private static final Logger logger = LoggerFactory.getLogger(FuncionarioService.class);

	
	
	@Autowired
	private VoluntarioRepository voluntarioRepository;
		
	
	public List<Voluntarios> findAll(){
		logger.debug("Iniciando repository list para Voluntario!");
		List<Voluntarios> list = voluntarioRepository.findAll();
		logger.debug("Voluntario List<>:"+list);
		return list;		
	}
	
	
	public Voluntarios create (RequestVoluntarios voluntariosDto) {
		logger.debug("Inicializando create Voluntario!");
		Voluntarios voluntarios = new Voluntarios(voluntariosDto);
		logger.debug("Voluntario salvo:"+ voluntarios.toString());
		voluntarioRepository.save(voluntarios);
		return voluntarios;		
	}
	
	
	public Voluntarios update(Long id, RequestVoluntarios updateVoluntarios) {
	    Voluntarios voluntariosOld = voluntarioRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Voluntário não encontrado"));	   
		logger.debug("Inicializando Repository Entrada update,oldEntrada:"+voluntariosOld.toString());
		voluntariosOld.setAutenticacao(updateVoluntarios.autenticacao());
		voluntariosOld.setCargo(updateVoluntarios.cargo());
		voluntariosOld.setNome(updateVoluntarios.nome());
		logger.debug("Inicializando Repository Entrada update,newEntrada:"+voluntariosOld.toString());

	    return voluntarioRepository.save(voluntariosOld);
	}
	
		
	public void delete(Long id) {
		Optional<Voluntarios> v = Optional.of(new Voluntarios());
		v = voluntarioRepository.findById(id);
		logger.debug("Voluntario Excluida:"+v);
		voluntarioRepository.deleteById(id);
	}



}
