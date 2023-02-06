import React, { useContext, useEffect, useImperativeHandle, forwardRef, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { userService } from "../services/UserService";
import UserContextProvider from "../contexts/UserContext";
import Select from "react-dropdown-select";
import { VscLibrary } from 'react-icons/vsc';
import { MdOutlineDashboard } from 'react-icons/md';
import { BiCollection } from 'react-icons/bi';
import { BsBuilding } from "react-icons/bs";
import { GiPerson } from "react-icons/gi";
import { AiOutlineUserAdd, AiOutlineMail } from 'react-icons/ai';

const Register = () => {

	const { userState, dispatch } = useContext(UserContext);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [phone2, setPhone2] = useState("");
	const [contactEmail, setContactEmail] = useState("");
	const [webURL, setWebURL] = useState("");

	const handleLogout = (event) => {

		// deleteLocalStorage();
		window.location = "#/login";
	}


	const handleSubmitNew = (e) => {


		e.preventDefault();

		let sendEmailRequest = {}

		sendEmailRequest = {
			email: email,
			contactEmail: contactEmail,
			phone: phone,
			phone2: phone2,
			webURL: webURL,
			name: name

		}

		
		//userService.sendRegistrationMail(sendEmailRequest, dispatch);
	};


	return (
		<body style={{ height: "750px" }}>
			<div>

				<UserContextProvider>
					<div class="wrapper">


						<div style={{ display: "flex", justifyContent: "center", marginLeft: "338px", marginTop: "100px" }}>
							<form method="post" onSubmit={handleSubmitNew} style={{ width: "100%", marginRight: "338px" }} >


								<h2 style={{ marginBottom: "80px" }}>Send registration link to the new user</h2>

								<div className="form-group">
									<input className="form-control" type="email" style={{ height: "50px" }} required name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
								</div>

								<div className="form-group">
									<input className="form-control" type="text" style={{ height: "50px" }} required name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}></input>
								</div>

								<div className="form-group">
									<input className="form-control" type="text" style={{ height: "50px" }} required name="contactEmail" placeholder="Contact email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}></input>
								</div>

								<div className="form-group">
									<input className="form-control" type="text" style={{ height: "50px" }} required name="name" placeholder="Primary phone" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
								</div>

								<div className="form-group">
									<input className="form-control" type="text" style={{ height: "50px" }} required name="name" placeholder="Secondary phone" value={phone2} onChange={(e) => setPhone2(e.target.value)}></input>
								</div>

								<div className="form-group">
									<input className="form-control" type="text" style={{ height: "50px" }} required name="name" placeholder="Website" value={webURL} onChange={(e) => setWebURL(e.target.value)}></input>
								</div>



								<label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>

								<div className="form-group">
									<input className="btn btn-primary btn-block" id="kayitol" type="submit" style={{ background: "#5e90f6" }} value="Send" />
								</div>


							</form>
						</div>


					</div>
				</UserContextProvider>
			</div>
		</body>
	);


};
export default Register;



