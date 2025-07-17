"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { authFetch } from "../utils/authFetch";
import 'primereact/resources/themes/lara-light-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface Funcionario {
  id: number;
  nome: string;
}

export default function RegisterPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [selectedFuncionario, setSelectedFuncionario] = useState<Funcionario | null>(null);
  const [erro, setErro] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const res = await authFetch("http://168.231.88.35:8080/funcionario");
        const data = await res.json();
        setFuncionarios(data);
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
        setErro("Erro ao carregar funcionários.");
      }
    };

    fetchFuncionarios();
  }, []);

  const handleRegister = async () => {
    if (!selectedFuncionario) {
      setErro("Selecione um funcionário.");
      return;
    }

    try {
      const res = await fetch("http://168.231.88.35:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login,
          password,
          idFuncionario: selectedFuncionario.id,
        }),
      });

      if (!res.ok) {
        throw new Error("Registro falhou");
      }

      router.push("/login");
    } catch (error) {
      console.error(error);
      setErro("Erro ao registrar. Tente novamente.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-3">
        <h1 className="text-xl font-bold text-gray-700">Registrar</h1>
        {erro && <p className="text-red-500 mb-2">{erro}</p>}
        <Dropdown
          value={selectedFuncionario}
          options={funcionarios}
          onChange={(e) => setSelectedFuncionario(e.value)}
          optionLabel="nome"
          placeholder="Selecione o funcionário"
          className="w-full"
        />
        <input
          type="text"
          placeholder="Login"
          className="w-full p-2 border rounded text-gray-500"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 border rounded text-gray-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          raised
          className="!bg-[color:#e3b963] hover:!bg-[color:#c49d54] !font-bold !text-white p-2 rounded w-full justify-center"
          onClick={handleRegister}
        >
          Registrar
        </Button>
      </div>
    </div>
  );
}
