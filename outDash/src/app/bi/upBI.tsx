"use client";
import React, { useState } from "react";
import Toast from "../components/toasts";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { NumericFormat } from "react-number-format";
import "./calendar.css";
import { authFetch } from "../utils/authFetch";

interface FormData {
  nome: string;
  valor: string;
  time: string;
  tipo: "ENTRADA" | "DESPESA";
}

interface LancamentoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const toIsoWithSecondsLocal = (date: Date): string => {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

const LancamentoModal: React.FC<LancamentoModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    valor: "",
    time: toIsoWithSecondsLocal(new Date()),
    tipo: "ENTRADA",
  });

  const [toast, setToast] = useState<"success" | "warning" | "error" | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePostRequest = async () => {
    const { nome, valor, time, tipo } = formData;

    if (!nome || !valor || !time || !tipo) {
      setToast("warning");
      return;
    }

    try {
      const payload = {
        nome,
        valor: Number(valor),
        time,
        tipo,
      };

      console.log("Sending payload:", JSON.stringify(payload));

      const response = await authFetch(`http://168.231.88.35:8080/valor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Erro ao registrar lançamento.");

      setToast("success");
      setFormData({ nome: "", valor: "", time: toIsoWithSecondsLocal(new Date()), tipo: "ENTRADA" });

      setTimeout(() => {
        setToast(null);
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Erro:", error);
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
              <Toast key="success" type="success" message="Lançamento registrado com sucesso." />
            )}
            {toast === "error" && (
              <Toast key="error" type="error" message="Erro ao registrar lançamento." />
            )}
            {toast === "warning" && (
              <Toast key="warning" type="warning" message="Preencha todos os campos antes de enviar." />
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-700">Registrar Lançamento</h1>
          <button onClick={onClose} className="hover:!bg-[color:#bdbdbd] !text-[color:#4a312a] hover:!text-black-800 text-2xl w-8 h-8 rounded">
            &times;
          </button>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            name="nome"
            placeholder="Descrição"
            value={formData.nome}
            onChange={handleChange}
            className="w-full p-2 border rounded text-gray-500"
          />

          <NumericFormat
            name="valor"
            value={formData.valor}
            onValueChange={(values) => {
              const { value } = values;
              setFormData((prev) => ({ ...prev, valor: value }));
            }}
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            allowNegative={false}
            className="w-full p-2 border rounded text-gray-500"
            placeholder="R$"
          />

          <Calendar
            value={new Date(formData.time)}
            onChange={(e) => {
              const date = e.value;
              if (date instanceof Date && !isNaN(date.getTime())) {
                setFormData((prev) => ({
                  ...prev,
                  time: toIsoWithSecondsLocal(date),
                }));
              }
            }}
            showTime
            hourFormat="24"
            showIcon
            hideOnDateTimeSelect
            className="custom-calendar w-full"
            dateFormat="dd/mm/yy"
            placeholder="Data e Hora"
          />

          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            className="w-full p-2 border rounded text-gray-500"
          >
            <option value="ENTRADA">Entrada</option>
            <option value="DESPESA">Despesa</option>
          </select>

          <Button
            raised
            className="!bg-[color:#e3b963] hover:!bg-[color:#c49d54] !font-bold !text-white p-2 rounded w-full items-center justify-center"
            onClick={handlePostRequest}
          >
            Registrar Lançamento
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default LancamentoModal;

