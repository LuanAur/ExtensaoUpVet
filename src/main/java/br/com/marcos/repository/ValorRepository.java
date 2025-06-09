package br.com.marcos.repository;

import java.math.BigDecimal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.marcos.enums.valorEnum;
import br.com.marcos.model.Valor;



@Repository
public interface ValorRepository extends JpaRepository<Valor, Long> {
	
	@Query("SELECT COALESCE(SUM(d.valor), 0) FROM Valor d where d.tipo = :tipo")
    BigDecimal calcularTotal(@Param("tipo") valorEnum tipo); 
		
}
