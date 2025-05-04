package br.com.marcos.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.marcos.dto.RequestFuncionario;
import br.com.marcos.exceptionResponse.ResourceNotFoundException;
import br.com.marcos.model.Funcionario;
import br.com.marcos.repository.FuncionarioRepository;
import lombok.extern.slf4j.Slf4j;

@Service
public class FuncionarioService {

@Autowired
private FuncionarioRepository funcionarioRepository;
	
	private static final Logger logger = LoggerFactory.getLogger(FuncionarioService.class);
	
    private static final Logger log = LoggerFactory.getLogger(FuncionarioService.class);


	public List<Funcionario> list() {
		List<Funcionario> list = funcionarioRepository.findAll();
		return list;
	}

	public Funcionario create(RequestFuncionario funcionarioDto) {
<<<<<<< HEAD
		log.info("Inicializando create funcionario!");
		Funcionario funcionario = new Funcionario(funcionarioDto);
		funcionarioRepository.save(funcionario);
		log.debug("Funcionario salvo:" + funcionario.toString());
		return funcionario;
	}

	public Funcionario updte(Long id, RequestFuncionario updateFuncionario) {
		log.debug("Inicializando update funcionario!");
		Funcionario funcionarioOld = funcionarioRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Funcionario nao encontrado"));
=======
		logger.debug("Inicializando create funcionario!");
		Funcionario funcionario = new Funcionario(funcionarioDto);
		funcionarioRepository.save(funcionario);
		logger.debug("Funcionario salvo:"+ funcionario.toString());
		return funcionario;
	}
	
	public Funcionario updte(Long id , RequestFuncionario updateFuncionario) {
		logger.debug("Inicializando update funcionario!");
		Funcionario funcionarioOld = funcionarioRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Funcionario nao encontrado"));
>>>>>>> origin/main
		funcionarioOld.setNome(updateFuncionario.nome());
		funcionarioOld.setAutenticacao(updateFuncionario.autenticacao());
		funcionarioOld.setCargo(updateFuncionario.cargo());
		funcionarioOld.setSalario(updateFuncionario.salario());
<<<<<<< HEAD
		log.debug("Funcionario atualizado:" + funcionarioOld.toString());
=======
		logger.debug("Funcionario atualizado:"+ funcionarioOld.toString());
>>>>>>> origin/main
		return funcionarioOld;

	}

	public void delete(Long id) {
<<<<<<< HEAD
		log.debug("Deletando Funcionario de Id:" + id);
		funcionarioRepository.deleteById(id);
	}

}
=======
		logger.debug("Deletando Funcionario de Id:"+id);
		funcionarioRepository.deleteById(id);
	}
	
}
>>>>>>> origin/main
