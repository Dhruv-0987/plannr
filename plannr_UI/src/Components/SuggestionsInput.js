import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { fetchProducts } from "../StateManagement/Effects";
import { useDispatch } from "react-redux";


function SuggestionsInput() {
  const [familySize, setFamilySize] = React.useState(null);
  const [budget, setBudget] = useState(null);
  const [bugdetLimitErrorMsg, setBudgetLimitErrMsg] = useState(null);
  const [familySizeErrMsg, setFamilySizeErrorMsg] = useState(null);
  const [isBudgetLimitInvalid, setIsBudgetLimitInvalid] = useState(false);
  const [isFamilySizeInvalid, setIsFamiylSizeInvalid] = useState(false);

  const dispatch = useDispatch();

  const handleChangeFamilySize = (e) => {
    setFamilySizeErrorMsg(null);
    const value = parseInt(e.target.value, 10);
    setFamilySize(value);
  };

  const handleChangeBudget = (e) => {
    setBudgetLimitErrMsg(null);
    const value = parseInt(e.target.value, 10);
    setBudget(value);
  };

  const handleGetSuggestions = () => {
    let isBudgetInvalid = budget == null || budget < 0;
    let isFamilyInvalid = familySize == null || familySize < 0;

    if (isBudgetInvalid) {
      setIsBudgetLimitInvalid(true);
      setBudgetLimitErrMsg(
        "Budget Limit cannot be empty, please select correct value from the dropdown"
      );
    } else {
      setIsBudgetLimitInvalid(false);
      setBudgetLimitErrMsg("");
    }

    if (isFamilyInvalid) {
      setIsFamiylSizeInvalid(true);
      setFamilySizeErrorMsg(
        "Family Size cannot be empty, please select correct value from the dropdown"
      );
    } else {
      setIsFamiylSizeInvalid(false);
      setFamilySizeErrorMsg("");
    }

    if (!isBudgetInvalid && !isFamilyInvalid) {
      dispatch(fetchProducts({budget, familySize}))
        .then(({ payload }) => {
          console.log("suggested products", payload);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="suggestion-input flex justify-center w-full">
      <div className="inputs border-gray-300 shadow-md rounded-md p-4 w-full">
        <div className="family-size-input flex justify-evenly items-center p-4">
          <label className="text-xl ml-4">Budget Limit:</label>
          <div className="w-1/2">
            <Box sx={{ width: "100%" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Budget Weekly
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={budget}
                  label="Family Size"
                  onChange={handleChangeBudget}
                >
                  <MenuItem value={100}>100</MenuItem>
                  <MenuItem value={200}>200</MenuItem>
                  <MenuItem value={300}>300</MenuItem>
                  <MenuItem value={400}>400</MenuItem>
                  <MenuItem value={500}>500</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>

        <div className="family-size-input flex justify-evenly items-center p-4">
          <label className="text-xl ml-4">Family Size:</label>
          <div className="w-1/2">
            <Box sx={{ width: "100%" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Family Size
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={familySize}
                  label="Family Size"
                  onChange={handleChangeFamilySize}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>

        {/* If you have another input, rename and adjust accordingly or remove the block if unnecessary. */}
        <div>
          {isFamilySizeInvalid && (
            <p className="text-center text-red-600">{familySizeErrMsg}</p>
          )}
          {isBudgetLimitInvalid && (
            <p className="text-center text-red-600">{bugdetLimitErrorMsg}</p>
          )}
        </div>

        <div className="flex justify-center p-4">
          <button
            className="bg-brand-light-green mb-6 w-full md:w-1/2 lg:w-1/3 text-white px-4 py-2 text-lg 
          rounded-md shadow-md transform active:translate-y-1 active:scale-95 transition-transform"
            onClick={handleGetSuggestions}
          >
            Generate!
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuggestionsInput;
