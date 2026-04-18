package udb.edu.sv.desafiodwf.service;

import org.springframework.stereotype.Service;
import udb.edu.sv.desafiodwf.domain.Profesor;
import udb.edu.sv.desafiodwf.repository.ProfesorRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProfesorService {

    private final ProfesorRepository profesorRepository;

    public ProfesorService(ProfesorRepository profesorRepository) {
        this.profesorRepository = profesorRepository;
    }

    public List<Profesor> findAll() {
        return profesorRepository.findAll();
    }

    public Optional<Profesor> findById(Long id) {
        return profesorRepository.findById(id);
    }

    public Profesor save(Profesor profesor) {
        return profesorRepository.save(profesor);
    }

    public void delete(Profesor profesor) {
        profesorRepository.delete(profesor);
    }
}
