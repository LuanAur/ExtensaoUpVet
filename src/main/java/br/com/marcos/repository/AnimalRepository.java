package br.com.marcos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.com.marcos.model.Animal;



@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
		
}
