package br.com.marcos.service;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;

import br.com.marcos.dto.RequestBI;
import br.com.marcos.repository.EntradaRepository;
import br.com.marcos.repository.DespesaRepository;

@Service
public class BIService {

    private final EntradaRepository entradaRepository;
    private final DespesaRepository despesaRepository;

    public BIService(EntradaRepository entradaRepository, DespesaRepository despesaRepository) {
        this.entradaRepository = entradaRepository;
        this.despesaRepository = despesaRepository;
    }

    public RequestBI gerarDemonstrativo() {
        BigDecimal totalEntrada = entradaRepository.calcularTotalEntrada();
        BigDecimal totalDespesa = despesaRepository.calcularTotalDespesa();
        BigDecimal resultado = totalEntrada.subtract(totalDespesa);
        
        return new RequestBI(totalEntrada, totalDespesa, resultado);
    }
    
    
}