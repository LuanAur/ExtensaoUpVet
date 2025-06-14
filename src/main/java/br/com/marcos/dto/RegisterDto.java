package br.com.marcos.dto;

import br.com.marcos.enums.RolesEnum;

public record RegisterDto(String login, String password,RolesEnum role, Long idFuncionario) {

}
