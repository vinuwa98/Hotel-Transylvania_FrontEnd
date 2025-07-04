import React from 'react';
import Button from '../atoms/Button';
import { themeColors } from '../../Theme/colors';

const Modal = ({ isOpen, onClose, onConfirm, message, icon }) => {
  if (!isOpen) return null;

 

  return (
    <div className="fixed inset-0 flex  items-center justify-center z-50 ">
        
      <div className="p-6 rounded-lg shadow-md max-w-sm w-full text-center" style={{ backgroundColor: themeColors.Gray }}>
        
        <h2 className="text-2xl font-bold mb-4" style={{ color: themeColors.DarkBlue }}>Confirmation</h2>

       
        <p className="text-lg font-medium mb-8 leading-relaxed">{message}</p>
        <div className="flex justify-center mb-12 text-4xl">{icon}</div>
        <div className="flex justify-center gap-8">
        
            <Button
                label="Yes"
                onClick={onConfirm}
                style={{
                    backgroundColor: themeColors.Blue3rd,
                    color: themeColors.White,
                }}  
                className="px-4 py-2 rounded "
            />
          
            <Button
                label="No"
                onClick={onClose}
                style={{
                    backgroundColor: themeColors.Gray500,
                    color: themeColors.White,
                }}  
                className="px-4 py-2 rounded"
            />
        </div>
      </div>
    </div>
  );
};

export default Modal;
