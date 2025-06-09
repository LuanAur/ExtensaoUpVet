package br.com.marcos.controller;

import br.com.marcos.dto.RequestBI;
import br.com.marcos.service.BIService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BIController {

	
	@Autowired
    private  BIService biService;


    @GetMapping("/bi")
    public RequestBI obterBI() {
        return biService.gerarDemonstrativo();
    }
}