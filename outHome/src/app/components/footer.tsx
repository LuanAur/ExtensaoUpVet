"use client";
import Image from "next/image";
import React from "react";
import { FaInstagram, FaFacebookF, FaYoutube, FaWhatsapp, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-none lg:bg-[url('/res/cat.png')] lg:bg-contain lg:bg-no-repeat bg-[#f8f8f8] text-[#452d23] pt-10">

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center sm:text-left">
        {/* ONG Logo + Description */}
        <div className="flex flex-col items-center sm:items-start">
          <Image src="/res/logo_m.png" alt="Logo UpVet" width={250} height={100} />
          <p className="mt-4 text-sm"></p>
        </div>

        {/* Contato */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Contato</h2>
          <div className="h-1 w-10 bg-yellow-500 mb-4 mx-auto sm:mx-0" />
          <div className="flex items-start gap-2 mb-2 justify-center sm:justify-start">
            <FaMapMarkerAlt className="mt-1" />
            <p className="text-sm">Rua Monsenhor Cerqueira n° 1 Loja 05 - Centro - MG, 35550-970</p>
          </div>
          <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
            <FaWhatsapp />
            <p className="text-sm">(37) 999982345</p>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <FaEnvelope />
            <p className="text-sm">spaioscitapecericamg@gmail.com</p>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <div className="fixed bottom-5 right-5 z-50">
        <a href="https://wa.me/5537999982345" target="_blank" rel="noopener noreferrer">
          <div className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600">
            <FaWhatsapp size={24} />
          </div>
        </a>
      </div>

      {/* Copyright */}
      <div style={{ backgroundColor: '#ca9b3e' }} className="text-center text-[#452d23] text-sm py-4 mt-10">
        Copyright © 2025 - Sociedade Protetora Dos Animais De Itapecerica - ONG SPAI VET. Todos os direitos reservados.
      </div>
    </footer>
  );
}

        {/* Redes sociais 
        <div>
          <h2 className="text-xl font-semibold mb-2">Siga nas redes</h2>
          <div className="h-1 w-10 bg-yellow-500 mb-4" />
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-gray-900 rounded hover:bg-gray-700"><FaInstagram /></a>
            <a href="#" className="p-2 bg-gray-900 rounded hover:bg-gray-700"><FaFacebookF /></a>
            <a href="#" className="p-2 bg-gray-900 rounded hover:bg-gray-700"><FaYoutube /></a>
          </div>
        </div>*/}


      {/* Imagem 
      <div className="absolute right-4 bottom-20 hidden lg:block">
        <Image src="/dog-doctor.png" alt="Imagem vai aqui!!" width={300} height={300} />
      </div>*/}