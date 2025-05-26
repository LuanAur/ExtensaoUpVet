package br.com.marcos.repository;

import java.math.BigDecimal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.marcos.model.Entrada;



@Repository
public interface EntradaRepository extends JpaRepository<Entrada, Long> {
	
    @Query("SELECT COALESCE(SUM(e.valor), 0) FROM Entrada e")
    BigDecimal calcularTotalEntrada();
		
}
