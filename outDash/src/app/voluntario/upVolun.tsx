"use client";
import React, { useState } from "react";
import Toast from "../components/toasts";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "primereact/button";
import { authFetch } from "../utils/authFetch";

interface FormData {
  nome: string;
  autenticacao: string;
  cargo: string;
}

interface VoluntarioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoluntarioModal: React.FC<VoluntarioModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    autenticacao: "",
    cargo: "",
  });

  const [toast, setToast] = useState<"success" | "warning" | "error" | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePostRequestVoluntario = async () => {
    const { nome, autenticacao, cargo } = formData;

    if (!nome || !autenticacao || !cargo) {
      setToast("warning");
      return;
    }

    try {
      //https://admin.spai.org.br/voluntarios
      const response = await authFetch("https://admin.spai.org.br/api/voluntarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar voluntário.");

      //TOKEN EXPIRE
      if(response.status == 403){
        window.location.replace('https://admin.spai.org.br/api/auth/login');
      }

      const result = await response.json();
      console.log("Success:", result);

      setToast("success");
      setFormData({ nome: "", autenticacao: "", cargo: "" });

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
              <Toast key="success" type="success" message="Voluntário registrado com sucesso." />
            )}
            {toast === "error" && (
              <Toast key="error" type="error" message="Erro ao registrar voluntário." />
            )}
            {toast === "warning" && (
              <Toast key="warning" type="warning" message="Preencha todos os campos antes de enviar." />
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-700">Registrar Voluntário</h1>
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
          <Button
            text raised
            className="!bg-[color:#e3b963] hover:!bg-[color:#c49d54] !font-bold !text-white p-2 rounded w-full items-center justify-center"
            onClick={handlePostRequestVoluntario}
          >
            Registrar Voluntário
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default VoluntarioModal;
