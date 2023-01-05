
import { useContext, React , useEffect} from "react";
import { ReportContext } from "../contexts/ReportContext";
import { reportService } from "../services/ReportService";
const Report = () => {
	const { reportState, dispatch } = useContext(ReportContext);

    const someFetchActionCreator = () => {
        const getReportInfoHandler = async () => {
          await reportService.getReport(dispatch);
        };
        
        getReportInfoHandler();
      }

      useEffect(() => {

        someFetchActionCreator()
      }, [dispatch]);
	return (
		<div>
		
				
				<p>Point ID:  {reportState.report.pointId}</p>
				<p>Monthly usage:  {reportState.report.monthlyUsedCoupons}</p>
				
				
		</div>
	);
};

export default Report;
