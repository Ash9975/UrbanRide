import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";

import { MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { setData, setFilteredData, setPriceHightoLow, setPriceLowtoHigh, setYearAscending, setYearDecending } from "../redux/user/sortfilterSlice";

const Sort = () => {
    const { userAllVehicles, allVariants } = useSelector(
        (state) => state.userListVehicles
    );

    const dispatch = useDispatch();

    const { control } = useForm({
        defaultValues: {
            price: "",
            year: "",
        },
    });

    const handlePriceChange = (value) => {
        if (!value) dispatch(setData(userAllVehicles));
        else if (value === "lowtohigh") dispatch(setPriceLowtoHigh());
        else if (value === "hightolow") dispatch(setPriceHightoLow());
    };

    const handleYearChange = (value) => {
        if (!value) dispatch(setData(userAllVehicles));
        else if (value === "yearAscending") dispatch(setYearAscending());
        else if (value === "yearDescending") dispatch(setYearDescending());
    };

    useEffect(() => {
        if (!allVariants) {
            dispatch(setFilteredData(userAllVehicles));
        }
    }, [allVariants, userAllVehicles, dispatch]);

    return (
        <div className="drop-shadow-lg">
            <div className="flex items-center justify-center gap-1 md:gap-3 md:justify-start mx-auto md:mx-[80px] lg:mx-0">

                {/* PRICE */}
                <Controller
                    control={control}
                    name="price"
                    render={({ field }) => (
                        <TextField
                            {...field}
                            select
                            label="Price"
                            sx={{ m: 1, width: 150 }}
                            onChange={(e) => {
                                field.onChange(e);
                                handlePriceChange(e.target.value);
                            }}
                        >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="lowtohigh">Low to High</MenuItem>
                            <MenuItem value="hightolow">High to Low</MenuItem>
                        </TextField>
                    )}
                />

                {/* YEAR */}
                <Controller
                    control={control}
                    name="year"
                    render={({ field }) => (
                        <TextField
                            {...field}
                            select
                            label="Year"
                            sx={{ m: 1, width: 150 }}
                            onChange={(e) => {
                                field.onChange(e);
                                handleYearChange(e.target.value);
                            }}
                        >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="yearAscending">Low to High</MenuItem>
                            <MenuItem value="yearDescending">High to Low</MenuItem>
                        </TextField>
                    )}
                />
            </div>
        </div>
    );
};

export default Sort;
