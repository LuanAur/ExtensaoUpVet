package br.com.marcos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.marcos.model.Veterinarios;



@Repository
public interface VeterinarioRepository extends JpaRepository<Veterinarios, Long> {
		
}
