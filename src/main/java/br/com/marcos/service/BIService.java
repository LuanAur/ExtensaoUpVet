package br.com.marcos.service;

import java.math.BigDecimal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.marcos.dto.RequestBI;
import br.com.marcos.enums.valorEnum;
import br.com.marcos.repository.ValorRepository;

@Service
public class BIService {

    @Autowired
    private ValorRepository valorRepository;
    
	private static final Logger logger = LoggerFactory.getLogger(FuncionarioService.class);


   

    public RequestBI gerarDemonstrativo() {
    	logger.debug("Inicializando BI");
        BigDecimal totalEntrada = valorRepository.calcularTotal(valorEnum.ENTRADA);
        BigDecimal totalDespesa = valorRepository.calcularTotal(valorEnum.DESPESA);
        BigDecimal resultado = totalEntrada.subtract(totalDespesa);
        logger.debug("Resultados do BI: entradas:"+totalDespesa+"\nTotal Despesa:"+totalDespesa+"\nResultado:"+resultado);
        return new RequestBI(totalEntrada, totalDespesa, resultado);
    }
    
    
}