import React, { useContext, useState, useEffect, useRef } from "react";

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { homeDataConstants } from "../constants/HomeDataConstants";
import { HomeDataContext } from "../contexts/HomeDataContext";
import Paper from "@material-ui/core/Paper";
import Axios from "axios";
import { reportService } from "../services/ReportService";


var url = process.env.REACT_APP_URL || "http://localhost:3000/";

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
  };
  
const SuccessModal = () => {

	const { homeDataState, dispatch } = useContext(HomeDataContext);


	
	const handleClose = () => {
		dispatch({ type: homeDataConstants.HIDE_SUCCESS_FAILURE_MODAL });
	  };


	return (
		<Modal
        open={homeDataState.modalData.failure}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Error
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
		  {homeDataState.modalData.text}
          </Typography>
        </Box>
      </Modal>
	);
};

export default SuccessModal;
