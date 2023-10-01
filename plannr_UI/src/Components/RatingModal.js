import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/lab/Rating";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function RatingModal({ isOpen, handleClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    onSubmit({ rating, comment });
    handleClose();
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="rating-modal-title"
        aria-describedby="rating-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)', // equivalent to shadow-sm in Tailwind
            borderRadius: '0.375rem', // equivalent to rounded-md in Tailwind
            p: 4,
          }}
        >
          <Typography id="rating-modal-title" variant="h6" component="h2" className="text-brand-green text-2xl">
            Rate the Recipe
          </Typography>

          <Rating
            name="recipe-rating"
            value={rating}
            precision={0.5}
            onChange={(event, newValue) => setRating(newValue)}
          />

          <TextField
            fullWidth
            margin="dense"
            variant="outlined"
            label="Comment"
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ marginTop: "20px" }}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            style={{ marginTop: "20px", width: "100%", backgroundColor: "darkgreen" }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default RatingModal;
