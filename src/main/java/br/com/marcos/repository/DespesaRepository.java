package br.com.marcos.repository;

import java.math.BigDecimal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.marcos.model.Despesa;



@Repository
public interface DespesaRepository extends JpaRepository<Despesa, Long> {
	
	@Query("SELECT COALESCE(SUM(d.valor), 0) FROM Despesa d")
    BigDecimal calcularTotalDespesa(); 
		
}
