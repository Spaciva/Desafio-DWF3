package udb.edu.sv.desafiodwf.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import udb.edu.sv.desafiodwf.domain.Materia;
import udb.edu.sv.desafiodwf.service.MateriaService;

import java.util.List;

@RestController
@RequestMapping("/api/materias")
public class MateriaController {

    private final MateriaService materiaService;

    public MateriaController(MateriaService materiaService) {
        this.materiaService = materiaService;
    }

    @GetMapping
    public List<Materia> getAll() {
        return materiaService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Materia> getById(@PathVariable Long id) {
        return materiaService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Materia create(@Valid @RequestBody Materia materia) {
        return materiaService.save(materia);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Materia> update(@PathVariable Long id, @Valid @RequestBody Materia materia) {
        return materiaService.findById(id)
                .map(existing -> {
                    existing.setNombre(materia.getNombre());
                    existing.setProfesor(materia.getProfesor());
                    return ResponseEntity.ok(materiaService.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return materiaService.findById(id)
                .map(existing -> {
                    materiaService.delete(existing);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().<Void>build());
    }
}
