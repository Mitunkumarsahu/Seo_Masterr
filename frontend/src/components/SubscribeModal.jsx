import {
    Box,
    Button,
    TextField,
    Typography,
    Modal,
    Fade,
    Backdrop,
  } from "@mui/material";
  import React from "react";
  import style from "../styles/Styles";
  
  const SubscribeModal = ({ open, onClose, email, setEmail, loading, handleSubmit }) => {
    return (
      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 300 }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              width: "90%",
              maxWidth: 400,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" mb={2}>
              Enter your email to subscribe
            </Typography>
  
            <TextField
              fullWidth
              placeholder="example@mail.com"
              variant="outlined"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
  
            <Button
              fullWidth
              sx={[style?.homeFooterSearch.button, { mt: 2 }]}
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Submit"}
            </Button>
          </Box>
        </Fade>
      </Modal>
    );
  };
  
  export default SubscribeModal;
  