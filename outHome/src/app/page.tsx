"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import Footer from "./components/footer"; 

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;
const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

const images = [
  "/res/1.png",
  "/res/ecohorse.png",
];

export default function HomePage() {
  const [imgIndex, setImgIndex] = useState(0);
  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();
      if (x === 0) {
        setImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, []);

  const onDragEnd = () => {
    const x = dragX.get();
    if (x <= -DRAG_BUFFER) {
      setImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    } else if (x >= DRAG_BUFFER) {
      setImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  return (
  <div className="flex flex-col ">
    <div className="relative  flex flex-col">
      {/* Topbar */}
      <header className="absolute top-0 left-0 w-full z-10 px-6 py-4 flex justify-between items-center  ">
        <div className=" font-bold text-teal-900"><img src="/res/30.png" alt="Logo" className="h-20"/></div>
        <nav className="space-x-6 text-sm font-medium text-teal-900">
          <a href="#" className="hover:underline">Início</a>
          <a href="#" className="hover:underline">Agenda</a>
          <a href="#" className="hover:underline">Laserterapia</a>
          <a href="#" className="hover:underline">Quem Somos</a>
          <a href="#" className="hover:underline">Contato</a>
        </nav>
      </header>

      {/* Carousel */}
      <div className="relative overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{ x: dragX }}
          animate={{ translateX: `-${imgIndex * 100}%` }}
          transition={SPRING_OPTIONS}
          onDragEnd={onDragEnd}
          className="flex min-h-180 max-height-screen cursor-grab active:cursor-grabbing"
        >          {/* Tamanho do carrousel /\*/}
          {images.map((imgSrc, idx) => (
            <motion.div
              key={idx}
              className="relative max-h-3/5 min-w-screen shrink-0 overflow-hidden"
              style={{
                backgroundImage: `url(${imgSrc})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
              transition={SPRING_OPTIONS}
            >
              {imgIndex === idx && (
                <div className="relative top-1/2 left-1/4 transform -translate-y-1/2 space-y-4 bg-teal-900/60 p-8 text-white max-w-md max-h-3/5">
                  <h2 className="text-3xl font-extrabold">Nossa Missão</h2>
                  <h3 className="text-2xl font-bold text-yellow-400">TESTES</h3>
                  <p>A UpVet em parceria com a EcoVet busca prover assistencia veterinária para animais de rua.</p>
                  <button className="bg-yellow-400 text-teal-900 font-bold px-4 py-2 rounded hover:bg-yellow-300 transition">
                    CONHEÇA O PROJETO
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Ponteiros */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setImgIndex(index)}
              className={`w-2 h-2 rounded-full border-2 ${
                imgIndex === index
                  ? "bg-yellow-400 border-yellow-400"
                  : "bg-white/50 border-white"
              } transition`}
            />
          ))}
        </div>
      </div>
            <section className="w-full bg-[#f8f8f8] py-16 px-8 flex flex-col md:flex-row items-center justify-center gap-12 bg-[url('/res/ecodevice.png')] bg-cover ">
            
            {/* Left: Text Content */}
            <div className="md:w-2/5 translate-x-[-35%] ">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Sobre a ECO Vet</h2>
              <div className="w-16 h-1 bg-yellow-400 mb-6"></div>
              <p className="text-gray-800 text-lg text-light-gray leading-relaxed text-justify mb-8">
              A ECO Vet fabrica e desenvolve equipamentos de terapia, atendendo a todas especialidades veterinárias,
              portes e espécies de animais.
              Nossa preocupação é atender com excelência as necessidades dos nossos clientes, oferecendo o que há de
              mais eficaz e inovador para as diversas áreas da saúde animal.
              </p>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-8 rounded-full transition duration-300">
                Ver mais
              </button>
            </div>

          </section>
    </div>
      {/* Rodapé */}
      <footer className="mt-auto">
        <Footer />
      </footer>
  </div>
  );
}

