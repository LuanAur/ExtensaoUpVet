package br.com.marcos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import br.com.marcos.model.User;

public interface UserRepository extends JpaRepository<User,Long>{
	
	UserDetails findByLogin(String nome);
	
	 void deleteByFuncionarioId(Long funcionarioId);
}
