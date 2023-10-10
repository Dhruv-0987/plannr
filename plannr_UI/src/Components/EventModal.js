import React, { useState } from "react";
import { Button, Modal, TextField, Typography, Box } from "@mui/material";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import PlannrApiService from "../AppService";
import { toast } from "react-toastify";

function EventModal({ open, onClose }) {
  const [title, setTitle] = useState("");
  const [desc, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("12:00");

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    // For now, just close the modal
    handleClose();
  };

  const handleEventPublish = () => {
    let isValid = true;
    let validationMessage = "";

    if (!title.trim()) {
      isValid = false;
      validationMessage = "Title is required.";
    } else if (!desc.trim()) {
      isValid = false;
      validationMessage = "Description is required.";
    } else if (!address.trim()) {
      isValid = false;
      validationMessage = "Address is required.";
    } else if (!(selectedDate instanceof Date && !isNaN(selectedDate))) {
      isValid = false;
      validationMessage = "Please select a valid date.";
    } else if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(selectedTime)) {
      isValid = false;
      validationMessage = "Time is not in the correct format.";
    }

    if (!isValid) {
      toast.error(validationMessage);
      return;
    }

    PlannrApiService.createEvent(
      title,
      desc,
      address,
      selectedDate,
      selectedTime
    ).then((res) => {
      if (res.status === 201) {
        toast.success("Event created successfuly");
        onClose();
      }
    });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 600,
            bgcolor: "#373D20",
            border: "2px solid #000",
            p: 3,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            className="text-white italic"
          >
            Create Events
          </Typography>

          <TextField
            fullWidth
            margin="normal"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            InputProps={{ style: { backgroundColor: "white" } }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Description"
            multiline // Enables multiline input mode
            rows={4} // Sets the visible rows
            variant="outlined"
            value={desc}
            onChange={(e) => setDescription(e.target.value)}
            InputProps={{ style: { backgroundColor: "white" } }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Address"
            type="address"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            InputProps={{ style: { backgroundColor: "white" } }}
          />

          <div className="flex gap-x-4">
            <div className="bg-white p-4 rounded-lg mt-4 w-fit">
              <Calendar
                date={selectedDate}
                onChange={setSelectedDate}
                color="#3B82F6" // Tailwind's "blue-500"
              />
            </div>

            <div className="mt-4 mb-4 p-4 bg-white text-black rounded-lg h-full">
              <label htmlFor="time" className="block mb-2">
                Time:
              </label>
              <input
                id="time"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="p-4 flex justify-center">
            <Button
              onClick={handleEventPublish}
              variant="contained"
              className="p-4"
              style={{
                backgroundColor: "white",
                color: "black", // Adjust text color if needed
                borderRadius: "25px", // Adjust for desired roundness
                padding: "20px",
                margin: "10px",
                width: "200px",
              }}
            >
              PUBLISH EVENT
            </Button>

            <Button
              onClick={handleClose}
              variant="contained"
              className="p-4"
              style={{
                backgroundColor: "darkgreen",
                color: "white", // Adjust text color if needed
                borderRadius: "25px", // Adjust for desired roundness
                padding: "20px",
                margin: "10px",
                width: "200px",
              }}
            >
              {" "}
              CANCEL
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default EventModal;
