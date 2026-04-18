package udb.edu.sv.desafiodwf.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import udb.edu.sv.desafiodwf.domain.Alumno;
import udb.edu.sv.desafiodwf.service.AlumnoService;

import java.util.List;

@RestController
@RequestMapping("/api/alumnos")
@CrossOrigin(origins = "*")
public class AlumnoController {

    private final AlumnoService alumnoService;

    public AlumnoController(AlumnoService alumnoService) {
        this.alumnoService = alumnoService;
    }

    @GetMapping
    public List<Alumno> getAll() {
        return alumnoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Alumno> getById(@PathVariable Long id) {
        return alumnoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Alumno create(@Valid @RequestBody Alumno alumno) {
        return alumnoService.save(alumno);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Alumno> update(@PathVariable Long id, @Valid @RequestBody Alumno alumno) {
        return alumnoService.findById(id)
                .map(existing -> {
                    existing.setNombre(alumno.getNombre());
                    existing.setApellido(alumno.getApellido());
                    return ResponseEntity.ok(alumnoService.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return alumnoService.findById(id)
                .map(existing -> {
                    alumnoService.delete(existing);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
