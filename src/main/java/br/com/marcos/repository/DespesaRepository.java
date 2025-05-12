package br.com.marcos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.marcos.model.Despesa;



@Repository
public interface DespesaRepository extends JpaRepository<Despesa, Long> {
		
}
