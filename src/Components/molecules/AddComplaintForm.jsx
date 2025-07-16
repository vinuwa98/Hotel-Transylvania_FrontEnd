import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ComplaintService from "../../services/complaintService";
import ConfirmationModal from "../molecules/Modal";
import { CheckCircle, XCircle } from "lucide-react";
import { themeColors } from "../../Theme/colors";

const AddComplaintForm = ({ isOpen, onClose }) => {

  // State to manage rooms and form data
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    roomId: "",
    image: null,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("info"); // "info" or "confirm"


  const token = localStorage.getItem("token");

  // Fetch available rooms when the form opens
  useEffect(() => {

    if (!isOpen) return;

    const fetchRooms = async () => {
      try {
        const data = await ComplaintService.fetchRooms(token);
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, [token, isOpen]);
  

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await ComplaintService.addComplaint(formData, token);
        setFormData({
          title: "",
          description: "",
          roomId: "",
          image: null,
    });
        onClose();
        setModalMessage("Complaint submitted successfully!");
        setModalType("info");
        setModalOpen(true);
    } catch (err) {
        console.error(err);
        setModalMessage("Failed to submit complaint.");
        setModalType("info");
        setModalOpen(true);
    }

  };
  
  const handleModalClose = () => {
    setModalOpen(false);
  };
 
  // Handle success confirmation
  const handleSuccessConfirm = () => {
    setSuccessModalOpen(false); 
    onClose(); 
  }; 

  const FieldTitle = ({ children }) => (
    <Typography variant="subtitle2" fontWeight="bold">
      {children}
    </Typography>  
  );

  // Styles for the modal and form
  const modalStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };


  const formStyles = {
    width: "40vw",
    maxHeight: "90vh",
    overflowY: "auto",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  };

  return (

    <>
    <Modal open={isOpen} onClose={onClose} sx={modalStyles}>
      <Box component="form" onSubmit={handleSubmit} sx={formStyles}>
        <Typography variant="h5" fontWeight="bold" align="center" mb={2}>
          Add Complaint
        </Typography>

       
        <FieldTitle>Title</FieldTitle>

        <TextField
          name="title"
          label="Title"
          fullWidth
          required
          value={formData.title}
          onChange={handleChange}
        />

        <FieldTitle>Description</FieldTitle>
  
        <TextField
          name="description"
          label="Description"
          fullWidth
          multiline
          minRows={3}
          value={formData.description}
          onChange={handleChange}
        />

        <FieldTitle>Select Room</FieldTitle>

        <TextField
          select
          name="roomId"
          label="Select Room"
          fullWidth
          value={formData.roomId}
          onChange={handleChange}
          required
        >
          <MenuItem value="">-- Select a Room --</MenuItem>
          {rooms.map((room) => (
            <MenuItem key={room.roomId} value={room.roomId}>
              Room {room.roomId} - {room.roomType}
            </MenuItem>
          ))}
        </TextField>

        <FieldTitle>Upload Image</FieldTitle>
        <Button
          variant="outlined"
          component="label"
          fullWidth
        >
          {formData.image ? formData.image.name : "Upload Image"}
          <input
            type="file"
            name="image"
            accept="image/*"
            hidden
            onChange={handleChange}
          />
        </Button>

        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>

      <ConfirmationModal
          isOpen={modalOpen}
          onClose={handleModalClose}
          message={modalMessage}
          messageType={modalType}
          icon={
            modalMessage === "Complaint submitted successfully!" ? (
              <CheckCircle 
                className="w-16 h-16 flex items-center justify-center rounded-full shadow-lg"
                style={{ backgroundColor: themeColors.Green, color: themeColors.White }} />
            ) : (
              <XCircle 
                className="w-16 h-16 flex items-center justify-center rounded-full shadow-lg"
                style={{ backgroundColor: themeColors.Red, color: themeColors.White }} />
            )
          }
      />

    </>
  );
};

export default AddComplaintForm;
