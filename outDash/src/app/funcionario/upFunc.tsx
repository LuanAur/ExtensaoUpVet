"use client";
import React, { useState } from "react";
import Toast from "../components/toasts";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "primereact/button";
import { NumericFormat } from 'react-number-format';
import { authFetch } from "../utils/authFetch";

interface FormData {
  nome: string;
  autenticacao: string;
  cargo: string;
  salario: string;
}

interface FuncionarioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FuncionarioModal: React.FC<FuncionarioModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    autenticacao: "",
    cargo: "",
    salario: "",
  });

  const [toast, setToast] = useState<"success" | "warning" | "error" | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePostRequestFuncionario = async () => {
    const { nome, autenticacao, cargo, salario } = formData;

    if (!nome || !autenticacao || !cargo || !salario) {
      setToast("warning");
      return;
    }

    try {
      const response = await authFetch("http://168.231.88.35:8080/funcionario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, salario: Number(salario) }),
      });
      //TOKEN EXPIRE
      if(response.status == 401){
        window.location.replace('http://168.231.88.35:8080/aut/login');
      }
      if (!response.ok) throw new Error("Erro ao cadastrar funcionário.");

      const result = await response.json();
      console.log("Success:", result);

      setToast("success");
      setFormData({ nome: "", autenticacao: "", cargo: "", salario: "" });

    } catch (error) {
      console.error("Error:", error);
      setToast("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
      >
        {/* Toasts */}
        <div className="fixed top-4 right-4 z-[9999] space-y-2">
          <AnimatePresence>
            {toast === "success" && (
              <Toast key="success" type="success" message="Funcionário registrado com sucesso." />
            )}
            {toast === "error" && (
              <Toast key="error" type="error" message="Erro ao registrar funcionário." />
            )}
            {toast === "warning" && (
              <Toast key="warning" type="warning" message="Preencha todos os campos antes de enviar." />
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-700">Registrar Funcionário</h1>
          <button onClick={onClose} className="hover:!bg-[color:#bdbdbd] !text-[color:#4a312a] hover:!text-black-800 text-2xl w-8 h-8 rounded">&times;</button>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            className="w-full p-2 border rounded text-gray-500"
          />
          <input
            type="text"
            name="autenticacao"
            placeholder="Autenticação"
            value={formData.autenticacao}
            onChange={handleChange}
            className="w-full p-2 border rounded text-gray-500"
          />
          <input
            type="text"
            name="cargo"
            placeholder="Cargo"
            value={formData.cargo}
            onChange={handleChange}
            className="w-full p-2 border rounded text-gray-500"
          />
          <NumericFormat
            name="salario"
            value={formData.salario}
            onValueChange={(values) => {
              const { value } = values;
              setFormData(prev => ({ ...prev, salario: value }));
            }}
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$"
            allowNegative={false}
            className="w-full p-2 border rounded text-gray-500"
            placeholder="Salário"
          />
          <Button
            text raised
            className="!bg-[color:#e3b963] hover:!bg-[color:#c49d54] !font-bold !text-white p-2 rounded w-full items-center justify-center"
            onClick={handlePostRequestFuncionario}
          >
            Registrar Funcionário
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default FuncionarioModal;
