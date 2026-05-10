import { useState } from "react";
import { useDispatch } from "react-redux";
import {
    setCompanyData,
    setDistrictData,
    setLocationData,
    setModelData,
} from "../redux/adminSlices/adminDashboardSlice/CarModelDataSlice";
import { setWholeData } from "../redux/user/selectRideSlice";

const useFetchLocationsLov = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    const fetchLov = async () => {
        try {
            setIsLoading(true);

            const res = await fetch("/api/admin/getVehicleModels", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) return;

            const data = await res.json();

            // models
            const models = data
                .filter((cur) => cur.type === "car")
                .map((cur) => cur.model);
            dispatch(setModelData(models));

            // brands
            const brands = data
                .filter((cur) => cur.type === "car")
                .map((cur) => cur.brand);
            dispatch(setCompanyData([...new Set(brands)]));

            // locations
            const locations = data
                .filter((cur) => cur.type === "location")
                .map((cur) => cur.location);
            dispatch(setLocationData(locations));

            // districts
            const districts = data
                .filter((cur) => cur.type === "location")
                .map((cur) => cur.district);
            dispatch(setDistrictData([...new Set(districts)]));

            // whole data
            dispatch(setWholeData(data.filter((cur) => cur.type === "location")));
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { fetchLov, isLoading };
};

export default useFetchLocationsLov;
