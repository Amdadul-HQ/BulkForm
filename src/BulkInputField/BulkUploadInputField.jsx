import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

const BulkUploadInputField = ({
  title,
  label,
  type,
  defaultValue = "",
  handleChangeFn,
  index,
  readOnly = false,
  formData = [],
  setFormData,
  value,
  condition,
  regex = /^(?!\s)[\w\s:.\-,$%&()!@#^*;"'-+\\[\]=`/]+$/gm,
  maxLength = 70,
  minLength = 1,
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
    <>
      <TextField
        required
        size="small"
        className={`w-full customTextField   ${condition} `}
        id={`${title}`}
        type={type}
        inputProps={{ readOnly }}
        label={label}
        variant="outlined"
        defaultValue={defaultValue}
        sx={{
          fieldset: { borderColor: "#cbd5e1" },
        }}
        value={value}
        onBlur={handleBlur}
        onChange={(e) => handleChangeFn(index, e, formData, setFormData, title)}
      />
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </>
  );
};

export default BulkUploadInputField;
