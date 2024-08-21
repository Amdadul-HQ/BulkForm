const BulkForm = () => {
  return (
    <div className=" min-h-screen max-w-[750px] lg:max-w-7xl pb-10  p-4">
      <div className=" w-full mx-auto mt-10">
      <input
          type="file"
          accept=".png, .jpg, .jpeg, .svg, .webp"
          multiple
          onChange={(e) => handleBulkUploadVideoFile(e, setFiles, user, setFormData)}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <div className=" flex justify-center items-center w-full">
          {!formData.length && (
            <button
              onClick={() => handleBulkUpload()}
              className="w-60 h-48 border rounded-2xl flex flex-col gap-2 justify-center items-center text-5xl text-[#ff0000] mt-20"
            >
              <FaUpload />
              <span className="text-sm text-gray-600 mt-2">
                Upload Preview Images
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkForm;
