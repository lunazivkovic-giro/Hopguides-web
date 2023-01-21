
import { useContext, React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { ReportContext } from "../contexts/ReportContext";
import { reportService } from "../services/ReportService";
import { reportConstants } from "../constants/ReportConstants";
import { deleteLocalStorage, authHeader } from "../helpers/auth-header";
import Axios from "axios";


var url = process.env.REACT_APP_URL || "http://localhost:3000/";
const Report = () => {
    const { reportState, dispatch } = useContext(ReportContext);

    const [role, setRole] = useState(false);
    const [admin, setAdmin] = useState(false);
    let { id } = useParams()
    const someFetchActionCreator = () => {
        const getReportInfoHandler = async () => {
            await reportService.getReport(dispatch, id);
            await reportService.getMenu(dispatch, id);
        };


        getReportInfoHandler();
    }


    useEffect(() => {

        var token = authHeader()
        if (token == "null") {
           // window.location = "#/unauthorized";
        } else {

            Axios.get(`${url}api/users/getRole`, { headers: { Authorization: token } }, { validateStatus: () => true },
            )
                .then((res) => {
                    if (res.status === 200) {
                        if ("USER" == res.data) {

                            setRole(true)
                        }

                        if ("ADMIN" == res.data) {

                            setRole(true)
                            setAdmin(true)
                        }
                    }
                })
                .catch((err) => {

                })
        }


        someFetchActionCreator()
    }, [dispatch]);


    const handleShowModal = () => {
        dispatch({ type: reportConstants.SHOW_ADD_MENU_MODAL });
    };

    const handleLogin = () => {
        window.location.href = "#/login"
    };


    const handleLogout = () => {
        deleteLocalStorage();
        window.location = "#/login";
    };


    function BoldText({ children }) {
        return (
            <span style={{ fontWeight: 'bold' }}>{children}</span>
        );
    }

    function ColorText({ children }) {
        return (
            <span style={{ color: 'green' }}>{children}</span>
        );
    }

    function ColorTextRed({ children }) {
        return (
            <span style={{ color: 'red' }}>{children}</span>
        );
    }

    return (
        <div class="login-page">
            {!role && <div class=" button-login">
                <button
                    type="button"
                    onClick={handleLogin}
                    class="btn btn-primary btn-lg"
                >
                    Log in
                </button>
            </div>}

            {role && <div class=" button-login">
                <button
                    type="button"
                    onClick={handleLogout}
                    class="btn btn-primary btn-lg"
                >
                    Log out
                </button>
            </div>}

            <div class="hotelcontact-box" >
                <p style={{ fontWeight: "bold" }}>Provider name:  {reportState.report.bpartnerName} </p>

                <p style={{ fontWeight: "bold" }}> Contact: </p><p>Email: {reportState.report.bpartnerEmail} </p><p> Phone: {reportState.report.bpratnerPhone}</p>


            </div>

            <div class="home-box">
                <h2>Name:  {reportState.report.name}</h2>
                <h2>Monthly usage:  {reportState.report.monthlyUsedCoupons || 0}</h2>
                <a class="abutton" href={"http://localhost:3001/#/previousReports/" + id}>Get previous reports</a>
            </div>



            <h4 class="header2">Instructions</h4>
            <p class="paragraph-box2">1.  Using the camera on your phone please scan the users/customer QR code    </p><br />
            <p class="paragraph-box2" >2. After scanning the QR code, please check the provided feedback on your phone. </p><br />
            <ul class="ul-box2">
                <li>If the QR code is <ColorText>VALID</ColorText> please serve the customer<BoldText> »home made« Sirove Štruklje </BoldText>as included in the tour.
                </li>
            </ul>

            <div class="image-box">
                {
                   
                        <img alt="" src="/assets/img/Screenshot_2.png" />
                  
                }
            </div>

            <ul class="ul-box2">
                <li>If the QR code is <ColorTextRed>NOT VALID</ColorTextRed>  the user has not paid for the experience or has already used the said QR code

                </li>
            </ul>

            <div class="image-box">
                {
                   
                        <img alt="" src="/assets/img/Screenshot_1.png" />
                  
                }
            </div>

            {admin && <div class=" button-p">
                <button
                    type="button"
                    onClick={handleShowModal}
                    class="btn btn-primary btn-lg"
                >
                    Update menu image
                </button>
            </div>}2


            <div class="paragraph-box">
                {
                    reportState.image ? (
                        <img alt="" src={reportState.image} />
                    ) : (
                        null
                    )
                }
            </div>
        </div>
    );
};

export default Report;
