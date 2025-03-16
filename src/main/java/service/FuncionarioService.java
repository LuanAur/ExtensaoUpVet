package service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import dto.RequestFuncionario;
import exceptionResponse.ResourceNotFoundException;
import model.Funcionario;
import repository.FuncionarioRepository;

@Service
public class FuncionarioService {
	
	private FuncionarioRepository funcionarioRepository;
	
	
	public List<Funcionario> list(){
		List<Funcionario> list = funcionarioRepository.findAll();
		return list;
	}
	
	
	public Funcionario create(RequestFuncionario funcionarioDto) {
		Funcionario funcionario = new Funcionario(funcionarioDto);
		funcionarioRepository.save(funcionario);
		return funcionario;
		
	}
	
	public Funcionario updte(Long id , RequestFuncionario updateFuncionario) {
		Funcionario funcionarioOld = funcionarioRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Funcionario nao encontrado"));
		funcionarioOld.setNome(updateFuncionario.nome());
		funcionarioOld.setAutenticacao(updateFuncionario.autenticacao());
		funcionarioOld.setCargo(updateFuncionario.cargo());
		funcionarioOld.setSalario(updateFuncionario.salario());
		return funcionarioOld;
		
	}
	
	public void delete(Long id) {
		funcionarioRepository.deleteById(id);
	}

}
