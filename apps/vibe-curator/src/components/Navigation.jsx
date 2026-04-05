import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Leaf, BookOpen, Package } from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/humidor', icon: Package, label: 'Humidor' },
  { to: '/learn', icon: BookOpen, label: 'Learn' },
];

function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-charcoal-100 safe-bottom z-50">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex justify-around items-center py-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''}`
              }
            >
              <Icon size={22} strokeWidth={1.5} />
              <span className="text-xs font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
