package udb.edu.sv.desafiodwf.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import udb.edu.sv.desafiodwf.config.JwtUtils;
import udb.edu.sv.desafiodwf.domain.AppUser;
import udb.edu.sv.desafiodwf.service.AppUserService;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AppUserService appUserService;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(AppUserService appUserService, JwtUtils jwtUtils, PasswordEncoder passwordEncoder) {
        this.appUserService = appUserService;
        this.jwtUtils = jwtUtils;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            AppUser user = appUserService.register(request.username(), request.password());
            String token = jwtUtils.generateToken(user.getUsername(), user.getRole());
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of(
                            "id", user.getId(),
                            "username", user.getUsername(),
                            "role", user.getRole(),
                            "token", token
                    ));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        Optional<AppUser> user = appUserService.findByUsername(request.username());
        
        if (user.isPresent() && passwordEncoder.matches(request.password(), user.get().getPassword())) {
            String token = jwtUtils.generateToken(user.get().getUsername(), user.get().getRole());
            return ResponseEntity.ok(Map.of(
                    "id", user.get().getId(),
                    "username", user.get().getUsername(),
                    "role", user.get().getRole(),
                    "token", token
            ));
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Usuario o contraseña inválidos"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "No autenticado"));
        }
        
        Optional<AppUser> user = appUserService.findByUsername(authentication.getName());
        if (user.isPresent()) {
            return ResponseEntity.ok(Map.of(
                    "id", user.get().getId(),
                    "username", user.get().getUsername(),
                    "role", user.get().getRole()
            ));
        }
        
        return ResponseEntity.notFound().build();
    }

    public record RegisterRequest(
            @NotBlank @Size(min = 3, max = 50) String username,
            @NotBlank @Size(min = 6, max = 100) String password
    ) {}

    public record LoginRequest(
            @NotBlank String username,
            @NotBlank String password
    ) {}
}
