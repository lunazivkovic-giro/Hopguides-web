
import { useContext, React, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { ReportContext } from "../contexts/ReportContext";
import { reportService } from "../services/ReportService";
import { reportConstants } from "../constants/ReportConstants";
import { authHeader } from "../helpers/auth-header";
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
            window.location = "#/unauthorized";
        } else {

            Axios.get(`${url}api/users/getRole`, { headers: { Authorization: token } }, { validateStatus: () => true },
            )
                .then((res) => {
                    if (res.status === 200) {
                        if ( "USER" == res.data ) {

                            setRole(true)
                        }

                        if ("ADMIN" == res.data ) {

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

    return (
        <div class="login-page">
            {!role && <div class=" button-p">
                <button
                    type="button"
                    onClick={handleShowModal}
                    class="btn btn-primary btn-lg"
                >
                    Log in
                </button>
            </div>}

            <div class = "hotelcontact-box" >
            <p style={{fontWeight:"bold"}}>Hotel name:  {reportState.report.bpartnerName} </p>

                <p> Contact: Email: {reportState.report.bpartnerEmail}  Phone: {reportState.report.bpratnerPhone}</p>

               
            </div>

            <div class="home-box">
                <h2>Name:  {reportState.report.name}</h2>
                <h2>Monthly usage:  {reportState.report.monthlyUsedCoupons || 0}</h2>
                <a class="abutton" href={"http://localhost:3001/#/previousReports/" + id}>Get previous reports</a>
            </div>



            <h4 class="header2">Instructions</h4>
            <p class="paragraph-box">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

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
