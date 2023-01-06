
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
        <div>

            <p>Point ID:  {id}</p>
            <p>Monthly usage:  {reportState.report.monthlyUsedCoupons}</p>

            <button
                style={{ float: "right", marginBottom: 30, marginRight: "38px" }}
                type="button"
                onClick={handleShowModal}
                class="btn btn-primary btn-lg"
            >
                Insert new menu
            </button>


            {
                reportState.report.image ? (
                    <img alt="" src={reportState.report.image} />
                ) : (
                    null
                )
            }
        </div>
    );
};

export default Report;
