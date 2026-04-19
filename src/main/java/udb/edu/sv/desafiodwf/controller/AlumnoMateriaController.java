package udb.edu.sv.desafiodwf.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import udb.edu.sv.desafiodwf.domain.AlumnoMateria;
import udb.edu.sv.desafiodwf.domain.AlumnoMateriaId;
import udb.edu.sv.desafiodwf.service.AlumnoMateriaService;

import java.util.List;

@RestController
@RequestMapping("/api/alumno-materia")
public class AlumnoMateriaController {

    private final AlumnoMateriaService alumnoMateriaService;

    public AlumnoMateriaController(AlumnoMateriaService alumnoMateriaService) {
        this.alumnoMateriaService = alumnoMateriaService;
    }

    @GetMapping
    public List<AlumnoMateria> getAll() {
        return alumnoMateriaService.findAll();
    }

    @GetMapping("/{idAlumno}/{idMateria}")
    public ResponseEntity<AlumnoMateria> getById(@PathVariable Long idAlumno, @PathVariable Long idMateria) {
        AlumnoMateriaId id = new AlumnoMateriaId(idAlumno, idMateria);
        return alumnoMateriaService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().<AlumnoMateria>build());
    }

    @PostMapping
    public AlumnoMateria create(@Valid @RequestBody AlumnoMateria alumnoMateria) {
        return alumnoMateriaService.save(alumnoMateria);
    }

    @DeleteMapping("/{idAlumno}/{idMateria}")
    public ResponseEntity<Void> delete(@PathVariable Long idAlumno, @PathVariable Long idMateria) {
        AlumnoMateriaId id = new AlumnoMateriaId(idAlumno, idMateria);
        return alumnoMateriaService.findById(id)
                .map(existing -> {
                    alumnoMateriaService.delete(existing);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().<Void>build());
    }
}
