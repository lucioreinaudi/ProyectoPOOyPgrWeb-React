package com.techstore.backend.controller;

import com.techstore.backend.model.Producto;
import com.techstore.backend.repository.ProductoRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "*")
@Tag(name = "Productos", description = "CRUD completo de productos de TechStore")
public class ProductoController {

    private final ProductoRepository repository;

    public ProductoController(ProductoRepository repository) {
        this.repository = repository;
    }

    // ── GET /productos ────────────────────────────────────────
    @GetMapping
    @Operation(
            summary = "Obtener todos los productos",
            description = "Devuelve el catálogo completo. Acepta filtros opcionales por categoría, marca o disponibilidad.",
            parameters = {
                    @Parameter(name = "categoria",       description = "Filtrar por categoría",  example = "notebook"),
                    @Parameter(name = "marca",            description = "Filtrar por marca",      example = "Apple"),
                    @Parameter(name = "soloDisponibles",  description = "Solo con stock > 0",     example = "true"),
            },
            responses = {
                    @ApiResponse(responseCode = "200", description = "Lista de productos")
            }
    )
    public List<Producto> getAll(
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) Boolean soloDisponibles
    ) {
        if (categoria != null && !categoria.isEmpty())
            return repository.findByCategoria(categoria);
        if (marca != null && !marca.isEmpty())
            return repository.findByMarca(marca);
        if (Boolean.TRUE.equals(soloDisponibles))
            return repository.findByStockGreaterThan(0);
        return repository.findAll();
    }

    // ── GET /productos/{id} ───────────────────────────────────
    @GetMapping("/{id}")
    @Operation(
            summary = "Obtener producto por id",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Producto encontrado"),
                    @ApiResponse(responseCode = "404", description = "Producto no encontrado", content = @Content)
            }
    )
    public ResponseEntity<Producto> getById(
            @Parameter(description = "Id del producto", example = "1")
            @PathVariable Long id
    ) {
        Optional<Producto> producto = repository.findById(id);
        return producto.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ── POST /productos ───────────────────────────────────────
    @PostMapping
    @Operation(
            summary = "Crear un producto nuevo",
            description = "Crea un producto. El id se asigna automáticamente. Usar el ejemplo de la categoría correspondiente.",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = Producto.class),
                            examples = {
                                    @ExampleObject(
                                            name = "Notebook",
                                            summary = "Ejemplo de notebook",
                                            value = """
                            {
                              "categoria": "notebook",
                              "nombre": "Lenovo IdeaPad 3",
                              "marca": "Lenovo",
                              "precio": 850000,
                              "stock": 8,
                              "imagen": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
                              "procesador": "Intel Core i5-1235U",
                              "ramGB": 8,
                              "almacenamientoGB": 512,
                              "pantallaPulgadas": 15.6
                            }
                            """
                                    ),
                                    @ExampleObject(
                                            name = "Celular",
                                            summary = "Ejemplo de celular",
                                            value = """
                            {
                              "categoria": "celular",
                              "nombre": "OnePlus 12",
                              "marca": "OnePlus",
                              "precio": 950000,
                              "stock": 6,
                              "imagen": "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400",
                              "pantallaPulgadas": 6.82,
                              "bateriaMah": 5400,
                              "camaraMp": 50,
                              "almacenamientoGB": 256
                            }
                            """
                                    ),
                                    @ExampleObject(
                                            name = "Auricular",
                                            summary = "Ejemplo de auricular",
                                            value = """
                            {
                              "categoria": "auricular",
                              "nombre": "Jabra Evolve2 55",
                              "marca": "Jabra",
                              "precio": 340000,
                              "stock": 5,
                              "imagen": "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
                              "tipo": "on-ear",
                              "wireless": true,
                              "cancelacionRuido": true
                            }
                            """
                                    ),
                                    @ExampleObject(
                                            name = "Monitor",
                                            summary = "Ejemplo de monitor",
                                            value = """
                            {
                              "categoria": "monitor",
                              "nombre": "Gigabyte M27Q",
                              "marca": "Gigabyte",
                              "precio": 420000,
                              "stock": 7,
                              "imagen": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
                              "pulgadas": 27,
                              "resolucion": "1440p",
                              "panelTipo": "IPS",
                              "hz": 170
                            }
                            """
                                    ),
                                    @ExampleObject(
                                            name = "PC Escritorio",
                                            summary = "Ejemplo de PC escritorio",
                                            value = """
                            {
                              "categoria": "pc_escritorio",
                              "nombre": "PC Gamer Budget",
                              "marca": "Armada",
                              "precio": 980000,
                              "stock": 4,
                              "imagen": "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400",
                              "procesador": "AMD Ryzen 5 5600",
                              "ramGB": 16,
                              "almacenamientoGB": 512,
                              "placaVideo": "RX 6600",
                              "fuenteW": 550
                            }
                            """
                                    )
                            }
                    )
            ),
            responses = {
                    @ApiResponse(responseCode = "201", description = "Producto creado — devuelve el objeto con el id asignado"),
                    @ApiResponse(responseCode = "400", description = "Body inválido", content = @Content)
            }
    )
    public ResponseEntity<Producto> create(@RequestBody Producto producto) {
        Producto creado = repository.save(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    // ── PUT /productos/{id} ───────────────────────────────────
    @PutMapping("/{id}")
    @Operation(
            summary = "Reemplazar un producto completo",
            description = "Reemplaza todos los campos del producto. Enviar el objeto completo con todos sus campos — los que se omitan quedan en null.",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            examples = {
                                    @ExampleObject(
                                            name = "Actualizar notebook",
                                            summary = "Reemplazar MacBook Air M2 completo",
                                            value = """
                            {
                              "id": 1,
                              "categoria": "notebook",
                              "nombre": "MacBook Air M2",
                              "marca": "Apple",
                              "precio": 1950000,
                              "stock": 3,
                              "imagen": "https://images.unsplash.com/photo-1611186871525-5a0c4f200c34?w=400",
                              "procesador": "Apple M2",
                              "ramGB": 16,
                              "almacenamientoGB": 512,
                              "pantallaPulgadas": 13.6
                            }
                            """
                                    )
                            }
                    )
            ),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Producto actualizado"),
                    @ApiResponse(responseCode = "404", description = "Producto no encontrado", content = @Content)
            }
    )
    public ResponseEntity<Producto> update(
            @Parameter(description = "Id del producto a actualizar", example = "1")
            @PathVariable Long id,
            @RequestBody Producto productoActualizado
    ) {
        if (!repository.existsById(id))
            return ResponseEntity.notFound().build();
        productoActualizado.setId(id);
        return ResponseEntity.ok(repository.save(productoActualizado));
    }

    // ── DELETE /productos/{id} ────────────────────────────────
    @DeleteMapping("/{id}")
    @Operation(
            summary = "Eliminar un producto",
            description = "Elimina el producto con el id indicado. Esta acción no se puede deshacer.",
            responses = {
                    @ApiResponse(responseCode = "204", description = "Producto eliminado"),
                    @ApiResponse(responseCode = "404", description = "Producto no encontrado", content = @Content)
            }
    )
    public ResponseEntity<Void> delete(
            @Parameter(description = "Id del producto a eliminar", example = "1")
            @PathVariable Long id
    ) {
        if (!repository.existsById(id))
            return ResponseEntity.notFound().build();
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
