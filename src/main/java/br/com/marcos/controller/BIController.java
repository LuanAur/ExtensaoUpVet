package br.com.marcos.controller;

import br.com.marcos.dto.RequestBI;
import br.com.marcos.service.BIService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BIController {

    private final BIService biService;

    public BIController(BIService biService) {
        this.biService = biService;
    }

    @GetMapping("/bi")
    public RequestBI obterBI() {
        return biService.gerarDemonstrativo();
    }
}