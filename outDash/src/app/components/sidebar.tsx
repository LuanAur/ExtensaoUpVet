"use client";
import React, { JSX } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import "../bi/calendar.css";
import 'primeicons/primeicons.css';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const icons: Record<string, JSX.Element> = {
  funcionarios: (
    <svg className="h-6 w-6" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M4 1H12V5H13.5L16 7.5V9H0V7.5L2.5 5H4V1ZM10 3V5H6V3H10Z" fill="#000000"/>
      <path d="M0 11V15H16V11H0Z" fill="#000000"/>
    </svg>
  ),
  voluntarios: (
    <svg className="h-6 w-6" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 9C9.38071 9 10.5 7.88071 10.5 6.5C10.5 5.11929 9.38071 4 8 4C6.61929 4 5.5 5.11929 5.5 6.5C5.5 7.88071 6.61929 9 8 9Z" fill="#000000"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM6 10C4.80291 10 3.76957 10.7012 3.28827 11.7152C2.48151 10.6934 2 9.40294 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 9.40294 13.5185 10.6934 12.7117 11.7152C12.2304 10.7012 11.1971 10 10 10H6Z" fill="#000000"/>
    </svg>
  ),
  veterinarios: (
    <svg className="h-6 w-6" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M16 4V7C16 9.20914 14.2091 11 12 11H10V15H0V13L0.931622 10.8706C1.25226 10.9549 1.59036 11 1.94124 11C3.74931 11 5.32536 9.76947 5.76388 8.01538L3.82359 7.53031C3.60766 8.39406 2.83158 9.00001 1.94124 9.00001C1.87789 9.00001 1.81539 8.99702 1.75385 8.99119C1.02587 8.92223 0.432187 8.45551 0.160283 7.83121C0.0791432 7.64491 0.0266588 7.44457 0.00781272 7.23658C-0.0112323 7.02639 0.00407892 6.80838 0.0588889 6.58914C0.0588882 6.58914 0.0588896 6.58913 0.0588889 6.58914L0.698705 4.02986C1.14387 2.24919 2.7438 1 4.57928 1H10L12 4H16ZM9 6C9.55229 6 10 5.55228 10 5C10 4.44772 9.55229 4 9 4C8.44771 4 8 4.44772 8 5C8 5.55228 8.44771 6 9 6Z" fill="#000000"/>
    </svg>
  ),
  bi: (
    <svg className="h-6 w-6" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.21606 15L6.10495 16H8.11726L8.22837 15H10.003C12.2105 15 14 13.2105 14 11.003C14 9.12963 12.6989 7.5076 10.8701 7.1012L9.14852 6.71864L9.45059 4H13V1H9.78393L9.89504 0H7.88273L7.77162 1H5.99699C3.78951 1 2 2.78951 2 4.99699C2 6.87037 3.30115 8.4924 5.12992 8.8988L6.85147 9.28136L6.54939 12H3V15H6.21606ZM8.5617 12H10.003C10.5536 12 11 11.5536 11 11.003C11 10.5357 10.6754 10.1311 10.2193 10.0298L8.81528 9.71776L8.5617 12ZM7.1847 6.28223L7.43828 4H5.99699C5.44637 4 5 4.44637 5 4.99699C5 5.46427 5.32455 5.86887 5.78071 5.97023L7.1847 6.28223Z" fill="#000000"/>
    </svg>
  ),
};

const menuItems = [
  {
    title: "Funcionários",
    icon: icons.funcionarios,
    page: "listar-funcionarios",
  },
  {
    title: "Voluntários",
    icon: icons.voluntarios,
    page: "listar-voluntarios",
  },
  {
    title: "Veterinários",
    icon: icons.veterinarios,
    page: "listar-veterinarios",
  },
  {
    title: "Caixa",
    icon: icons.bi,
    page: "listar-BI",
  },
];

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, isOpen, onClose }) => {
  const router = useRouter();
  return (
    
    <aside
  className={`fixed md:static top-0 left-0 z-40 h-full w-64 bg-white shadow transform transition-transform duration-300
  ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:flex flex-col`}
>
  {/* Botão de fecha, mobile */}
  <div className="flex items-center justify-between p-4 md:hidden">
    <span className="font-bold text-lg text-[#00273f]">Menu</span>
    <button onClick={onClose} className="text-gray-600">✕</button>
  </div>

  {/* Logo */}
  <div className="flex items-center justify-center mb-4 hidden md:flex">
    <Image src="/30.png" alt="Logo" width={180} height={180} />
  </div>

  {/* Main content: menu + logout */}
  <div className="flex flex-col flex-grow justify-between">
    {/* Menu Items */}
    <ul className="w-full px-4 text-gray-900">
      {menuItems.map((item) => (
        <li key={item.title} className="mb-2">
          <button
            className={`flex items-center gap-2 w-full p-2 text-left rounded hover:bg-gray-200 ${
              activePage === item.page ? "bg-gray-300 font-bold text-[color:#483229]" : "text-gray-700"
            }`}
            onClick={() => {
              setActivePage(item.page);
              onClose(); // auto fecha em mobile
            }}
          >
            {item.icon}
            {item.title}
          </button>
        </li>
      ))}
    </ul>

    {/* Logout Button */}
    <div className="p-4">
    <Button
        onClick={() => {
          router.push("/register");
        }}
        icon=" pi pi-user-plus"
        label="Registrar"
        className="w-full text-sm !text-[color:#4a312a] hover:!bg-[color:#bdbdbd] !bg-[color:#ffffff] justify-start "
      />
      <Button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          router.push("/login");
        }}
        icon="pi pi-sign-out"
        label="Sair"
        className="w-full text-sm !text-[color:#4a312a] hover:!bg-[color:#bdbdbd] !bg-[color:#ffffff] justify-start "
      />
    </div>
  </div>
</aside>

  );
};

export default Sidebar;


