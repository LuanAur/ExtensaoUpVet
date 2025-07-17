"use client"
import React, { useEffect, useState } from "react";
import {
  DataTable,
  DataTableFilterMeta,
  DataTableFilterMetaData,
  DataTableRowEditCompleteEvent,
} from "primereact/datatable";
import { Helix } from 'ldrs/react';
import { FilterMatchMode } from 'primereact/api';
import VeterinarioModal from "../veterinario/upVete";
import { Column, ColumnEditorOptions } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import { ConfirmDialog } from "primereact/confirmdialog";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { authFetch } from "../utils/authFetch";

interface Veterinario {
  id: number;
  nome: string;
  autenticacao: string;
  receita: string;
  diagnostico: string;
  nomedoanimal: string;
}

const ListVeterinarios: React.FC = () => {
  const [veterinarios, setVeterinarios] = useState<Veterinario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: {
          value: '',
          matchMode: FilterMatchMode.CONTAINS
        } as DataTableFilterMetaData
      });
  

  useEffect(() => {
    fetchVeterinarios();
  }, []);

  const confirmDelete = (id: number) => {
    confirmDialog({
      message: "Você tem certeza que deseja deletar este veterinário?",
      header: "Confirmação",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      acceptClassName: "p-button-danger",
      rejectClassName: "!bg-gray-600 hover:!bg-gray-700 text-black",
      accept: async () => {
        await deleteVeterinario(id);
        fetchVeterinarios(); 
      },
    });
  };

  const fetchVeterinarios = async () => {
    setLoading(true);
    try {
      const response = await authFetch("http://168.231.88.35:8080/veterinarios");
      const data = await response.json();
      setVeterinarios(data);
      //TOKEN EXPIRE
      if(response.status == 403){
        window.location.replace('http://168.231.88.35:8080/aut/login');
      }


    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro desconhecido.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onRowEditComplete = async (e: DataTableRowEditCompleteEvent) => {
    const updatedVeterinario = e.newData as Veterinario;
    try {
      const response = await authFetch(`http://168.231.88.35:8080/veterinarios/${updatedVeterinario.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedVeterinario),
      });
      //TOKEN EXPIRE
      if(response.status == 403){
        window.location.replace('http://168.231.88.35:8080/aut/login');
      }
      const updatedList = [...veterinarios];
      updatedList[e.index] = updatedVeterinario;
      setVeterinarios(updatedList);
      fetchVeterinarios();
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
    }
  };

  const deleteVeterinario = async (id: number) => {
    try {
      const response = await authFetch(`http://168.231.88.35:8080/veterinarios/${id}`, { method: "DELETE" });
      setVeterinarios(veterinarios.filter((v) => v.id !== id));

      //TOKEN EXPIRE
      if(response.status == 403){
        window.location.replace('http://168.231.88.35:8080/aut/login');
      }
    } catch (error) {
      console.error("Erro ao deletar veterinário:", error);
    }
  };

const textEditor = (options: ColumnEditorOptions) => (
  <InputText
    value={options.value ?? ""}
    onChange={(e) => options.editorCallback?.(e.target.value)}
  />
);

  
  const deleteButtonTemplate = (rowData: Veterinario) => (
    <Button
      icon="pi pi-trash"
      className="p-button-danger p-button-icon-only"
      onClick={() => confirmDelete(rowData.id)}
      aria-label="Deletar lançamento"
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

  if (loading) return <div className="flex items-center justify-center h-screen w-full"><Helix size="150" speed="2.5" color="Brown" /></div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-6 max-w-full space-y-4">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
        Lista de Veterinários
      </h2>

      <div className="overflow-x-auto">
        <DataTable
          filters={filters}
          globalFilterFields={['nome', 'autenticacao', 'receita', 'diagnostico', 'nomedoanimal']}
          header={header}
          value={veterinarios}
          editMode="row"
          dataKey="id"
          paginator
          rows={5}
          onRowEditComplete={onRowEditComplete}
          responsiveLayout="scroll"
          stripedRows
          showGridlines
          emptyMessage="Nenhum veterinário encontrado"
          className="min-w-full"
        >
          <Column field="nome" header="Dono" editor={textEditor} sortable />
          <Column field="autenticacao" header="Veterinário" editor={textEditor} sortable />
          <Column field="receita" header="Receita" editor={textEditor} sortable />
          <Column field="diagnostico" header="Diagnóstico" editor={textEditor} sortable />
          <Column field="nomedoanimal" header="Nome do Animal" editor={textEditor} sortable />
          <Column rowEditor header="" bodyStyle={{ textAlign: "center" }} />
          <Column body={deleteButtonTemplate} header="" bodyStyle={{ textAlign: "center" }} />
        </DataTable>
      </div>
      <Button  
        text raised
        onClick={() => setIsModalOpen(true)}
        className="!bg-[color:#e3b963] hover:!bg-[color:#c49d54] !font-bold !text-white p-2 rounded w-full items-center justify-center"
      >
        Adicionar Veterinário
      </Button>

      <VeterinarioModal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false); fetchVeterinarios();}} />
      <ConfirmDialog />
    </div>
  );
};

export default ListVeterinarios;
