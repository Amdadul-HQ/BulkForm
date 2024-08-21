import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { textAreaClass } from "../Function/BulkFormFunction";

const BulkUploadDescriptionInputField = ({
  label,
  defaultValue = "",
  handleChangeFn,
  index,
  formData,
  setFormData,
  condition,
  value,
  regex = /^(?!\s)[\w\s:.\-,$%&()!@#^*;"'-+\\[\]=`/]+$/gm,
  maxLength = 70,
  minLength = 50,
  title,
}) => {
  const [error, setError] = useState("");
  const validateInput = (text) => {
    if (!text.match(regex) && value) {
      setError(`Invalid ${title} format`);
    } else if (value && value.length < minLength && label !== "Category") {
      setError(`${title} must have a minimum of ${minLength} characters`);
    } else if (value && value.length > maxLength && label !== "Category") {
      setError(`${title} cannot exceed ${maxLength} characters`);
    } else {
      setError("");
    }
  };

  useEffect(() => {
    validateInput(value);
  }, [value]);

  const handleBlur = (e) => {
    const newValue = e.target.value;
    validateInput(newValue);
  };
  return (
    <div>
      <TextField
        id="outlined-multiline-static"
        label={label}
        className={`${textAreaClass} customTextField ${condition} `}
        defaultValue={defaultValue}
        multiline
        rows={4}
        sx={{
          fieldset: { borderColor: "#cbd5e1" },
        }}
        value={value}
        onBlur={handleBlur}
        onChange={(e) => handleChangeFn(index, e, formData, setFormData, title)}
        variant="outlined"
      />
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};

BulkUploadDescriptionInputField.propTypes = {
  defaultValue: PropTypes.any,
  label: PropTypes.string,
  register: PropTypes.func,
  title: PropTypes.string,
  handleChangeFn: PropTypes.func,
  index: PropTypes.number,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  condition: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  regex: PropTypes.any,
  formData: PropTypes.array,
  setFormData: PropTypes.func,
};

export default BulkUploadDescriptionInputField;