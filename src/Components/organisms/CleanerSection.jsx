import React, {useState}from 'react'
import { themeColors } from "../../Theme/colors";
import Button from '../atoms/Button';
import AddComplaintForm from '../molecules/AddComplaintForm';

const CleanerSection = () => {

    // State to manage the visibility of the form
    const [showForm, setShowForm] = useState(false);
    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);

    return (
        <>
            <h2 className="text-2xl font-bold text-center">
                Cleaner Dashboard
            </h2>
            <p className="mt-8 text-2xl text-center"  style={{ color: themeColors.Blue}}>
                Welcome to the Cleaner Dashboard. 
            </p>
                <div className="mt-4 mb-8 space-x-4">
                    <Button
                        label={"Add Complaint"}
                        onClick={openForm}
                        style={{ backgroundColor: themeColors.Blue, color: themeColors.White }}
                        className="w-fit px-4 py-2 rounded-md mb-4 hover:opacity-90 transition"
                    />
                </div>
                
                <div className="shadow-md mt-6 rounded-lg p-6 w-full max-w-md" style={{ backgroundColor: themeColors.White}}>
                    <h3 className="text-xl font-semibold mb-4">Your Tasks</h3>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Clean Room 101</li>
                        <li>Restock Supplies in Room 102</li>
                        <li>Report Maintenance Issues in Room 103</li>
                    </ul>   
                </div>

           <AddComplaintForm isOpen={showForm} onClose={closeForm} />
        </>
    )
};

export default CleanerSection;