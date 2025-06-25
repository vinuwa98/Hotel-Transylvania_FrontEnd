import React from 'react'

const Header = ({ title }) => (
  <header className="bg-white shadow px-6 py-4">
    <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
  </header>
);

export default Header