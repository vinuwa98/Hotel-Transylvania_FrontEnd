import React from 'react'
import { themeColors } from '../../Theme/colors';

const Header = ({ title }) => (
  <header className="shadow px-6 py-4" style={{backgroundColor: themeColors.DarkBlue}}>
    <h1 className="text-2xl font-semibold" style={{color: themeColors.White}}>{title}</h1>
  </header>
);

export default Header