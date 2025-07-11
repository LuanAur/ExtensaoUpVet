"use client";
import Image from "next/image";
import React from "react";
import { FaInstagram, FaFacebookF, FaYoutube, FaWhatsapp, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#4dbcaa' }} className="bg-upgreen text-white pt-10 relative">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* ONG Logo + Description */}
        <div>
          <Image src="/res/30.png" alt="Logo UpVet" width={150} height={60} />
          <p className="mt-4 text-sm">
            
          </p>
        </div>

        {/* Contato */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Contato</h2>
          <div className="h-1 w-10 bg-yellow-500 mb-4" />
          <div className="flex items-start gap-2 mb-2">
            <FaMapMarkerAlt className="mt-1" />
            <p className="text-sm">Rua Monsenhor Cerqueira n° 1 Loja 05 - Centro, ????? - MG, 36010-081(Cep!!)</p>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <FaWhatsapp />
            <p className="text-sm">(37) ???????</p>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope />
            <p className="text-sm">sememail@precisoemail.com</p>
          </div>
        </div>

        {/* Redes sociais */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Siga nas redes</h2>
          <div className="h-1 w-10 bg-yellow-500 mb-4" />
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-gray-900 rounded hover:bg-gray-700"><FaInstagram /></a>
            <a href="#" className="p-2 bg-gray-900 rounded hover:bg-gray-700"><FaFacebookF /></a>
            <a href="#" className="p-2 bg-gray-900 rounded hover:bg-gray-700"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Imagem 
      <div className="absolute right-4 bottom-20 hidden lg:block">
        <Image src="/dog-doctor.png" alt="Imagem vai aqui!!" width={300} height={300} />
      </div>*/}

      {/* WhatsApp Button */}
      <div className="fixed bottom-5 right-5 z-50">
        <a href="https://wa.me/5532998493789" target="_blank" rel="noopener noreferrer">
          <div className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600">
            <FaWhatsapp size={24} />
          </div>
        </a>
      </div>

      {/* Copyright */}
      <div style={{ backgroundColor: '#f39719' }} className=" text-center text-sm text-teal-900 py-4 mt-10">
        Copyright © 2068 - Ajuda Aliança Juiz Forana Pela Defesa dos Animais - ONG UpVet. Todos os direitos reservados.<br />
        Desenvolvido para extensão.
      </div>
    </footer>
  );
}
