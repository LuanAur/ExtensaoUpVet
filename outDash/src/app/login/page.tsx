"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";

export default function LoginPage() {
  const [login, setlogin] = useState("");
  const [password, setpassword] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://168.231.88.35:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      if (!res.ok) {
        throw new Error("Login falhou");
      }

      

      const data = await res.json();
      localStorage.setItem("token", data.token); 
      localStorage.setItem("role", data.role);

      router.push("/"); 
    } catch (error) {
      console.error(error);
      setErro("Usuário ou password inválidos.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-3 ">
        <h1 className="text-xl font-bold text-gray-700">Login</h1>
        {erro && <p className="text-red-500 mb-2">{erro}</p>}
        <input
          type="login"
          placeholder="Login"
          className="w-full p-2 border rounded text-gray-500"
          value={login}
          onChange={(e) => setlogin(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 border rounded text-gray-500"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <Button
          raised
          className="!bg-[color:#e3b963] hover:!bg-[color:#c49d54] !font-bold !text-white p-2 rounded w-full items-center justify-center"
          onClick={handleLogin}
        >
          Entrar
        </Button>
      </div>
    </div>
  );
}
