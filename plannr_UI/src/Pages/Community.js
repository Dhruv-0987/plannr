import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EventModal from "../Components/EventModal";
import AddressAutocomplete from "../Components/AddressAutoComplete";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEvents } from "../StateManagement/Effects";
import { selectAllEvents } from "../StateManagement/EventSlice";
import EventTile from "../Components/EventTile";

function Community() {
  const events = useSelector(selectAllEvents);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, []);
  const [eventModalFormOpen, setEventModalFormOpen] = useState(null);

  const handleEventModalOpen = () => {
    setEventModalFormOpen(true);
  };

  const handleModalClose = () => {
    setEventModalFormOpen(false);
    dispatch(fetchAllEvents());
  };

  return (
    <div>
      <EventModal open={eventModalFormOpen} onClose={handleModalClose} />
      <div>
        <p className="text-4xl m-4 p-4 text-brand-green font-playfair">
          🍎 Dive into Food & Health Events! 🥦
        </p>
        <p className="text-2xl font-lato text-brand-green p-2">
          {" "}
          Host a nutritious workshop, share a recipe, or start a fitness
          challenge. Gather, nourish, and thrive together. Your health-minded
          community awaits!
        </p>
      </div>

      <Button
        onClick={handleEventModalOpen}
        variant="contained"
        className="p-4"
        style={{
          backgroundColor: "white",
          color: "black", // Adjust text color if needed
          borderRadius: "25px", // Adjust for desired roundness
          padding: "20px",
          margin: "10px",
        }}
        endIcon={<ArrowForwardIosIcon />}
      >
        CREATE EVENT
      </Button>

      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-4xl font-bold mb-6 text-center text-green-700">
          Here Are Your Events 🎉
        </h1>
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => (
              <EventTile key={event.Title} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            No events found. Create your first event!
          </div>
        )}
      </div>
    </div>
  );
}

export default Community;
