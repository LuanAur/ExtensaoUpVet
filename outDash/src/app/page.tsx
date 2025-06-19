"use client";

import 'primereact/resources/themes/lara-light-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import React, { useEffect, useState, Suspense, lazy } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Sidebar from "./components/sidebar";
import { Helix } from "ldrs/react";


const VoluntarioList = lazy(() => import("./voluntario/downVolun"));
const FuncionarioList = lazy(() => import("./funcionario/downFunc"));
const VeterinarioList = lazy(() => import("./veterinario/downVete"));
const BIList = lazy(() => import("./bi/downBI"));

export default function Home() {
  const [activePage, setActivePage] = useState("Page 1");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-200">
      {/* Header Mobile */}
      <div className="md:hidden flex items-center justify-between bg-white p-4 shadow">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-700">
          ☰
        </button>
        <Image src="/30.png" alt="Logo" width={60} height={64} className="h-8 w-auto" />
      </div>

      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen w-full">
              <Helix size="150" speed="2.5" color="Brown" />
            </div>
          }
        >
          {activePage === "listar-voluntarios" && <VoluntarioList />}
          {activePage === "listar-funcionarios" && <FuncionarioList />}
          {activePage === "listar-veterinarios" && <VeterinarioList />}
          {activePage === "listar-BI" && <BIList />}
        </Suspense>
      </div>
    </div>
  );
}

