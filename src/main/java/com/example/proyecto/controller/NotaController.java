package com.example.proyecto.controller;

import com.example.proyecto.model.Nota;
import com.example.proyecto.repository.NotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/notas")  
@CrossOrigin(origins = "http://localhost:5173")  
public class NotaController {

    @Autowired
    private NotaRepository notaRepository;

    // GET: Obtener todas las notas
    @GetMapping
    public List<Nota> getAllNotas() {
        return notaRepository.findAll();
    }

    // GET: Obtener una nota por ID
    @GetMapping("/{id}")
    public ResponseEntity<Nota> getNotaById(@PathVariable Long id) {
        Nota nota = notaRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("No se encontró la nota con el ID: " + id));
        return ResponseEntity.ok(nota);
    }

    // POST: Crear una nueva nota
    @PostMapping
    public ResponseEntity<Nota> createNota(@RequestBody Nota nota) {
        Nota nuevaNota = notaRepository.save(nota);
        return new ResponseEntity<>(nuevaNota, HttpStatus.CREATED);
    }

    // PUT: Actualizar una nota existente
    @PutMapping("/{id}")
    public ResponseEntity<Nota> updateNota(@PathVariable Long id, @RequestBody Nota notaDetails) {
        Nota nota = notaRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("No se encontró la nota con el ID: " + id));

        nota.setScore(notaDetails.getScore());
        nota.setStudentId(notaDetails.getStudentId());
        nota.setEvaluationId(notaDetails.getEvaluationId());

        Nota updatedNota = notaRepository.save(nota);
        return ResponseEntity.ok(updatedNota);
    }

    // DELETE: Eliminar una nota existente
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNota(@PathVariable Long id) {
        Nota nota = notaRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("No se encontró la nota con el ID: " + id));

        notaRepository.delete(nota);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Manejo de excepción si no se encuentra el recurso
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<String> handleNotFound(NoSuchElementException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
