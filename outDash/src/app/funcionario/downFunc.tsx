"use client"
import React, { useEffect, useState } from "react";
import {
  DataTable,
  DataTableFilterMeta,
  DataTableFilterMetaData,
  DataTableRowEditCompleteEvent,
} from "primereact/datatable";
import { Helix } from 'ldrs/react'
import FuncionarioModal from "../funcionario/upFunc";
import { FilterMatchMode } from 'primereact/api';
import { Column, ColumnEditorOptions } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import { ConfirmDialog } from "primereact/confirmdialog";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { authFetch } from "../utils/authFetch";

interface Funcionario {
  id: number;
  nome: string;
  autenticacao: string;
  salario: number;
  cargo: string;
}

const ListFunc: React.FC = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<DataTableFilterMeta>({
      global: {
        value: '',
        matchMode: FilterMatchMode.CONTAINS
      } as DataTableFilterMetaData
    });

  useEffect(() => {
    fetchFuncionarios();
  }, []);

    const confirmDelete = (id: number) => {
      confirmDialog({
        message: "Você tem certeza que deseja deletar este funcionário?",
        header: "Confirmação",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Sim",
        rejectLabel: "Não",
        acceptClassName: "p-button-danger",
        rejectClassName: "!bg-gray-600 hover:!bg-gray-700 text-black",
        accept: async () => {
          await deleteFuncionario(id);
          fetchFuncionarios(); 
        },
      });
    };

    const fetchFuncionarios = async () => {
      setLoading(true);
      try {
        const response = await authFetch("https://168.231.88.35:8080/funcionario");
    
        if (!response.ok) {
          // Adiciona log de diagnóstico
          const text = await response.text(); // Lê o corpo cru para ver se há alguma dica
          throw new Error(`Erro ${response.status}: ${text || response.statusText}`);
        }

        //TOKEN EXPIRE
      if(response.status == 403){
        window.location.replace('https://168.231.88.35:8080/aut/login');
      }
    
        const data = await response.json();
        setFuncionarios(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Erro ao buscar funcionários:", err);
          setError(err.message);
        } else {
          setError("Ocorreu um erro desconhecido.");
        }
      } finally {
        setLoading(false);
      }
    };
    

  const onRowEditComplete = async (e: DataTableRowEditCompleteEvent) => {
    const updatedFuncionario = e.newData as Funcionario;
    try {
      const response = await authFetch(`https://168.231.88.35:8080/funcionario/${updatedFuncionario.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFuncionario),
      });
      //TOKEN EXPIRE
      if(response.status == 403){
        window.location.replace('https://168.231.88.35:8080/aut/login');
      }
      const updatedList = [...funcionarios];
      updatedList[e.index] = updatedFuncionario;
      setFuncionarios(updatedList);
      fetchFuncionarios();
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
    }
  };

  const deleteFuncionario = async (id: number) => {
    try {
      const response = await authFetch(`https://168.231.88.35:8080/funcionario/${id}`, { method: "DELETE" });
      setFuncionarios(funcionarios.filter((f) => f.id !== id));
      //TOKEN EXPIRE
      if(response.status == 403){
        window.location.replace('https://168.231.88.35:8080/aut/login');
      }
    } catch (error) {
      console.error("Erro ao deletar funcionário:", error);
    }
  };

  const textEditor = (options: ColumnEditorOptions) => (
    <InputText
      value={options.value}
      onChange={(e) => {
        if (options.editorCallback) {
          options.editorCallback(e.target.value);
        }
      }}
    />
  );
  
  const salarioEditor = (options: ColumnEditorOptions) => (
    <InputText
      value={options.value}
      onChange={(e) => {
        const parsed = parseFloat(e.target.value);
        if (options.editorCallback && !isNaN(parsed)) {
          options.editorCallback(parsed);
        }
      }}
    />
  );
  

  const deleteButtonTemplate = (rowData: Funcionario) => (
    <Button
      icon="pi pi-trash"
      className="p-button-danger p-button-icon-only"
      onClick={() => confirmDelete(rowData.id)}
      aria-label="Deletar funcionário"
    />
  );

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const _filters = { ...filters };
    
      const globalFilter = _filters['global'];
    
      if ('value' in globalFilter) {
        globalFilter.value = value;
        _filters['global'] = globalFilter;
      }
    
      setFilters(_filters);
    };

  const header = (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
      <Button
        text
        icon="pi pi-filter-slash"
        label="Limpar"
        className="w-full sm:w-auto !text-[color:#4a312a]"
        onClick={() =>
          setFilters({
            global: { value: '', matchMode: FilterMatchMode.CONTAINS }
          })
        }
      />
      <span className="p-input-icon-left w-full sm:w-auto">
        <InputText
          value={'value' in filters.global ? filters.global.value : ''}
          onChange={onGlobalFilterChange}
          placeholder="Pesquisar..."
          className="w-full sm:w-64"
        />
      </span>
    </div>
  );
  

  if (loading) return <div className="flex items-center justify-center h-screen w-full"> <Helix size="150" speed="2.5" color="Brown" /> </div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-6 max-w-full space-y-4">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
        Lista de Funcionários
      </h2>

      <div className="overflow-x-auto ">
        <DataTable
          filters={filters}
          globalFilterFields={['nome', 'autenticacao', 'cargo', 'salario']}
          header={header}
          value={funcionarios}
          editMode="row"
          dataKey="id"
          paginator
          rows={5}
          onRowEditComplete={onRowEditComplete}
          responsiveLayout="scroll"
          stripedRows
          showGridlines
          emptyMessage="Nenhum funcionário encontrado"
          className="min-w-full"
        >
          <Column 
            field="nome"
            header="Nome"
            editor={textEditor}
            sortable
          ></Column>

          <Column
            field="autenticacao"
            header="Autenticação"
            editor={textEditor}
            sortable
          ></Column>

          <Column
            field="salario"
            header="Salário"
            editor={salarioEditor}
            body={(rowData) => `R$ ${rowData.salario.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            sortable
          ></Column>

          <Column
            field="cargo"
            header="Cargo"
            editor={textEditor}
            sortable
          ></Column>

          <Column
            rowEditor
            header=""
            bodyStyle={{ textAlign: "center" }}
          ></Column>

          <Column
            body={deleteButtonTemplate}
            header=""
            bodyStyle={{ textAlign: "center" }}
          ></Column>
        </DataTable>
      </div>

      <Button  
        text 
        raised
        onClick={() => setIsModalOpen(true)}
        className="!bg-[color:#e3b963] hover:!bg-[color:#c49d54] !font-bold !text-white p-2 rounded w-full items-center justify-center "
      >
        Adicionar Funcionário
      </Button>

      <FuncionarioModal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false); fetchFuncionarios();}} />
      <ConfirmDialog />
    </div>
  );
};

export default ListFunc;
