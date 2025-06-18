package br.com.marcos.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import br.com.marcos.dto.RequestVeterinarios;
import br.com.marcos.exceptionResponse.ResourceNotFoundException;
import br.com.marcos.model.Funcionario;
import br.com.marcos.model.Veterinarios;
import br.com.marcos.repository.VeterinarioRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;



@Service
public class VeterinarioService {
	
	private static final Logger logger = LoggerFactory.getLogger(FuncionarioService.class);

	
	@Autowired
	private VeterinarioRepository veterinarioRepository;
		
	
	public List<Veterinarios> findAll(){
		logger.debug("Iniciando repository list para Veterinarios!");
		List<Veterinarios> list = veterinarioRepository.findAll();
		logger.debug("Veterinario List<>:"+list);
		return list;		
	}
	
	
	public Veterinarios create (RequestVeterinarios veterinariosDto) {
		logger.debug("Inicializando create Veterinarios!");
		Veterinarios veterinarios = new Veterinarios(veterinariosDto);
		logger.debug("Veterinario salvo:"+ veterinarios.toString());
		veterinarioRepository.save(veterinarios);
		return veterinarios;		
	}
	
	
	public Veterinarios update(Long id, RequestVeterinarios updateVeterinarios) {
	    Veterinarios veterinariosOld = veterinarioRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Veterinário não encontrado"));	   
		logger.debug("Inicializando Repository Veterinarios update,oldVeterinarios:"+veterinariosOld.toString());
		veterinariosOld.setAutenticacao(updateVeterinarios.autenticacao());
		veterinariosOld.setDiagnostico(updateVeterinarios.diagnostico());
		veterinariosOld.setNome(updateVeterinarios.nome());
		veterinariosOld.setNomedoanimal(updateVeterinarios.nomedoanimal());
		veterinariosOld.setReceita(updateVeterinarios.receita());
	    logger.debug("Veterinarios atualizado:"+ veterinariosOld.toString());
	    return veterinarioRepository.save(veterinariosOld);
	}
	
		
	public void delete(Long id) {
		Optional<Veterinarios> v = Optional.of(new Veterinarios());
		v = veterinarioRepository.findById(id);
		logger.debug("Veterinarios Excluida:"+v);
		veterinarioRepository.deleteById(id);
	}



}
