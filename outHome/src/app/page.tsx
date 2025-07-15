"use client";
import Footer from "./components/footer";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Menu, MenuButton, MenuItems, MenuItem, Button } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { useRouter } from "next/navigation";

const images = [
  {
    src: "/res/slide1.png",
    title: "SPAI VET",
    subtitle: "Clínica Veterinária",
    text: "Buscamos ajudar todos os animais de Itapecerica!",
    button: "FALE CONOSCO",
    link: "#contato", 
  },
  {
    src: "/res/ecohorse.png",
    title: "ECCOVet",
    subtitle: "Tecnlogia de Ponta!",
    text: "A SPAI VET utiliza tecnologia da ECCOVet para prover assistência veterinária.",
    button: "CONHEÇA",
    link: "#ecovet", 
  },
];


const responsive = {
  all: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  },
  superLargeDesktop: { breakpoint: { max: 4000, min: 1280 }, items: 1 },
  desktop: { breakpoint: { max: 1280, min: 768 }, items: 1 },
  tablet: { breakpoint: { max: 768, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

export default function HomePage() {
  const router = useRouter();
  return (
    <div className="flex flex-col bg-[#fcda97] min-h-screen">
      {/* Topbar */}
      <header
        className="w-full z-20 px-4 py-3 flex items-center justify-between
        md:absolute md:top-0 md:left-0 md:bg-white/1 
        fixed top-0 left-0 bg-[#fcda97] shadow-md md:shadow-none"
      >
        {/* Logo */}
        <div className="font-bold text-[#452d24] pl-0 md:pl-40">
          <img src="/res/logo_s.png" alt="Logo" className="h-16 md:h-20" />
        </div>

        {/* Navegação desktop */}
        <nav className="hidden md:flex space-x-4 text-sm font-big text-[#452d23] text pr-40">
          <a href="#inicio" className="hover:underline">INÍCIO</a>
          <a href="#vet" className="hover:underline">VETERINÁRIOS</a>
          <a href="#ecovet" className="hover:underline">ECCOVET</a>
          <a href="#contato" className="hover:underline">CONTATO</a>
        </nav>

        {/* Menu suspenso mobile */}
          <div className="md:hidden relative z-50">
            <Menu>
              <MenuButton className="inline-flex justify-center items-center gap-2 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500">
                <Bars3Icon className="h-5 w-5 text-gray-500" aria-hidden="true" />
              </MenuButton>

              <MenuItems className="absolute right-0 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="py-1">
                  {[
                    { href: "#inicio", label: "Início" },
                    { href: "#vet", label: "Veterinários" },
                    { href: "#ecovet", label: "Laserterapia" },
                    { href: "#contato", label: "Contato" },
                  ].map(({ href, label }) => (
                    <MenuItem key={href}>
                      {({ active }) => (
                        <a
                          href={href}
                          className={`block px-4 py-2 text-sm ${
                            active ? "bg-teal-100 text-teal-900" : "text-gray-700"
                          }`}
                        >
                          {label}
                        </a>
                      )}
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>
          </div>
      </header>

      {/* Carousel */}
      <section id="inicio" className="w-full h-screen max-h-[85vh] pt-20 md:pt-0">
        <Carousel
          responsive={responsive}
          autoPlay
          autoPlaySpeed={10000}
          infinite
          swipeable
          draggable
          arrows={false}
          renderDotsOutside={true}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
        >
          {images.map((img, idx) => (
            <div key={idx} className="relative w-full h-[80vh] md:h-[85vh]">
              <img
                  src={img.src}
                  alt={img.title}
                  className="absolute inset-0 w-full h-full object-cover md:object-cover object-[80%_center]"
                />
              <div className="absolute inset-0 flex items-center justify-center md:justify-start md:pl-20 p-6">
                <div className="bg-[#712211]/70 text-white p-6 rounded-lg max-w-md w-full text-center md:text-left space-y-4">
                  <h2 className="text-2xl md:text-3xl font-extrabold">{img.title}</h2>
                  <h3 className="text-xl md:text-2xl font-bold text-yellow-400">{img.subtitle}</h3>
                  <p className="text-sm md:text-base">{img.text}</p>
                  <a
                      href={img.link}
                      className="inline-block bg-yellow-400 text-teal-900 font-bold px-4 py-2 rounded hover:bg-yellow-300 transition"
                    >
                      {img.button}
                    </a>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>
        {/* Veterinários */}
        <section id="vet" className="w-full bg-[#f8f8f8] py-16 px-4 flex flex-col items-center justify-center gap-12 ">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Veterinários</h2>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mb-6"></div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-4xl">
            <div className="w-full md:w-1/3 flex justify-center">
              <img
                src="/res/vet2.png"
                alt="Maria Luiza"
                className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-lg"
              />
            </div>
            <div className="w-full md:w-2/3">
            <h2 className="text-3xl md:text-2xl font-bold text-gray-900 mb-4"> Maria Luiza</h2>
              <p className="text-gray-800 text-base leading-relaxed text-justify">
               Graduada em Medicina Veterinária há 7 anos. Especializando-se em Oncologia Veterinária e 
               atuando com terapias complementares, como fototerapia e laserterapia.
              </p>
            </div>
          </div>

           <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-4xl">
            <div className="w-full md:w-1/3 flex justify-center">
              <img
                src="/res/Vet3.png"
                alt="Daniel Cunha"
                className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-lg"
              />
            </div>
            <div className="w-full md:w-2/3">
            <h2 className="text-3xl md:text-2xl font-bold text-gray-900 mb-4"> Daniel Cunha</h2>
              <p className="text-gray-800 text-base leading-relaxed text-justify">
               Formado em Medicina Veterinária, com sólida experiência em Cirurgia Geral Veterinária. 
               Atua com foco em procedimentos seguros, eficazes e no bem-estar dos animais, garantindo 
               conforto e qualidade em todas as etapas do atendimento.
              </p>
            </div>
          </div>


           <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-4xl">
            <div className="w-full md:w-1/3 flex justify-center">
              <img
                src="/res/vet1.png"
                alt="Isabela Sader"
                className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-lg"
              />
            </div>
            <div className="w-full md:w-2/3">
            <h2 className="text-3xl md:text-2xl font-bold text-gray-900 mb-4">Isabela Sader</h2>
              <p className="text-gray-800 text-base leading-relaxed text-justify">
                Graduada em Medicina veterinária, pela UNIFOR-MG.
                Pós graduanda em Fisiatria veterinária, pelo Instituto Equilibrium.
              </p>
            </div>
          </div>
        </section>

      {/* Nossa Estrutura */}
      <section
        id="estrutura"
        className="w-full bg-[#f8f8f8] py-16 px-4 flex flex-col lg:flex-row items-center justify-center gap-8 bg-[url('/res/attempt2.png')] bg-cover"
      >
        <div className="w-full lg:w-2/5 px-4 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nossa Estrutura</h2>
          <div className="w-16 h-1 bg-yellow-400 mb-6 mx-auto lg:mx-0"></div>
          <p className="text-gray-800 text-base leading-relaxed text-justify mb-8">
            Nosso consultório foi construído seguindo as normas do CRMV e da Anvisa.
            <br /><br />
            O centro cirúrgico é equipado com o que há de mais moderno na medicina veterinária.
            Isso significa mais segurança para o seu animalzinho.
            Nossa equipe é formada por médicos veterinários competentes.
            Quando o seu melhor amigo é operado aqui o procedimento é realizado com qualidade e segurança de forma acessível.
          </p>{/* 
          <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-8 rounded-full transition duration-300">
            Ver mais
          </button>*/}
        </div>
      </section>

      {/* Colaboradores */}
      <section className="w-full bg-[#f8f8f8] py-16 px-4 flex flex-col items-center justify-center gap-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Colaboradores</h2>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mb-6"></div>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-8 w-full">
          <a href="https://www.mpmg.mp.br/portal/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-[45%] max-w-[300px] flex justify-center">
            <img
              src="/res/logompmg.png"
              alt="Logo MPMG"
              className="w-full h-auto object-contain transition-transform duration-200 hover:scale-105"
            />
          </a>
           <a href="https://www.instagram.com/supermercadofariaoficial/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-[45%] max-w-[300px] flex justify-center">
            <img
              src="/res/fariaLogo.png"
              alt="supermercado faria"
              className="w-full h-auto object-contain transition-transform duration-200 hover:scale-105"
            />
          </a>
          <a href="https://itapecerica.mg.gov.br/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-[45%] max-w-[190px] flex justify-center">
            <img
              src="/res/itapecericaLogo.png"
              alt="prefeitura itapecerica"
              className="w-full h-auto object-contain transition-transform duration-200 hover:scale-105"
            />
          </a>
           <a href="https://www.laboratoriocentral.com.br/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-[45%] max-w-[190px] flex justify-center">
            <img
              src="/res/laboratorioLogo.png"
              alt="laboratorio central"
              className="w-full h-auto object-contain transition-transform duration-200 hover:scale-105"
            />
          </a>
           <a href="https://www.laboratoriocentral.com.br/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-[45%] max-w-[190px] flex justify-center">
            <img
              src="/res/quatree.png"
              alt="quatree"
              className="w-full h-auto object-contain transition-transform duration-200 hover:scale-105"
            />
          </a>
        </div>
      </section>
      {/* Laserterapia*/}
      <section
        id="ecovet"
        className="w-full bg-[#f8f8f8] py-16 px-4 flex flex-col lg:flex-row items-center justify-center gap-8 bg-[url('/res/ecodevice.png')] bg-cover bg-[65%_center]"
      >
        <div className="w-full lg:w-2/5 px-4 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">A ECCO Vet</h2>
          <div className="w-16 h-1 bg-yellow-400 mb-6 mx-auto lg:mx-0"></div>
          <p className="text-gray-800 text-base leading-relaxed text-justify mb-8">
            A ECCO Vet fabrica e desenvolve equipamentos de terapia, atendendo a todas especialidades veterinárias,
            portes e espécies de animais.
            <br></br><br></br>
            Oferecemos diversos servíços veterinários utilizando seus produtos!
          </p>
          <Button
            onClick={() => router.push("/eccovet")} 
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-8 rounded-full transition duration-300 border-none"
            >SAIBA MAIS</Button>
        </div>
      </section>

      {/* Rodapé */}
      <footer id="contato" className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
