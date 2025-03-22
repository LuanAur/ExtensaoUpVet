package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import model.Voluntarios;


@Repository
public interface VoluntarioRepository extends JpaRepository<Voluntarios, Long> {
		
}
