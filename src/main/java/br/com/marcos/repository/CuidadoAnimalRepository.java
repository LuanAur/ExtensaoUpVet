package br.com.marcos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.com.marcos.model.CuidadoAnimal;



@Repository
public interface CuidadoAnimalRepository extends JpaRepository<CuidadoAnimal, Long> {
		
}
