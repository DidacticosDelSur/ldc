import React from "react";
import {
  Bell,
  User,
  Package,
  Heart,
  Truck,
  CreditCard,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-72 bg-white shadow-md flex flex-col justify-between py-6 px-4">
      {/* Perfil */}
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <img
            src="https://i.pravatar.cc/50"
            alt="Diego"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="text-sm text-gray-500">Hola! 👋</p>
            <h2 className="font-semibold text-lg">Diego Fernandez</h2>
          </div>
        </div>

        {/* Navegación */}
        <nav className="space-y-3">
          <NavItem icon={<Bell size={18} />} label="Anuncios" active />
          <NavItem icon={<User size={18} />} label="Mis datos" />
          <NavItem icon={<Package size={18} />} label="Mis pedidos" />
          <NavItem icon={<Heart size={18} />} label="Guardados" />
          <NavItem icon={<Truck size={18} />} label="Envíos" />
          <NavItem icon={<CreditCard size={18} />} label="Pagos" />
          <NavItem icon={<Settings size={18} />} label="Ajustes" />
        </nav>
      </div>

      {/* Datos del viajante */}
      <div className="bg-[#5E3DB3] text-white p-4 rounded-xl mt-8">
        <p className="text-sm">Tu viajante es:</p>
        <p className="font-bold">Juan Perez</p>
        <a href="mailto:jp@libreria.com" className="text-sm underline">
          jp@libreria.com
        </a>
      </div>
    </aside>
  );
};

const NavItem = ({ icon, label, active }) => (
  <button
    className={`flex items-center space-x-3 px-4 py-2 rounded-md w-full text-left ${
      active ? "bg-[#5E3DB3] text-white" : "text-gray-700 hover:bg-gray-100"
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export default Sidebar;
