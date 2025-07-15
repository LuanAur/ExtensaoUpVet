"use client"
import React, { useEffect, useState } from "react";
import { DataTable, DataTableFilterMeta, DataTableFilterMetaData, DataTableRowEditCompleteEvent } from "primereact/datatable";
import { Column, ColumnEditorOptions } from "primereact/column";
import "./calendar.css";
import LancamentoModal from "../bi/upBI";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Helix } from "ldrs/react";
import { format } from "date-fns";
import { Chart } from "primereact/chart";
import { ptBR } from "date-fns/locale";
import { confirmDialog } from "primereact/confirmdialog";
import { ConfirmDialog } from "primereact/confirmdialog";
import { authFetch } from "../utils/authFetch";

interface Lancamento {
  id: number;
  nome: string;
  valor: number;
  time: string;
  tipo: "ENTRADA" | "DESPESA";
}

const ListFluxoCaixa: React.FC = () => {
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "graph">("table");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const confirmDelete = (id: number) => {
    confirmDialog({
      message: "Você tem certeza que deseja deletar este lançamento?",
      header: "Confirmação",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      acceptClassName: "p-button-danger",
      rejectClassName: "!bg-gray-600 hover:!bg-gray-700 text-black",
      accept: async () => {
        await deleteLancamento(id);
        fetchLancamentos(); 
      },
    });
  };
  
  const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: {
          value: '',
          matchMode: FilterMatchMode.CONTAINS
        } as DataTableFilterMetaData
      });
  

  useEffect(() => {
    fetchLancamentos();
  }, []);




  const fetchLancamentos = async () => {
    setLoading(true);
    try {
      const res = await authFetch("https://168.231.88.35:8080/valor");
      const time = await res.json();
  
      interface Lancamento {
        id: number;
        nome: string;
        valor: number;
        time: string;
        tipo: 'ENTRADA' | 'DESPESA';
      }
      
      const formatados: Lancamento[] = time.map((v: Lancamento) => ({
        id: v.id,
        nome: v.nome,
        valor: v.valor,
        time: v.time,
        tipo: v.tipo, 
      }));      
  
      setLancamentos(formatados);
    } catch (err) {
      console.error("Erro ao carregar lançamentos:", err);
    } finally {
      
      setLoading(false);
    }
  };

  const onRowEditComplete = async (e: DataTableRowEditCompleteEvent) => {
    const updatedLancamento = e.newData as Lancamento;
  
    try {
      const response = await authFetch(`https://168.231.88.35:8080/valor/${updatedLancamento.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedLancamento),
      });
     
      //TOKEN EXPIRE
      if(response.status == 403){
        window.location.replace('https://168.231.88.35:8080/aut/login');
      }
  
      const updatedList = [...lancamentos];
      updatedList[e.index] = updatedLancamento;
      setLancamentos(updatedList);
      fetchLancamentos(); 
    } catch (error) {
      console.error("Erro ao atualizar lançamento:", error);
    }
  };
  

  const deleteLancamento = async (id: number) => {
    try {
     const response =  await authFetch(`https://168.231.88.35:8080/valor/${id}`, {
        method: "DELETE",
      });
      setLancamentos(lancamentos.filter((l) => l.id !== id));
      //TOKEN EXPIRE
      if(response.status == 403){
        window.location.replace('https://168.231.88.35:8080/aut/login');
      }

    } catch (error) {
      console.error("Erro ao deletar lançamento:", error);
    }

    
  };
  

  const textEditor = (options: ColumnEditorOptions) => (
    <InputText
      value={options.value ?? ""}
      onChange={(e) => {
        if (options.editorCallback) {
          options.editorCallback(e.target.value);
        }
      }}
    />
  );
  
  
  const valorEditor = (options: ColumnEditorOptions) => (
    <InputText
      value={options.value?.toString() || ""}
      onChange={(e) => {
        const parsed = parseFloat(e.target.value);
        if (options.editorCallback && !isNaN(parsed)) {
          options.editorCallback(parsed);
        }
      }}
    />
  );
  
  

  const deleteButtonTemplate = (rowData: Lancamento) => (
    <Button
      icon="pi pi-trash"
      className="p-button-danger p-button-icon-only"
      onClick={() => confirmDelete(rowData.id)}
      aria-label="Deletar lançamento"
    />
  );
  
  const lancamentosFiltrados = lancamentos.filter((l) => {
    const dataLancamento = new Date(l.time);
    const afterStart = !startDate || dataLancamento >= startDate;
    const beforeEnd = !endDate || dataLancamento <= endDate;
    return afterStart && beforeEnd;
  }); 

  const totalEntradas = lancamentosFiltrados
  .filter((l) => l.tipo === "ENTRADA")
  .reduce((acc, curr) => acc + curr.valor, 0);

const totalDespesas = lancamentosFiltrados
  .filter((l) => l.tipo === "DESPESA")
  .reduce((acc, curr) => acc + curr.valor, 0);

const saldo = totalEntradas - totalDespesas;

  const formatCurrency = (value: number) =>
    `R$ ${value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const header = (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
      <Button
        text
        icon="pi pi-filter-slash"
        label="Limpar"
        onClick={() =>
          setFilters({
            global: { value: "", matchMode: FilterMatchMode.CONTAINS },
          })
        }
        className="w-full sm:w-auto !text-[color:#4a312a] hover:!bg-[color:#bdbdbd]"
      />
      <span className="p-input-icon-left w-full sm:w-auto">
        <InputText
          value={'value' in filters.global ? filters.global.value : ''}
          onChange={(e) => {
            const value = e.target.value;
            const _filters = { ...filters };
            const globalFilter = _filters["global"];

            if (globalFilter && "value" in globalFilter) {
              globalFilter.value = value;
              _filters["global"] = globalFilter;
              setFilters(_filters);
            }
          }}
          placeholder="Pesquisar..."
          className="w-full sm:w-64"
        />
      </span>
    </div>
  );

  const gerarDadosGrafico = () => {
    const dadosPorMes: Record<string, { entrada: number; despesa: number; date: Date }> = {};
  
    lancamentosFiltrados.forEach((l) => {
      const data = new Date(l.time);
      const mesAno = format(data, "MMM/yyyy", { locale: ptBR });
  
      if (!dadosPorMes[mesAno]) {
        dadosPorMes[mesAno] = { entrada: 0, despesa: 0, date: new Date(data.getFullYear(), data.getMonth(), 1) };
      }
  
      if (l.tipo === "ENTRADA") {
        dadosPorMes[mesAno].entrada += l.valor;
      } else {
        dadosPorMes[mesAno].despesa += l.valor;
      }
    });
  
    return Object.entries(dadosPorMes)
      .map(([mes, valores]) => ({
        mes,
        ...valores,
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime()); 
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Helix size="150" speed="2.5" color="Brown" />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-6 max-w-full space-y-6">

      <div className="flex flex-wrap gap-2 justify-between items-center">
        <div className="flex gap-2">
          <Button
            label="Ver Tabela"
            onClick={() => setViewMode("table")}
            raised
            className={`!p-2 ${viewMode === "table" ? "!bg-[color:#c49d54] hover:!bg-[color:#c49d54]" : "!bg-[color:#e3b963] hover:!bg-[color:#c49d54]"}`}
          />
          <Button
            label="Ver Gráfico"
            onClick={() => setViewMode("graph")}
            raised
            className={`!p-2 ${viewMode === "graph" ? "!bg-[color:#c49d54] hover:!bg-[color:#c49d54]" : "!bg-[color:#e3b963] hover:!bg-[color:#c49d54]"}`}
          />
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex flex-col">
            <Calendar
              value={startDate}
              onChange={(e) => setStartDate(e.value as Date)}
              dateFormat="dd/mm/yy"
              placeholder="Início"
              showIcon
              className="custom-calendar"
            />
          </div>

          <div className="flex flex-col">
            <Calendar
              value={endDate}
              onChange={(e) => setEndDate(e.value as Date)}
              dateFormat="dd/mm/yy"
              placeholder="Fim"
              showIcon
              className="custom-calendar"
            />
          </div>

          <Button
            text
            label="Limpar Datas"
            onClick={() => {
              setStartDate(null);
              setEndDate(null);
            }}
            className="text-sm !text-[color:#4a312a] hover:!bg-[color:#bdbdbd]"
          />
        </div>

        <Button
          text
          raised
          label="Novo Lançamento"
          onClick={() => setIsModalOpen(true)}
          className="!bg-[color:#e3b963] hover:!bg-[color:#c49d54] !text-white p-2 rounded"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white text-center">
        <div className="bg-[color:#72e363] rounded-xl p-4 shadow">
          Entradas: <br /> <strong>{formatCurrency(totalEntradas)}</strong>
        </div>
        <div className="bg-[color:#e36363] rounded-xl p-4 shadow">
          Despesas: <br /> <strong>{formatCurrency(totalDespesas)}</strong>
        </div>
        <div
          className={`rounded-xl p-4 shadow ${
            saldo >= 0 ? "bg-[color:#63bfe3]" : "bg-[color:#dde363]"
          }`}
        >
          Saldo: <br /> <strong>{formatCurrency(saldo)}</strong>
        </div>
      </div>

      {viewMode === "table" ? (
        <div className="overflow-x-auto">
          <DataTable
            value={lancamentosFiltrados}
            filters={filters}
            globalFilterFields={["nome", "tipo"]}
            header={header}
            paginator
            rows={8}
            stripedRows
            showGridlines
            emptyMessage="Nenhum lançamento encontrado"
            responsiveLayout="scroll"
            editMode="row"
            dataKey="id"
            onRowEditComplete={onRowEditComplete}
          >
            <Column field="nome" header="Descrição" editor={textEditor} sortable />
            <Column
              field="valor"
              header="Valor"
              editor={valorEditor}
              body={(rowData) => formatCurrency(rowData.valor)}
              sortable
            />
            <Column
              field="time"
              header="Data"
              body={(rowData) => format(new Date(rowData.time), "dd/MM/yyyy - HH:mm")}
              sortable
            />
            <Column
              field="tipo"
              header="Tipo"
              body={(rowData) => (
                <span
                  className={
                    rowData.tipo === "ENTRADA" ? "text-[color:#72e363]" : "text-[color:#e36363]"
                  }
                >
                  {rowData.tipo}
                </span>
              )}
              sortable
            />
            <Column rowEditor header="" bodyStyle={{ textAlign: "center" }} />
            <Column
              body={deleteButtonTemplate}
              header=""
              bodyStyle={{ textAlign: "center" }}
            />
          </DataTable>
        </div>
      ) : (
        <div className="bg-white p-4 rounded shadow">
          
          <Chart
            type="bar"
            data={{
              labels: gerarDadosGrafico().map((d) => d.mes),
              datasets: [
                {
                  label: "Entradas",
                  backgroundColor: "#72e363",
                  data: gerarDadosGrafico().map((d) => d.entrada),
                },
                {
                  label: "Despesas",
                  backgroundColor: "#e36363" ,
                  data: gerarDadosGrafico().map((d) => d.despesa),
                },
              ],
            }}
            options={{
              indexAxis: "x",
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top",
                },
                tooltip: {
                  mode: "index",
                  intersect: false,
                },
              },
              scales: {
                x: {
                  beginAtZero: true,
                },
                y: {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                  },
                },
              },
            }}
            style={{ height: "400px", backgroundColor: "#ffffff" }}
          />
        </div>
      )}

      <LancamentoModal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false); fetchLancamentos();}} />
      <ConfirmDialog />
    </div>
  );
};

export default ListFluxoCaixa;

