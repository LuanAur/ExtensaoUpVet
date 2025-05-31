package br.com.marcos.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.marcos.dto.RequestFuncionario;
import br.com.marcos.exceptionResponse.ResourceNotFoundException;
import br.com.marcos.model.Funcionario;
import br.com.marcos.repository.FuncionarioRepository;

@Service
public class FuncionarioService {

@Autowired
private FuncionarioRepository funcionarioRepository;
	
	private static final Logger logger = LoggerFactory.getLogger(FuncionarioService.class);
	
	
	public List<Funcionario> list(){
		logger.debug("Iniciando repository list para Funcionario!");
		List<Funcionario> list = funcionarioRepository.findAll();
		logger.debug("Funcionario List<>:"+list);
		return list;
	}
	
	
	public Funcionario create(RequestFuncionario funcionarioDto) {
		logger.debug("Inicializando create funcionario!");
		Funcionario funcionario = new Funcionario(funcionarioDto);
		funcionarioRepository.save(funcionario);
		logger.debug("Funcionario salvo:"+ funcionario.toString());
		return funcionario;
	}
	
	public Funcionario updte(Long id , RequestFuncionario updateFuncionario) {
		Funcionario funcionarioOld = funcionarioRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Funcionario nao encontrado"));
		logger.debug("Inicializando Repository Funcionario update,oldFuncionario:"+funcionarioOld.toString());
		funcionarioOld.setNome(updateFuncionario.nome());
		funcionarioOld.setAutenticacao(updateFuncionario.autenticacao());
		funcionarioOld.setCargo(updateFuncionario.cargo());
		funcionarioOld.setSalario(updateFuncionario.salario());
		logger.debug("Funcionario atualizado:"+ funcionarioOld.toString());
		return funcionarioOld;
		
	}
	
	public void delete(Long id) {
		logger.debug("Deletando Funcionario de Id:"+id);
		funcionarioRepository.deleteById(id);
		Optional<Funcionario> f = Optional.of(new Funcionario());
		logger.debug("Funcionario Deletado:"+f.toString());
		f = funcionarioRepository.findById(id);
	}
	
}
