package br.com.marcos.model;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import br.com.marcos.enums.RolesEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Table(name = "users")
@Entity(name = "users")
public class User  implements UserDetails{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String login;
	private String password;
	private RolesEnum roles;

	@OneToOne
    @JoinColumn(name = "funcionario_id") // Chave estrangeira que se refere ao Funcionario
    private Funcionario funcionario;
	
	public User() {
		super();
	}



	public User(String nome, String passworld, RolesEnum roles) {
		super();
		this.login = nome;
		this.password = passworld;
		this.roles = roles;
	}



	public User(Long id, String nome, String passworld, RolesEnum roles) {
		super();
		this.id = id;
		this.login = nome;
		this.password = passworld;
		this.roles = roles;
	}



	public User(String nome, String passworld, RolesEnum roles, Funcionario funcionario) {
		super();
		this.login = nome;
		this.password = passworld;
		this.roles = roles;
		this.funcionario = funcionario;
	}



	public Funcionario getFuncionario() {
		return funcionario;
	}



	public void setFuncionario(Funcionario funcionario) {
		this.funcionario = funcionario;
	}



	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getNome() {
		return login;
	}



	public void setNome(String nome) {
		this.login = nome;
	}



	public String getPassworld() {
		return password;
	}



	public void setPassworld(String passworld) {
		this.password = passworld;
	}



	public RolesEnum getRoles() {
		return roles;
	}



	public void setRoles(RolesEnum roles) {
		this.roles = roles;
	}



	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		if(this.roles == RolesEnum.MASTER) {
			return List.of(new SimpleGrantedAuthority("ROLE_MASTER")
					,new SimpleGrantedAuthority("ROLE_ADMIN")
					,new SimpleGrantedAuthority("ROLE_USER"));
		}else if(this.roles == RolesEnum.ADMIN) {
			return List.of(new SimpleGrantedAuthority("ROLE_ADMIN")
					,new SimpleGrantedAuthority("ROLE_USER"));
		}else {
			return List.of(new SimpleGrantedAuthority("ROLE_USER"));
		}
	}



	@Override
	public String getPassword() {
		return password;
	}



	@Override
	public String getUsername() {
		return login;
	}
	
	
	
	
}
