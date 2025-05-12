package br.com.marcos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.marcos.model.Entrada;



@Repository
public interface EntradaRepository extends JpaRepository<Entrada, Long> {
		
}
