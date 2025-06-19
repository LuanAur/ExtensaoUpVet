"use client"
import React, { useEffect, useState } from "react";
import { DataTable, DataTableFilterMetaData, DataTableRowEditCompleteEvent } from "primereact/datatable";
import { Column, ColumnEditorOptions } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Helix } from "ldrs/react";
import VoluntarioModal from "../voluntario/upVolun";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { confirmDialog } from "primereact/confirmdialog";
import { ConfirmDialog } from "primereact/confirmdialog";
import { FilterMatchMode} from 'primereact/api';
import { DataTableFilterMeta } from 'primereact/datatable';
import { authFetch } from "../utils/authFetch";

interface Voluntario {
  id: number;
  nome: string;
  autenticacao: string;
  cargo: string;
}

const ListVolun: React.FC = () => {
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: {
      value: '',
      matchMode: FilterMatchMode.CONTAINS
    } as DataTableFilterMetaData
  });

  const confirmDelete = (id: number) => {
    confirmDialog({
      message: "Você tem certeza que deseja deletar este voluntário?",
      header: "Confirmação",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      acceptClassName: "p-button-danger",
      rejectClassName: "!bg-gray-600 hover:!bg-gray-700 text-black",
      accept: async () => {
        await deleteVoluntario(id);
        fetchVoluntarios(); 
      },
    });
  };


  useEffect(() => {
    fetchVoluntarios();
  }, []);

  const fetchVoluntarios = async () => {
    setLoading(true);
    try {
      const response = await authFetch("http://localhost:8080/voluntarios");
      const data = await response.json();
      setVoluntarios(data);
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
    const updatedVoluntario = e.newData as Voluntario;
    try {
      await authFetch(`http://localhost:8080/voluntarios/${updatedVoluntario.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedVoluntario),
      });

      const updatedList = [...voluntarios];
      updatedList[e.index] = updatedVoluntario;
      setVoluntarios(updatedList);
      fetchVoluntarios();
    } catch (error) {
      console.error("Erro ao atualizar voluntário:", error);
    }
  };

  const deleteVoluntario = async (id: number) => {
    try {
      await authFetch(`http://localhost:8080/voluntarios/${id}`, { method: "DELETE" });
      setVoluntarios(voluntarios.filter((v) => v.id !== id));
    } catch (error) {
      console.error("Erro ao deletar voluntário:", error);
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

  const deleteButtonTemplate = (rowData: Voluntario) => (
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

  if (loading) return <div className="flex items-center justify-center h-screen w-full"> <Helix size="150" speed="2.5" color="Brown" /> </div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-6 max-w-full space-y-4">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
        Lista de Voluntários
      </h2>

      <div className="overflow-x-auto">
        <DataTable
          filters={filters}
          globalFilterFields={['nome', 'autenticacao', 'cargo']}
          header={header}
          value={voluntarios}
          editMode="row"
          dataKey="id"
          paginator
          rows={5}
          onRowEditComplete={onRowEditComplete}
          responsiveLayout="scroll"
          stripedRows
          showGridlines
          emptyMessage="Nenhum voluntário encontrado"
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
         text raised
         onClick={() => setIsModalOpen(true)}
         className="!bg-[color:#e3b963] hover:!bg-[color:#c49d54] !font-bold !text-white p-2 rounded w-full items-center justify-center"
        >
          Adicionar Voluntário
      </Button>
      <VoluntarioModal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false); fetchVoluntarios();}} />
      <ConfirmDialog />
    </div>
  );
};

export default ListVolun;

