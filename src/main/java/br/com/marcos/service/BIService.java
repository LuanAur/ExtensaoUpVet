package br.com.marcos.service;

import java.math.BigDecimal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import br.com.marcos.dto.RequestBI;
import br.com.marcos.repository.EntradaRepository;
import br.com.marcos.repository.DespesaRepository;

@Service
public class BIService {

    private final EntradaRepository entradaRepository;
    private final DespesaRepository despesaRepository;
    
	private static final Logger logger = LoggerFactory.getLogger(FuncionarioService.class);


    public BIService(EntradaRepository entradaRepository, DespesaRepository despesaRepository) {
        this.entradaRepository = entradaRepository;
        this.despesaRepository = despesaRepository;
    }

    public RequestBI gerarDemonstrativo() {
    	 logger.debug("Inicializando BI");
        BigDecimal totalEntrada = entradaRepository.calcularTotalEntrada();
        BigDecimal totalDespesa = despesaRepository.calcularTotalDespesa();
        BigDecimal resultado = totalEntrada.subtract(totalDespesa);
        logger.debug("Resultados do BI: entradas:"+totalDespesa+"\nTotal Despesa:"+totalDespesa+"\nResultado:"+resultado);
        return new RequestBI(totalEntrada, totalDespesa, resultado);
    }
    
    
}