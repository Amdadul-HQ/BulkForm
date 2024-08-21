import PropTypes from "prop-types";
const BulkTagInputFiled = ({
  handleTagChange,
  submitted,
  formData,
  setFormData,
  index,
  className,
}) => {
  return (
    <div className="w-full h-full">
      <input
        type="text"
        placeholder="Tags * (comma-separated)"
        // value={Object.values(data.tags).join(",")}
        onChange={(e) => handleTagChange(index, e, formData, setFormData)}
        className={`w-full lg:w-full outline-none ${className} inline py-2 overflow-hidden ${
          submitted &&
          Object.values(formData[index].tags).some(
            (tag) => tag == "" || tag.length > 20
          )
            ? "bg-red-200 w-full h-full rounded"
            : "w-full h-full"
        } px-2 `}
      />
      {Object.values(formData[index].tags).some((tag) => tag.length > 20) && (
        <p className="text-red-500 text-xs italic">
          Maximum 20 characters are allowed .
        </p>
      )}
      {Object.values(formData[index].tags).some(
        (tag) => !tag.match(/^(?!\s)[a-zA-Z\s,:-]+$/g) && tag !== ""
      ) && <p className="text-red-500 text-xs italic">Invalid Tag format</p>}
    </div>
  );
};

BulkTagInputFiled.propTypes = {
  handleTagChange: PropTypes.func,
  submitted: PropTypes.any,
  formData: PropTypes.any,
  index: PropTypes.number,
  setFormData: PropTypes.func,
  className:PropTypes.string,
};

export default BulkTagInputFiled;
