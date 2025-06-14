package br.com.marcos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.marcos.dto.AutheticationDto;
import br.com.marcos.dto.LoginResponseDto;
import br.com.marcos.dto.RegisterDto;
import br.com.marcos.infra.security.TokenService;
import br.com.marcos.model.Funcionario;
import br.com.marcos.model.User;
import br.com.marcos.repository.UserRepository;
import br.com.marcos.service.FuncionarioService;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

	@Autowired
	private AuthenticationManager authMannager;
	
	@Autowired
	private UserRepository repository;
	
	@Autowired
	private FuncionarioService service;
	
	@Autowired
	private TokenService tokenService;
	
	@PostMapping("/login")
	public ResponseEntity login(@RequestBody AutheticationDto data) {
		
		var userNamePass = new UsernamePasswordAuthenticationToken(data.login(), data.password());
		var auth = this.authMannager.authenticate(userNamePass);
		
		var token = tokenService.generateToken((User)auth.getPrincipal());
		
		return ResponseEntity.ok(new LoginResponseDto(token));
	}
	
	
	@PostMapping("/register")
	public ResponseEntity register(@RequestBody RegisterDto data) {
		if(this.repository.findByLogin(data.login())!= null) {
			return ResponseEntity.badRequest().build();
		}
		Funcionario f = service.findFuncionario(data.idFuncionario());
		String encryptPass = new BCryptPasswordEncoder().encode(data.password());
		User user = new User(data.login(),encryptPass,data.role(),f);
		
		this.repository.save(user);
		
		return ResponseEntity.ok().build();
	}
}
