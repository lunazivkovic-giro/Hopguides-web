
import React, { useContext, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { homeDataService } from "../services/HomeDataService";
import { HomeDataContext } from "../contexts/HomeDataContext";
import {  Modal } from "react-bootstrap";
import { homeDataConstants } from "../constants/HomeDataConstants";
var url = process.env.REACT_APP_URL || "http://localhost:3000/";

const AddNewTourForm = (props) => {
	
	const [title, setTitle] = useState("");
	const [shortInfo, setShortInfo] = useState("");
	const [longInfo, setLongInfo] = useState("");
	const [price, setPrice] = useState("");
	const [errMessage, setErrMessage] = useState("");

	const { homeDataState, dispatch } = useContext(HomeDataContext);
	const handleSubmit = (e) => {
		e.preventDefault();

		if (title == "" || price == "") {

			setErrMessage("Please fill all fields")
		} else {

			var tour = {
				title : {en:title},
				shortInfo: {en:shortInfo},
				longInfo: {en: longInfo},
				price: price,


			}
		
			homeDataService.addTour(tour,dispatch);
			
		}
	};
	const handleModalClose = () => {
		dispatch({ type: homeDataConstants.HIDE_ADD_MODAL });
		window.location.reload()
	};


	return (
		<Modal 
		show={homeDataState.showModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleModalClose}   size="lg">
			
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>Add new tour</big>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>


			<div>
				<Paper square>


					<div className="container"  >


						<div className="row mt-5">

							<form id="contactForm" >



								<table style={{ marginLeft: "4rem", marginBottom: "4rem" }}>
									<td width="600rem"  >
										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
												<label><b>Title</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														<input

															className={"form-control"}
															placeholder="Title"
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															style={{ backgroundColor: 'white', outline: 'none' }}

															onChange={(e) => setTitle(e.target.value)}
															value={title}
														/>
													</div>
												</div>
											</div>
										</div>

										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
												<label><b>Short description</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														<input

															className={"form-control"}
															placeholder="Short description"
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															style={{ backgroundColor: 'white', outline: 'none' }}

															onChange={(e) => setShortInfo(e.target.value)}
															value={shortInfo}
														/>
													</div>
												</div>
											</div>
										</div>

										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
												<label><b>Long description</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														<input

															className={"form-control"}
															placeholder="Long description"
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															style={{ backgroundColor: 'white', outline: 'none' }}

															onChange={(e) => setLongInfo(e.target.value)}
															value={longInfo}
														/>
													</div>
												</div>
											</div>
										</div>
									
										<div className="control-group">
											<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
												<label><b>Price</b></label>
												<div class="row" >
													<div class="form-group col-lg-10">
														<input

															className={"form-control"}
															placeholder="Price"
															aria-describedby="basic-addon1"
															id="name"
															type="text"
															style={{ backgroundColor: 'white', outline: 'none' }}

															onChange={(e) => setPrice(e.target.value)}
															value={price}
														/>
													</div>
												</div>
											</div>
										</div>
										<div className="form-group text-center" style={{ color: "red", fontSize: "0.8em", marginTop: "30px", marginRight: "40px" }} hidden={!errMessage}>
											{errMessage}
										</div>
										<div className="form-group text-center">
											<button
												style={{ background: "#1977cc", marginTop: "15px", marginRight: "55px" }}

												onClick={(e) => { handleSubmit(e) }}
												className="btn btn-primary btn-xl"
												id="sendMessageButton"
												type="button"
											>
												Add tour
											</button>
										</div>
									</td>
								</table>



							</form>
						</div>


					</div>



				</Paper>

				</div>
			</Modal.Body>
			<Modal.Footer>
			</Modal.Footer>

		</Modal>

			
	);
};

export default AddNewTourForm;
