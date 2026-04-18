package udb.edu.sv.desafiodwf.domain;


import jakarta.persistence.*;

@Entity
@Table(name = "alumno_materia")
public class AlumnoMateria {

    @EmbeddedId
    private AlumnoMateriaId id;

    @ManyToOne(optional = false)
    @MapsId("idAlumno")
    @JoinColumn(name = "id_alumno")
    private Alumno alumno;

    @ManyToOne(optional = false)
    @MapsId("idMateria")
    @JoinColumn(name = "id_materia")
    private Materia materia;

    @Column(nullable = true)
    private Double calificacion;

    public AlumnoMateria() {}

    public AlumnoMateria(Alumno alumno, Materia materia) {
        this.alumno = alumno;
        this.materia = materia;
        this.id = new AlumnoMateriaId(alumno.getId(), materia.getId());
        this.calificacion = null;
    }

    public AlumnoMateria(Alumno alumno, Materia materia, Double calificacion) {
        this.alumno = alumno;
        this.materia = materia;
        this.id = new AlumnoMateriaId(alumno.getId(), materia.getId());
        this.calificacion = calificacion;
    }

    public AlumnoMateriaId getId() { return id; }
    public Alumno getAlumno() { return alumno; }
    public Materia getMateria() { return materia; }
    public Double getCalificacion() { return calificacion; }

    public void setCalificacion(Double calificacion) { this.calificacion = calificacion; }
}
