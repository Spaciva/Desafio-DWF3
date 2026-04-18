package udb.edu.sv.desafiodwf.service;

import org.springframework.stereotype.Service;
import udb.edu.sv.desafiodwf.domain.Alumno;
import udb.edu.sv.desafiodwf.repository.AlumnoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AlumnoService {

    private final AlumnoRepository alumnoRepository;

    public AlumnoService(AlumnoRepository alumnoRepository) {
        this.alumnoRepository = alumnoRepository;
    }

    public List<Alumno> findAll() {
        return alumnoRepository.findAll();
    }

    public Optional<Alumno> findById(Long id) {
        return alumnoRepository.findById(id);
    }

    public Alumno save(Alumno alumno) {
        return alumnoRepository.save(alumno);
    }

    public void delete(Alumno alumno) {
        alumnoRepository.delete(alumno);
    }
}
