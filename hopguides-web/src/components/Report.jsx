
import { useContext, React, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { ReportContext } from "../contexts/ReportContext";
import { reportService } from "../services/ReportService";
import { reportConstants } from "../constants/ReportConstants";
const Report = () => {
    const { reportState, dispatch } = useContext(ReportContext);

    let { id } = useParams()
    const someFetchActionCreator = () => {
        const getReportInfoHandler = async () => {
            await reportService.getReport(dispatch, id);
        };


        getReportInfoHandler();
    }
    const someFetchActionCreator2 = () => {

        const getMenuInfoHandler = async () => {
            await reportService.getMenu(dispatch, id);
        };


        getMenuInfoHandler();
    }
    useEffect(() => {

        someFetchActionCreator()
        someFetchActionCreator2()
    }, [dispatch]);

    const handleShowModal = () => {
        dispatch({ type: reportConstants.SHOW_ADD_MENU_MODAL });
    };

    return (
        <div class="login-page">


            <div class="home-box">
                <h2>ID:  {id}</h2>
                <h2>Monthly usage:  {reportState.report.monthlyUsedCoupons || 0}</h2>
                <a class ="abutton" href={"http://localhost:3001/#/previousReports/"+ id}>Get previous reports</a>
            </div>



            <h4 class="header2">Instructions</h4>
            <p class="paragraph-box">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

            <div class=" button-p">
                <button
                    type="button"
                    onClick={handleShowModal}
                    class="btn btn-primary btn-lg"
                >
                    Update menu image
                </button>
            </div>


            <div class="paragraph-box">
                {
                    reportState.report.image ? (
                        <img alt="" src={reportState.report.image} />
                    ) : (
                        null
                    )
                }
            </div>
        </div>
    );
};

export default Report;
