package br.com.marcos.infra.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;

import br.com.marcos.model.User;

@Service
public class TokenService {
	
	@Value("${api.security.token.secret}")
	private String secret;
	
	public String generateToken(User user) {
		try {
			 Algorithm algorithm = Algorithm.HMAC256(secret);
			 String token = JWT.create().
					 withIssuer("auth_api")
					 .withSubject(user.getNome())
					 .withExpiresAt(generateExpiretDateTest())
					 .sign(algorithm);
			 return token;
			
		}catch (JWTCreationException e) {
			throw new RuntimeException("Erro na hora de gerar o token ",e);
		}
		
	}
	
	
	public String valitadeToken(String token) {
		try {
			 Algorithm algorithm = Algorithm.HMAC256(secret);
			return JWT.require(algorithm)
					.withIssuer("auth_api")
					.build()
					.verify(token)
					.getSubject();
					
		}catch (JWTVerificationException e) {
			return "";
		}
	}
	
	private Instant generateExpiretDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
	}
	
	private Instant generateExpiretDateTest() {
        return LocalDateTime.now().plusSeconds(10).toInstant(ZoneOffset.of("-03:00"));
	}

}
