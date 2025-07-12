"use client";
import Footer from "./components/footer";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'

const images = [
  {
    src: "/res/ecohorse.png",
    title: "EcoVet",
    subtitle: "Tecnlogia de Ponta!",
    text: "A SPAI VET em parceria com a EcoVet busca proverssssss assistência veterinária para animais de rua.",
    button: "CONHEÇA",
  },
  {
    src: "/res/ecodevice.png",
    title: "GDSSS",
    subtitle: "VSDFS",
    text: "LDFSDFSDF.",
    button: "SAIBA MAIS",
  },
];

const images2 = [
  {
    src: "/res/laserterapia.jpeg",
    title: "Laserterapia para Aves",
    subtitle: "Tratamento avançado e seguro",
    text: "A laserterapia é eficaz no alívio de dores e aceleração da recuperação.",
    button: "saiba mais",
  },
  {
    src: "/res/laserterapia_aves.jpeg",
    title: "Laserterapia para Aves",
    subtitle: "Tratamento avançado e seguro",
    text: "A laserterapia é eficaz no alívio de dores e aceleração da recuperação de aves.",
    button: "Saiba mais",
  },
  {
    src: "/res/displasia.jpg",
    title: "Tratamento para Displasia",
    subtitle: "Alívio e Recuperação para seu Pet",
    text: "A displasia é uma condição comum em muitas raças de cães e pode causar dor intensa e dificuldades de movimento."+
     "O tratamento adequado pode melhorar a qualidade de vida do seu animal, reduzindo a dor e ajudando na recuperação. A "+
     "laserterapia, aliada a cuidados médicos, pode ser uma excelente opção para aliviar a inflamação, promover a regeneração"+ 
     "celular e acelerar a recuperação, proporcionando maior conforto e mobilidade para seu pet.",
    button: "Saiba mais",
  }
  
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





  return (
    <div className="flex flex-col bg-[#fcda97] min-h-screen">
      {/* Topbar */}
      <header
        className="w-full z-20 px-4 py-3 flex items-center justify-between
        md:absolute md:top-0 md:left-0 md:bg-white/5 
        fixed top-0 left-0 bg-[#fcda97] shadow-md md:shadow-none"
      >
        {/* Logo */}
        <div className="font-bold text-[#452d24]">
          <img src="/res/logo_s.png" alt="Logo" className="h-16 md:h-20" />
        </div>

        {/* Navegação desktop */}
        <nav className="hidden md:flex space-x-4 text-sm font-medium text-teal-900">
          <a href="#inicio" className="hover:underline">Início</a>
          <a href="#laser" className="hover:underline">Laserterapia</a>
          <a href="#contato" className="hover:underline">Contato</a>
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
                  { href: "#laser", label: "Laserterapia" },
                  { href: "#contato", label: "Contato" },
                ].map(({ href, label }) => (
                  <MenuItem key={href}>
                    {({ active }) => (
                      <a
                        href={href}
                        className={`block px-4 py-2 text-sm ${active ? "bg-teal-100 text-teal-900" : "text-gray-700"
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
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center md:justify-start md:pl-20 p-6">
                <div className="bg-teal-900/70 text-white p-6 rounded-lg max-w-md w-full text-center md:text-left space-y-4">
                  <h2 className="text-2xl md:text-3xl font-extrabold">{img.title}</h2>
                  <h3 className="text-xl md:text-2xl font-bold text-yellow-400">{img.subtitle}</h3>
                  <p className="text-sm md:text-base">{img.text}</p>
                  <button className="bg-yellow-400 text-teal-900 font-bold px-4 py-2 rounded hover:bg-yellow-300 transition">
                    {img.button}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Nossa Estrutura */}
      <section
        id="estrutura"
        className="w-full bg-[#f8f8f8] py-16 px-4 flex flex-col lg:flex-row items-center justify-center gap-8 bg-[url('/res/ecodevice.png')] bg-cover"
      >
        <div className="w-full lg:w-2/5 px-4 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tratamento com ILIB – Terapia a Laser de Baixa Intensidade</h2>
          <p className="text-gray-900 font-bold text-xl leading-relaxed text-justify mb-8 ">
            Benefícios da ILIB
            <br /><br />
          </p>

          { /* Conteudo separado por paragrafo sobre tratamento laser */}
          <div className="flex flex-col lg:flex-row items-start justify-start text-gray-800 text-base leading-relaxed text-justify mb-8">
            <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"></p>
            <p className="mb-6">
              A ILIB (Irradiação Intravascular com Laser) promove a regeneração celular, combate o estresse oxidativo,
              melhora a circulação sanguínea e tem efeito anti-inflamatório. Além disso, acelera a cicatrização, alivia
              dores crônicas e fortalece o sistema imunológico. É eficaz no pós-operatório e melhora o bem-estar geral,
              promovendo relaxamento e reduzindo o estresse.
            </p>

            
          </div>
        </div>
      </section>

      <section id="cirurgias" className="w-full py-16 px-4 bg-[#f8f8f8]">
        <div className="max-w-4xl mx-auto text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Centro Cirúrgico de Qualidade e Segurança
          </h2>
          <div className="w-16 h-1 bg-yellow-400 mb-6 mx-auto lg:mx-0"></div>
          <p className="text-gray-800 text-lg leading-relaxed mb-6">
            Nosso centro cirúrgico é equipado com o que há de mais moderno na medicina veterinária. Isso significa mais segurança para o seu animalzinho. Nossa equipe é formada por médicos veterinários competentes. Quando o seu melhor amigo é operado aqui, o procedimento é realizado com qualidade, segurança e de forma acessível.
          </p>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Oque Oferecemos</h2>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mb-6"></div>

            <Carousel
              responsive={responsive}
              autoPlay
              autoPlaySpeed={3000}
              infinite
              swipeable
              draggable
              arrows={false}
              renderDotsOutside={true}
              containerClass="carousel-container"
              dotListClass="custom-dot-list-style"
            >
              {images2.map((img, idx) => (
                <div key={idx} className="relative w-full h-[100vh] md:h-[100vh]">
                  <img
                    src={img.src}
                    alt={img.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center md:justify-start md:pl-20 p-6">
                    <div className="text-white p-6 rounded-lg max-w-md w-full text-center md:text-left space-y-4">
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>


        </div>
      </section>






      {/* Colaboradores */}
      <section className="w-full bg-[#f8f8f8] py-16 px-4 flex flex-col items-center justify-center gap-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Resultados</h2>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mb-6"></div>
        </div>
        <div className="flex flex-col  flex-wrap items-center justify-center gap-8 w-full">
          <div className="w-full sm:w-[45%] max-w-[900px] max-h-[900px] flex justify-center">
            <img
              src="/res/resultados.png"
              alt="Logo Rádio"

            />
          </div>

          <div className="w-full sm:w-[45%] max-w-[900px] max-h-[900px] flex justify-center">
            <img
              src="/res/resultados2.png"
              alt="Logo Rádio"
            />
          </div>

        </div>
      </section>

      {/*Vacina*/}
      <section id="vacina" className="w-full bg-[#f8f8f8] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Cuidados com o seu animal</h2>
        </div>
        <div className="max-w-4xl mx-auto text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Vacinação
          </h2>
          <div className="w-16 h-1 bg-yellow-400 mb-6 mx-auto lg:mx-0"></div>
          <p className="text-gray-800 text-lg leading-relaxed mb-6">
            A vacinação é um gesto de amor e responsabilidade. Ao vacinar seu pet, você está protegendo
            sua saúde e garantindo que ele viva uma vida longa e saudável. As vacinas ajudam a prevenir
            doenças graves, mantendo seu animalzinho seguro e com a energia para brincar e aproveitar a vida.
            Não deixe de proteger quem está sempre ao seu lado!.
          </p>
          {/* Inserir imagem de vacinação */}
          <img src="/res/vacinacao.jpeg" alt="Vacinação e Saúde Bucal" className="w-full h-auto rounded-lg shadow-md" />
        </div>


        <div className="max-w-4xl mx-auto text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Saude Bucal
          </h2>
          <div className="w-16 h-1 bg-yellow-400 mb-6 mx-auto lg:mx-0"></div>
          <p className="text-gray-800 text-lg leading-relaxed mb-6">
            A saúde bucal do seu pet é essencial para o seu bem-estar geral. Assim como os seres humanos, 
            os animais também podem sofrer de doenças dentárias, como o tártaro, gengivite e até perda de dentes. 
            A falta de cuidados pode levar a complicações mais graves, como infecções e problemas no coração, fígado e rins. 
            Manter a higiene bucal do seu animalzinho é uma forma de garantir uma vida longa e saudável para ele.
          </p>
          {/* Inserir imagem de Saude Bucal */}
          <img src="/res/saude_bucal.jpeg" alt="Vacinação e Saúde Bucal" className="w-full h-auto rounded-lg shadow-md" />
        </div>

      </section>

      {/* Rodapé */}
      <footer id="contato" className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
