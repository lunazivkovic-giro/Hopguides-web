import { useContext, useState, useEffect,useRef, React } from "react";

import Modal from '@mui/material/Modal';
import { homeDataConstants } from "../constants/HomeDataConstants";
import { HomeDataContext } from "../contexts/HomeDataContext";
import PreviousReportTourForm from "./PreviousReportTourForm";

import { homeDataService } from "../services/HomeDataService";
const PreviousReportTourModal = () => {
	
	const { homeDataState, dispatch } = useContext(HomeDataContext);
	const handleModalClose = () => {
		dispatch({ type: homeDataConstants.HIDE_MODAL});
	};
 
	return (
	

		<Modal 
		open={homeDataState.previousReports.showModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onClose={handleModalClose}   size="lg">
			
			
				<PreviousReportTourForm
				homeDataState = {homeDataState}
				dispatch = {dispatch}/>
		

		</Modal>
	);
};

export default PreviousReportTourModal;
