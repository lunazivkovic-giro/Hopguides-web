
import React, { useContext, useEffect, useState, forwardRef, useRef } from "react";
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

import { YMaps, Map } from "react-yandex-maps";
import GetAppIcon from '@material-ui/icons/GetApp';
import { useParams } from 'react-router-dom';

const mapState = {
	center: [44, 21],
	zoom: 8,
	controls: [],
};
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

	//const [addressInput, setAddressInput] =  React.createRef();

	/*const addressInput = React.forwardRef(({ children }, ref) => {
		return <li ref={ref}>{children}</li>;
	});
*/
	const addressInput = React.createRef(null);


	const [title, setTitle] = useState("");
	const [shortInfo, setShortInfo] = useState("");
	const [longInfo, setLongInfo] = useState("");
	const [price, setPrice] = useState("_€ incl tax");

	const [titlePoint, setTitlePoint] = useState("");
	const [shortInfoPoint, setShortInfoPoint] = useState("");
	const [longInfoPoint, setLongInfoPoint] = useState("");
	const [pointPrice, setPointPrice] = useState("_€ incl tax");
	const [offerName, setOfferName] = useState("");
	const [hotelId, setHotelId] = useState("");


	const [location, setLocation] = useState("");
	const [phone, setPhone] = useState("");
	const [ymaps, setYmaps] = useState(null);
	const [email, setEmail] = useState("");
	const [webURL, setWebUrl] = useState("");


	const [mondayFrom, setMondayFrom] = useState("");
	const [mondayTo, setMondayTo] = useState("");
	const [tuesdayFrom, setTuesdayFrom] = useState("");
	const [tuesdayTo, setTuesdayTo] = useState("");
	const [wednesdayFrom, setWednesdayFrom] = useState("");
	const [wednesdayTo, setWednesdayTo] = useState("");
	const [thursdayFrom, setThursdayFrom] = useState("");
	const [thursdayTo, setThursdayTo] = useState("");
	const [fridayFrom, setFridayFrom] = useState("");
	const [fridayTo, setFridayTo] = useState("");
	const [saturdayFrom, setSaturdayFrom] = useState("");
	const [saturdayTo, setSaturdayTo] = useState("");
	const [sundayFrom, setSundayFrom] = useState("");
	const [sundayTo, setSundayTo] = useState("");

	const [mondayclosed, setMondayClosed] = useState(false);
	const [tuesdayclosed, setTuesdayClosed] = useState(false);
	const [wednesdayclosed, setWednesdayClosed] = useState(false);
	const [thursdayclosed, setThursdayClosed] = useState(false);
	const [fridayclosed, setFridayClosed] = useState(false);
	const [saturdayclosed, setSaturdayClosed] = useState(false);
	const [sundayclosed, setSundayClosed] = useState(false);


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


	const onYmapsLoad = (ymaps) => {
		setYmaps(ymaps)
		new ymaps.SuggestView(addressInput.current, {
			provider: {
				suggest: (request, options) => ymaps.suggest(request),
			},
		});
	};

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

		let street;
		let city;
		let country;
		let latitude;
		let longitude;
		let found = true;
		ymaps.geocode(addressInput.current.value, {
			results: 1,
		})
			.then(function (res) {

				if (typeof res.geoObjects.get(0) === "undefined") found = false;
				else {
					var firstGeoObject = res.geoObjects.get(0),
						coords = firstGeoObject.geometry.getCoordinates();

					console.log(firstGeoObject)
					latitude = coords[0];
					longitude = coords[1];
					country = firstGeoObject.getCountry();
					street = firstGeoObject.getThoroughfare();
					city = firstGeoObject.getLocalities().join(", ");
				}
			})
			.then((res) => {

				var point = {
					title: { en: titlePoint },
					shortInfo: { en: shortInfoPoint },
					longInfo: { en: longInfoPoint },
					price: pointPrice,
					offerName: offerName,
					contact: { phone: phone, email: email, webURL: webURL },
					location: { street: street, country: country, city: city, latitude: latitude, longitude: longitude },
					workingHours: { monday: {from: mondayFrom, to: mondayTo}, tuesday: {from: tuesdayFrom, to: tuesdayTo}, wednesday: {from: wednesdayFrom, to: wednesdayTo}, thursday: {from: thursdayFrom, to: thursdayTo}, friday: {from: fridayFrom, to: fridayTo} , saturday: {from: saturdayFrom, to: saturdayTo} , sunday: {from: sundayFrom, to: sundayTo} },
					bpartnerId: hotelId
				}

				console.log(point.location)
				const newData = [point, ...points];

				setPoints(newData)
				setTitlePoint("")
				setShortInfoPoint("")
				setLongInfoPoint("")
				setPointPrice("")
				setPhone("")
				setEmail("")
				//setAddressInput(null)
				setWebUrl("")
				setLocation("")


			});
	}




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

																				onChange={(e) => setPointPrice(e.target.value)}
																				value={pointPrice}
																			/>
																		</div>
																	</div>
																</div>
															</div>
															<div className="control-group">
																<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
																	<label><b>Offer name</b></label>
																	<div class="row" >
																		<div class="form-group col-lg-10">
																			<input

																				className={"form-control"}
																				placeholder="Offer name"
																				aria-describedby="basic-addon1"
																				id="name"
																				type="text"
																				style={{ backgroundColor: 'white', outline: 'none' }}

																				onChange={(e) => setOfferName(e.target.value)}
																				value={offerName}
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
																			<input className="form-control" id="suggest" ref={addressInput} placeholder="Address" />

																			<YMaps
																				query={{
																					load: "package.full",
																					apikey: "b0ea2fa3-aba0-4e44-a38e-4e890158ece2",
																					lang: "en_RU",
																				}}
																			>
																				<Map
																					style={{ display: "none" }}
																					state={mapState}
																					onLoad={onYmapsLoad}
																					instanceRef={(map) => (map = map)}
																					modules={["coordSystem.geo", "geocode", "util.bounds"]}
																				></Map>
																			</YMaps>
																		</div>
																	</div>
																</div>
															</div>

															<h6><b>Working hours </b></h6>
															<br />

															<div className="control-group">
																<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
																	<label><b>Monday</b></label>

																	<br />
																	<label>
																		<input
																			type="checkbox"
																			checked={mondayclosed}
																			onChange={(e) => setMondayClosed(!mondayclosed)}
																		/>
																		closed
																	</label>
																	{!mondayclosed && <div class="row" >

																		<span  >
																			<input

																				className={"form-control "}
																				placeholder="From"
																				aria-describedby="basic-addon1"
																				id="name"
																				type="text"
																				style={{ backgroundColor: 'white', outline: 'none' }}

																				onChange={(e) => setMondayFrom(e.target.value)}
																				value={mondayFrom}
																			/>
																		</span>
																		<span >
																			<input

																				className={"form-control "}
																				placeholder="To"
																				aria-describedby="basic-addon1"
																				id="name"
																				type="text"
																				style={{ backgroundColor: 'white', outline: 'none' }}

																				onChange={(e) => setMondayTo(e.target.value)}
																				value={mondayTo}
																			/></span>
																	</div>}
																</div>
															</div>

															<div className="control-group">
																<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
																	<label><b>Tuesday</b></label>
																	<br />
																	<label>
																		<input
																			type="checkbox"
																			checked={tuesdayclosed}
																			onChange={(e) => setTuesdayClosed(!tuesdayclosed)}
																		/>
																		closed
																	</label>
																	{!tuesdayclosed && <div class="row" >

																		<span  >
																			<input

																				className={"form-control "}
																				placeholder="From"
																				aria-describedby="basic-addon1"
																				id="name"
																				type="text"
																				style={{ backgroundColor: 'white', outline: 'none' }}

																				onChange={(e) => setTuesdayFrom(e.target.value)}
																				value={tuesdayFrom}
																			/>
																		</span>
																		<span >
																			<input

																				className={"form-control "}
																				placeholder="To"
																				aria-describedby="basic-addon1"
																				id="name"
																				type="text"
																				style={{ backgroundColor: 'white', outline: 'none' }}

																				onChange={(e) => setTuesdayTo(e.target.value)}
																				value={tuesdayTo}
																			/></span>
																	</div>}
																</div>
															</div>

															<div className="control-group">
																<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
																	<label><b>Wednesday</b></label>
																	<br />
																	<label>
																		<input
																			type="checkbox"
																			checked={wednesdayclosed}
																			onChange={(e) => setWednesdayClosed(!wednesdayclosed)}
																		/>
																		closed
																	</label>
																	{!wednesdayclosed && <div class="row" >

																		<span  >
																			<input

																				className={"form-control "}
																				placeholder="From"
																				aria-describedby="basic-addon1"
																				id="name"
																				type="text"
																				style={{ backgroundColor: 'white', outline: 'none' }}

																				onChange={(e) => setWednesdayFrom(e.target.value)}
																				value={wednesdayFrom}
																			/>
																		</span>
																		<span >
																			<input

																				className={"form-control "}
																				placeholder="To"
																				aria-describedby="basic-addon1"
																				id="name"
																				type="text"
																				style={{ backgroundColor: 'white', outline: 'none' }}

																				onChange={(e) => setWednesdayTo(e.target.value)}
																				value={wednesdayTo}
																			/></span>
																	</div>}
																</div>
															</div>

															<div className="control-group">
																<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
																	<label><b>Thursday</b></label>
																	<br />
																	<label>
																		<input
																			type="checkbox"
																			checked={thursdayclosed}
																			onChange={(e) => setThursdayClosed(!thursdayclosed)}
																		/>
																		closed
																	</label>
																	{!thursdayclosed && <div class="row" >

																		<span  >
																			<input

																				className={"form-control "}
																				placeholder="From"
																				aria-describedby="basic-addon1"
																				id="name"
																				type="text"
																				style={{ backgroundColor: 'white', outline: 'none' }}

																				onChange={(e) => setThursdayFrom(e.target.value)}
																				value={thursdayFrom}
																			/>
																		</span>
																		<span >
																			<input

																				className={"form-control "}
																				placeholder="To"
																				aria-describedby="basic-addon1"
																				id="name"
																				type="text"
																				style={{ backgroundColor: 'white', outline: 'none' }}

																				onChange={(e) => setThursdayTo(e.target.value)}
																				value={thursdayTo}
																			/></span>
																	</div>}
																</div>
															</div>

															<div className="control-group">
																<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
																	<label><b>Friday</b></label>
																	<br />
																	<label>
																		<input
																			type="checkbox"
																			checked={fridayclosed}
																			onChange={(e) => setFridayClosed(!fridayclosed)}
																		/>
																		closed
																	</label>
																	{!fridayclosed && <div class="row" >
																		<span  >
																			<input

																				className={"form-control "}
																				placeholder="From"
																				aria-describedby="basic-addon1"
																				id="name"
																				type="text"
																				style={{ backgroundColor: 'white', outline: 'none' }}

																				onChange={(e) => setFridayFrom(e.target.value)}
																				value={fridayFrom}
																			/>
																		</span>
																		<span >
																			<input

																				className={"form-control "}
																				placeholder="To"
																				aria-describedby="basic-addon1"
																				id="name"
																				type="text"
																				style={{ backgroundColor: 'white', outline: 'none' }}

																				onChange={(e) => setFridayTo(e.target.value)}
																				value={fridayTo}
																			/></span>
																	</div>}
																</div>
															</div>

															<div className="control-group">
																<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
																	<label><b>Saturday</b></label>
																	<br />
																	<label>
																		<input
																			type="checkbox"
																			checked={saturdayclosed}
																			onChange={(e) => setSaturdayClosed(!saturdayclosed)}
																		/>
																		closed
																	</label>
																	{!saturdayclosed && <div class="row" >

																		<span  >
																			<input

																				className={"form-control "}
																				placeholder="From"
																				aria-describedby="basic-addon1"
																				id="name"
																				type="text"
																				style={{ backgroundColor: 'white', outline: 'none' }}

																				onChange={(e) => setSaturdayFrom(e.target.value)}
																				value={saturdayFrom}
																			/>
																		</span>
																		<span >
																			<input

																				className={"form-control "}
																				placeholder="To"
																				aria-describedby="basic-addon1"
																				id="name"
																				type="text"
																				style={{ backgroundColor: 'white', outline: 'none' }}

																				onChange={(e) => setSaturdayTo(e.target.value)}
																				value={saturdayTo}
																			/></span>
																	</div>}
																</div>
															</div>

															<div className="control-group">
																<div className="form-group controls mb-0 pb-2" style={{ color: "#6c757d", opacity: 1 }}>
																	<label><b>Sunday</b></label>
																	<br />
																	<label>
																		<input
																			type="checkbox"
																			checked={sundayclosed}
																			onChange={(e) => setSundayClosed(!sundayclosed)}
																		/>
																		closed
																	</label>
																	{!sundayclosed && <div class="row" >

																		<span  >
																			<input

																				className={"form-control "}
																				placeholder="From"
																				aria-describedby="basic-addon1"
																				id="name"
																				type="text"
																				style={{ backgroundColor: 'white', outline: 'none' }}

																				onChange={(e) => setSundayFrom(e.target.value)}
																				value={sundayFrom}
																			/>
																		</span>
																		<span >
																			<input

																				className={"form-control "}
																				placeholder="To"
																				aria-describedby="basic-addon1"
																				id="name"
																				type="text"
																				style={{ backgroundColor: 'white', outline: 'none' }}

																				onChange={(e) => setSundayTo(e.target.value)}
																				value={sundayTo}
																			/></span>
																	</div>}
																</div>
															</div>


															<br />

															<h6><b>Contact information about partner</b></h6>
															<br />
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
										{ title: "Email", field: "contact.email" },
										{ title: "Phone", field: "contact.phone" },
										{ title: "Web page", field: "contact.webURL" },

										{
											render: (point) => {
												return `${point.location.street}  ${point.location.city} ${point.location.country} ${point.location.latitute}  ${point.location.longitude}`;
											},
											title: 'Location',
										},

										{
											render: (point) => {
												return `Monday: ${point.workingHours.monday.from} - ${point.workingHours.monday.to}  
												Tuesday: ${point.workingHours.tuesday.from} - ${point.workingHours.tuesday.to}
												Wednesday: ${point.workingHours.wednesday.from} - ${point.workingHours.wednesday.to}  
												Thursday: ${point.workingHours.thursday.from} - ${point.workingHours.thursday.to}  
												Friday: ${point.workingHours.friday.from} - ${point.workingHours.friday.to}    
												Saturday: ${point.workingHours.saturday.from} - ${point.workingHours.saturday.to}    
												Sunday: ${point.workingHours.sunday.from} - ${point.workingHours.sunday.to}       `;
											},
											title: 'Working hours',
										},



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
			</Modal.Body >
			<Modal.Footer>
			</Modal.Footer>

		</Modal >


	);
};

export default AddNewTourForm;
