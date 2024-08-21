import { useState } from "react";
import { handleBulkUploadVideoFile } from "../Function/BulkFormFunction";
import { useRef } from "react";
import { FaUpload } from "react-icons/fa";
import { formRegex } from "../Regex/regex";
import { MdDeleteForever } from "react-icons/md";

const BulkForm = () => {
    const [files,setFiles] = useState([]);
    const user = 'rimon@gmail.com';
    const [formData,setFormData]= useState([]);
    const fileInputRef = useRef(null);
    const [submitted, setSubmitted] = useState(false);
    const handleBulkUpload =async () =>{
        fileInputRef.current.click();
      }
    
  return (
    <div className=" min-h-screen max-w-[750px] mx-auto lg:max-w-7xl pb-10  p-4">
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
        {files?.length > 0 && (
          <p className="text-end text-gray-700">
            Total Selected File {files?.length}
          </p>
        )}
        {formData?.map((data, index) => {
          return (
            <div
              key={index}
              className={`grid grid-cols-3 border  p-4 rounded-lg shadow mt-3 ${
                submitted &&
                (!formData[index].title.match(formRegex) ||
                  !formData[index].metaTitle.match(formRegex) ||
                  Object.values(formData[index].tags).some(
                    (tag) => tag == "" || tag.length > 40
                  ) ||
                  Object.values(formData[index].tags).some(
                    (tag) => !tag.match(/^(?!\s)[a-zA-Z\s,:-]+$/g) && tag !== ""
                  ) ||
                  !formData[index].metaDescription.match(formRegex) ||
                  !formData[index].description.match(formRegex) ||
                  !formData[index].file.length ||
                  !formData[index].type.length ||
                  !formData[index].subCategories.length)
                  ? "border-red-500 shadow-red-700 shadow-sm border-rounded border-2"
                  : ""
              }`}
            >
              <div className="border m-2 md:mb-6 flex-1 rounded-lg w-28 flex  justify-center ">
                <img
                  src={data.thumbnail}
                  alt={`Preview ${index}`}
                  className="p-1 rounded-xl"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </div>
              {/* Delete row */}
              <div></div>
              <div className="flex justify-end  mt-4 ">
                <button
                  className="w-12 h-12 border rounded-xl bg-red-500 text-white"
                  onClick={() =>
                    deleteFiledHandler(
                      index,
                      files,
                      setFiles,
                      formData,
                      setFormData
                    )
                  }
                >
                  <span className="flex justify-center text-3xl">
                    <MdDeleteForever />
                  </span>
                </button>
              </div>

              {/* Title */}
              <div className="relative m-2 md:mb-5 flex-1">
                <BulkUploadInputField
                  title={`title`}
                  condition={
                    submitted && !formData[index].title ? "bg-red-100" : ""
                  }
                  label={`Title`}
                  type={"text"}
                  formData={formData}
                  setFormData={setFormData}
                  handleChangeFn={handleChange}
                  index={index}
                  value={data?.title}
                  minLength={1}
                />
              </div>

              {/* Meta Title */}
              <div className="relative m-2 md:mb-5 flex-1">
                <BulkUploadInputField
                  title={`metaTitle`}
                  condition={
                    submitted && !formData[index].metaTitle ? "bg-red-100" : ""
                  }
                  label={`Meta Title`}
                  type={"text"}
                  formData={formData}
                  setFormData={setFormData}
                  handleChangeFn={handleChange}
                  // handleChangeFn={handleTitleChange}
                  index={index}
                  value={data?.metaTitle}
                  minLength={1}
                />
              </div>

              {/* Category */}
              <div className="relative m-2 md:mb-5 flex-1">
                <BulkUploadInputField
                  readOnly
                  title={`category`}
                  condition={
                    submitted && !formData[index].category ? "bg-red-100" : ""
                  }
                  label={`Category`}
                  defaultValue={"video-template"}
                  type={"text"}
                  formData={formData}
                  setFormData={setFormData}
                  handleChangeFn={handleChange}
                  // handleChangeFn={handleTitleChange}
                  index={index}
                  value={data?.category}
                  minLength={1}
                />
              </div>
              {/*  Sub Category */}
              <div className="relative m-2 col-span-1 md:mb-5 flex-1">
                <Autocomplete
                  multiple
                  className={
                    submitted && !data.subCategories.length ? `bg-red-100` : ""
                  }
                  size="small"
                  limitTags={1}
                  id="multiple-limit-tags"
                  options={videoTemplateSubCategoryConstant?.subCategory}
                  getOptionLabel={(option) => option.subCategoryName}
                  defaultValue={
                    Array.isArray(subCategory)
                      ? subCategory?.map((value) => value)
                      : []
                  }
                  onChange={(event, value) => {
                    const stringValue = value?.map(
                      (item) => item.subCategoryLink
                    );

                    changeAutoComplete(
                      index,
                      stringValue,
                      formData,
                      setFormData,
                      "subCategories"
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Sub Category"
                      placeholder="Select Sub Category"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                            borderColor: "#ff0000",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#ff0000",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#ff0000",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#ff0000",
                        },
                      }}
                    />
                  )}
                  sx={{
                    width: "100%",
                    /* '& .MuiChip-root': {
              backgroundColor: '#ff0000',
              color: '#fff',
            }, */
                  }}
                />
              </div>

               {/*  Type */}
               <div className="relative m-2 col-span-1 md:mb-5 flex-1">
                <Autocomplete
                  multiple
                  className={submitted && !data.type.length ? `bg-red-100` : ""}
                  size="small"
                  limitTags={1}
                  id="multiple-limit-tags"
                  options={videoFileType?.fileType}
                  getOptionLabel={(option) => option.name}
                  defaultValue={
                    Array.isArray(fileType)
                      ?fileType?.map((value) => value)
                      : []
                  }
                  onChange={(event, value) => {
                    const stringValue = value?.map((item) => item.link);

                    changeAutoComplete(
                      index,
                      stringValue,
                      formData,
                      setFormData,
                      "type"
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="File Type"
                      placeholder="Select Asset Type"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                            borderColor: "#ff0000",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#ff0000",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#ff0000",
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#ff0000",
                        },
                      }}
                    />
                  )}
                  sx={{
                    width: "100%",
                  }}
                />
              </div>

              <div className="relative m-2 mb-5 flex-1">
            <Autocomplete
              size="small"
              limitTags={1}
              id="single-limit-tag"
              options={
                videoTemplateApplicationSupportedConstant?.applicationSupported
              }
              getOptionLabel={(option) => option?.name}
              //   defaultValue={}
              onChange={(event, value) => setApplicationSupported(value.name)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Application Supported"
                  placeholder="Select Application Supported"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#ff0000",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#ff0000",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ff0000",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#ff0000",
                    },
                  }}
                />
              )}
              sx={{
                width: "100%",
                /* '& .MuiChip-root': {
              backgroundColor: '#ff0000',
              color: '#fff',
            }, */
              }}
            />
            <span className={`error-message ${errorSpanClass}`}>
              {applicationSupportedErrorMessage}
            </span>
          </div>

              {/* Tags */}
              <div className="relative m-2 col-span-1 md:mb-6 flex-1">
                <div className="border border-slate-300 h-10 w-[96%] mx-auto lg:mx-0 lg:w-full rounded text-slate-500  py-[1px] my-1 lg:my-0 flex flex-wrap gap-1 text-xs">
                  <BulkIconTagInputFiled
                    formData={formData}
                    setFormData={setFormData}
                    handleTagChange={handleTagChange}
                    submitted={submitted}
                    index={index}
                    // value={data?.alternativeText}
                  />
                </div>
              </div>

              <div className="relative m-2 mb-6 flex-1">
              {/* index={index}
                  cssCondition={
                    submitted && !data.file.length ? `bg-red-100` : ""
                  }
                  accept=".zip, .png"
                  formData={formData}
                  setFormData={setFormData}
                  id={`${index}`}
                  name="file" */}
            {/* Main file input field ----------*/}
            {/* !formData[index].file.length */}
            <VidoeUploadFileInBulk
            index= {index}
            cssCondition={
                submitted &&!data.file.length
                 ? `bg-red-100`
                  : ""
              }
            accept={".zip, .png"}
            formData={formData}
            setFormData={setFormData}
            title={"choosenFile"}
            id={`main${index}`}
            name={"main-file"}
            label={"Main File"}
              />
              {/* <UploadFileInBulk
                    index={index}
                    cssCondition={
                      submitted && !data.file.length ? `bg-red-100` : ""
                    }
                    accept=".zip, .png"
                    formData={formData}
                    setFormData={setFormData}
                    id={`main${index}`}
                    name="main-file"
                  /> */}
            <span className={`error-message ${errorSpanClass}`}>
              {/* {messageZip ? messageZip : errors?.choosenFile?.message} */}
            </span>
          </div>

          <div className="relative m-2 mb-6 flex-1">
            {/* <VidoeUploadFileInBulk
            checked={formData[index].file.length}
            index={index}
            formData={formData}
            setFormData={setFormData}
              cssCondition={
                submitted &&!data.file.length
                 ? `bg-red-100`
                  : ""
              }
            title={"previewFile"}
            label={"Preview File"}
            name={`Preview File-${+index}`}
            accept={".mp4"}
            /> */}
            <VidoeUploadFileInBulk
            index= {index}
            cssCondition={
                submitted &&!data.file.length
                 ? `bg-red-100`
                  : ""
              }
            accept={".mp4"}
            formData={formData}
            setFormData={setFormData}
            id={`preview${index}`}
            name={"previewFile"}
            label={"Preview File"}
            />
           {/* <UploadFileInBulk
                  index={index}
                  cssCondition={
                    submitted && !data.file.length ? `bg-red-100` : ""
                  }
                  accept=".mp4"
                  formData={formData}
                  setFormData={setFormData}
                  id={`preview${index}`}
                  name="previewFile"
                /> */}

            <span className={`error-message ${errorSpanClass}`}>
              {/* {messageVideo ? messageVideo : errors?.previewFile?.message} */}
              
            </span>
          </div>

              {/*  File */}
              {/* <div className="relative m-2 col-span-2 md:mb-5 flex-1 ">
                <UploadFileInBulk
                  index={index}
                  cssCondition={
                    submitted && !data.file.length ? `bg-red-100` : ""
                  }
                  accept=".zip, .png"
                  formData={formData}
                  setFormData={setFormData}
                  id={`${index}`}
                  name="file"
                />
              </div> */}

              {/*  Description */}
              <div className="col-span-3 flex">
              <div className="relative m-2 col-span-2 md:mb-6 flex-1">
                <BulkUploadDescriptionInputField
                  condition={
                    submitted && !formData[index].description
                      ? "bg-red-100"
                      : ""
                  }
                  maxLength={160}
                  title={"description"}
                  label={"Description *"}
                  formData={formData}
                  setFormData={setFormData}
                  handleChangeFn={handleChange}
                  index={index}
                  value={data?.description}
                />
              </div>

              {/*  Meta Description */}
              <div className="relative m-2 col-span-2 md:mb-6 flex-1">
                <BulkUploadDescriptionInputField
                  condition={
                    submitted && !formData[index].metaDescription
                      ? "bg-red-100"
                      : ""
                  }
                  maxLength={160}
                  title={"metaDescription"}
                  label={"Meta Description *"}
                  formData={formData}
                  setFormData={setFormData}
                  handleChangeFn={handleChange}
                  index={index}
                  value={data?.metaDescription}
                />
              </div>
              {/* --------------------------- */}
              </div>
            </div>
          );
        })}
         {/* uploading section  */}
         {formData?.length > 0 && (
          <div className="flex items-center justify-center mt-10">
              <button
                onClick={() => handleVideoTemplateUpload()}
                className="inline-flex items-center justify-center w-32 h-10 bg-[#ff0000] hover:bg-white text-xs md:text-[12px] border-[1px] border-[#ff0000] lg:text-[15px] font-medium tracking-wide text-white hover:text-[#ff0000]  transition duration-300 rounded-lg hover-visible:outline-none whitespace-nowrap  hover:shadow-2xl uppercase hover:cursor-pointer"
              >
                Upload
              </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkForm;
