
import React, { useContext, useEffect, useState, forwardRef, } from "react";
import Paper from "@material-ui/core/Paper";
import { homeDataService } from "../services/HomeDataService";
import { HomeDataContext } from "../contexts/HomeDataContext";
import { Modal } from "react-bootstrap";
import { homeDataConstants } from "../constants/HomeDataConstants";
import { reportConstants } from "../constants/ReportConstants";
import MaterialTable, { MTableToolbar } from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import GetAppIcon from '@material-ui/icons/GetApp';
import { useParams } from 'react-router-dom';


const tableIcons = {
	Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => (
		<ChevronRight {...props} ref={ref} />
	)),
	Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => (
		<ChevronLeft {...props} ref={ref} />
	)),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
	ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};


var url = process.env.REACT_APP_URL || "http://localhost:3000/";
const AddNewTourForm = (props) => {

	const [title, setTitle] = useState("");
	const [shortInfo, setShortInfo] = useState("");
	const [longInfo, setLongInfo] = useState("");
	const [price, setPrice] = useState("");

	const [titlePoint, setTitlePoint] = useState("");
	const [shortInfoPoint, setShortInfoPoint] = useState("");
	const [longInfoPoint, setLongInfoPoint] = useState("");
	const [hotelId, setHotelId] = useState("");


	const [location, setLocation] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [webURL, setWebUrl] = useState("");

	const [errMessage, setErrMessage] = useState("");
	const [points, setPoints] = useState([]);
	const [add, setAdd] = useState(false);

	const { homeDataState, dispatch } = useContext(HomeDataContext);

	const [file, setFile] = useState(null);
	const [files, setFiles] = useState([]);
	const uploadRef = React.useRef();
	const statusRef = React.useRef();
	const progressRef = React.useRef();


	const onFileChange = (event) => {
		setFile(event.target.files[0]);
		setFiles({ ...files, ...event.target.files[0] });
		console.log(files)
	}


	const fileData = () => {
		if (file) {

			return (
				<div>
					<h2 style={{ marginTop: "20px" }}>File details</h2>
					<p>File name: {file.name}</p>
					<p>File type: {file.type}</p>
					<p>
						LAst modified:{" "}
						{file.lastModifiedDate.toDateString()}
					</p>
				</div>
			);
		}
	};



	const ProgressHandler = (e) => {
		var percent = (e.loaded / e.total) * 100;
		progressRef.current.value = Math.round(percent);
		statusRef.current.innerHTML = Math.round(percent) + "% uploaded...";

	};

	const SuccessHandler = (e) => {

		statusRef.current.innerHTML = "Success";
		progressRef.current.value = 100;
		//reportService.addMenu(true, dispatch);
	};
	const ErrorHandler = () => {

		statusRef.current.innerHTML = "Upload failed";

		//reportService.addMenu(false, dispatch);
	};
	const AbortHandler = () => {

		statusRef.current.innerHTML = "Upload aborted";

		//reportService.addMenu(false, dispatch);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (title == "" || price == "") {

			setErrMessage("Please fill all fields")
		} else {


			var tour = {
				title: { en: title },
				shortInfo: { en: shortInfo },
				longInfo: { en: longInfo },
				price: price,
				points: points


			}

			/*const formData = new FormData();
	
			formData.append('files', files);
			//formData.append("pointId", reportState.report.pointId);
			formData.append("tour", tour);
	
			var xhr = new XMLHttpRequest();
			xhr.upload.addEventListener("progress", ProgressHandler, false);
			xhr.addEventListener("load", SuccessHandler, false);
			xhr.addEventListener("error", ErrorHandler, false);
			xhr.addEventListener("abort", AbortHandler, false);
	
			xhr.open('POST', `${url}api/pnl/tour/add`, true);
			//xhr.setRequestHeader("Authorization", props.token);
			xhr.onload = function () {
				// do something to response
			};
	
			xhr.send(formData);*/





			homeDataService.addTour(tour, dispatch);

		}
	};
	const handleModalClose = () => {
		dispatch({ type: homeDataConstants.HIDE_ADD_MODAL });
		window.location.reload()
	};

	const addPoint = () => {
		setAdd(true)

	};
	const handleAdd = (e) => {


		setAdd(false)
		var point = {
			title: { en: titlePoint },
			shortInfo: { en: shortInfoPoint },
			longInfo: { en: longInfoPoint },
			contact: { phone: phone, email: email, address: address, webURL: webURL },
			//menu: string;
			bpartnerId: hotelId
		}
		const newData = [point, ...points];

		setPoints(newData)
		setTitlePoint("")
		setShortInfoPoint("")
		setLongInfoPoint("")
		setPhone("")
		setEmail("")
		setAddress("")
		setWebUrl("")
		setLocation("")

	};

	return (
		<Modal
			show={homeDataState.showModal} aria-labelledby="contained-modal-title-vcenter" class="modal-dialog modal-lg" centered onHide={handleModalClose} size="lg">

			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<big>Add new tour</big>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>


				<div>
					<Paper square>


						<div   >

							<div className="containerModal"  >

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

												<div className="control-group">
																<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
																	<label><b>Hotel's id</b></label>
																	<div class="row" >
																		<div class="form-group col-lg-10">
																			<input

																				className={"form-control"}
																				placeholder="Hotel's id"
																				aria-describedby="basic-addon1"
																				id="name"
																				type="text"
																				style={{ backgroundColor: 'white', outline: 'none' }}

																				onChange={(e) => setHotelId(e.target.value)}
																				value={hotelId}
																			/>
																		</div>
																	</div>
																</div>
															</div>

												<div className="form-group text-center">
													<button
														style={{ background: "#1977cc", marginTop: "15px", marginRight: "55px" }}

														onClick={(e) => { addPoint(e) }}
														className="btn btn-primary btn-xl"
														id="sendMessageButton"
														type="button"
													>
														Add partner
													</button>
												</div>









												<div>
													{add &&
														<div><div className="control-group">
															<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
																<label><b>Partner's name</b></label>
																<div class="row" >
																	<div class="form-group col-lg-10">
																		<input

																			className={"form-control"}
																			placeholder="Partner's name"
																			aria-describedby="basic-addon1"
																			id="name"
																			type="text"
																			style={{ backgroundColor: 'white', outline: 'none' }}

																			onChange={(e) => setTitlePoint(e.target.value)}
																			value={titlePoint}
																		/>
																	</div>
																</div>
															</div>
														</div>

															<div className="control-group">
																<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
																	<label><b>Short description </b></label>
																	<div class="row" >
																		<div class="form-group col-lg-10">
																			<input

																				className={"form-control"}
																				placeholder="Short description"
																				aria-describedby="basic-addon1"
																				id="name"
																				type="text"
																				style={{ backgroundColor: 'white', outline: 'none' }}

																				onChange={(e) => setShortInfoPoint(e.target.value)}
																				value={shortInfoPoint}
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

																				onChange={(e) => setLongInfoPoint(e.target.value)}
																				value={longInfoPoint}
																			/>
																		</div>
																	</div>
																</div>
															</div>

															<div className="control-group">
																<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
																	<label><b>Location</b></label>
																	<div class="row" >
																		<div class="form-group col-lg-10">
																			<input

																				className={"form-control"}
																				placeholder="Location"
																				aria-describedby="basic-addon1"
																				id="name"
																				type="text"
																				style={{ backgroundColor: 'white', outline: 'none' }}

																				onChange={(e) => setLocation(e.target.value)}
																				value={location}
																			/>
																		</div>
																	</div>
																</div>
															</div>

															

															<h6>Contact information about partner</h6>
															<br/>
															<div className="control-group">
																<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
																	<label><b>Phone</b></label>
																	<div class="row" >
																		<div class="form-group col-lg-10">
																			<input

																				className={"form-control"}
																				placeholder="Phone"
																				aria-describedby="basic-addon1"
																				id="name"
																				type="text"
																				style={{ backgroundColor: 'white', outline: 'none' }}

																				onChange={(e) => setPhone(e.target.value)}
																				value={phone}
																			/>
																		</div>
																	</div>
																</div>
															</div>

															<div className="control-group">
																<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
																	<label><b>Email</b></label>
																	<div class="row" >
																		<div class="form-group col-lg-10">
																			<input

																				className={"form-control"}
																				placeholder="Email"
																				aria-describedby="basic-addon1"
																				id="name"
																				type="text"
																				style={{ backgroundColor: 'white', outline: 'none' }}

																				onChange={(e) => setEmail(e.target.value)}
																				value={email}
																			/>
																		</div>
																	</div>
																</div>
															</div>

															<div className="control-group">
																<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
																	<label><b>Address</b></label>
																	<div class="row" >
																		<div class="form-group col-lg-10">
																			<input

																				className={"form-control"}
																				placeholder="Address"
																				aria-describedby="basic-addon1"
																				id="name"
																				type="text"
																				style={{ backgroundColor: 'white', outline: 'none' }}

																				onChange={(e) => setAddress(e.target.value)}
																				value={address}
																			/>
																		</div>
																	</div>
																</div>
															</div>

															<div className="control-group">
																<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
																	<label><b>Web page</b></label>
																	<div class="row" >
																		<div class="form-group col-lg-10">
																			<input

																				className={"form-control"}
																				placeholder="Web page"
																				aria-describedby="basic-addon1"
																				id="name"
																				type="text"
																				style={{ backgroundColor: 'white', outline: 'none' }}

																				onChange={(e) => setWebUrl(e.target.value)}
																				value={webURL}
																			/>
																		</div>
																	</div>
																</div>
															</div>




															<div className="form-group text-center">
																<button
																	style={{ background: "#1977cc", marginTop: "15px", marginRight: "55px" }}

																	onClick={(e) => { handleAdd(e) }}
																	className="btn btn-primary btn-xl"
																	id="sendMessageButton"
																	type="button"
																>
																	Add
																</button>
															</div>

														</div>
													}</div></td>
										</table>
									</form>
								</div>
							</div>

							{points.length > 0 &&
								<MaterialTable
									stickyHeader

									style={{
										tableLayout: "fixed",

									}}
									icons={tableIcons}
									columns={[
										{ title: "Title", field: "title.en" },
										{
											title: "Short description",
											field: "shortInfo.en",
										}, {
											title: "Long description",
											field: "longInfo.en",
										},
										{ title: "Hotel id", field: "bpartnerId" },
										{ title: "Location", field: "location" },
										{ title: "Email", field: "contact.email" },
										{ title: "Phone", field: "contact.phone" },
										{ title: "Address", field: "contact.address" },
										{ title: "Web page", field: "contact.webURL" },

									]}
									actions={[

									]}
									options={{
									}}
									localization={{

									}}
									data={points}
									title=""
								/>}



							<div className="form-group text-center" style={{ color: "red", fontSize: "0.8em", marginTop: "30px", marginRight: "40px" }} hidden={!errMessage}>
								{errMessage}
							</div>
							<div className="form-group text-center">
								<button
									style={{ background: "#1977cc", marginTop: "15px" }}

									onClick={(e) => { handleSubmit(e) }}
									className="btn btn-primary btn-xl"
									id="sendMessageButton"
									type="button"
								>
									Add tour
								</button>
							</div>

							<br />





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
