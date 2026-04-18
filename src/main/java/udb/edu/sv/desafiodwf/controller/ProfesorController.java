package udb.edu.sv.desafiodwf.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import udb.edu.sv.desafiodwf.domain.Profesor;
import udb.edu.sv.desafiodwf.service.ProfesorService;

import java.util.List;

@RestController
@RequestMapping("/api/profesores")
@CrossOrigin(origins = "*")
public class ProfesorController {

    private final ProfesorService profesorService;

    public ProfesorController(ProfesorService profesorService) {
        this.profesorService = profesorService;
    }

    @GetMapping
    public List<Profesor> getAll() {
        return profesorService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profesor> getById(@PathVariable Long id) {
        return profesorService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Profesor create(@Valid @RequestBody Profesor profesor) {
        return profesorService.save(profesor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Profesor> update(@PathVariable Long id, @Valid @RequestBody Profesor profesor) {
        return profesorService.findById(id)
                .map(existing -> {
                    existing.setNombre(profesor.getNombre());
                    return ResponseEntity.ok(profesorService.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return profesorService.findById(id)
                .map(existing -> {
                    profesorService.delete(existing);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().<Void>build());
    }
}
