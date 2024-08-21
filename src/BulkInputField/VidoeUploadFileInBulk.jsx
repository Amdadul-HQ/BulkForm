import { MdDownloadDone } from "react-icons/md";
import { FaUpload } from "react-icons/fa";
import { useRef, useState } from "react";
import getFileName, { fileUploader } from "../Function/BulkFormFunction";
import PropTypes from "prop-types";

const VidoeUploadFileInBulk = ({
    index,
    accept,
    label,
    name,
    formData,
    setFormData,
    cssCondition,
  })  => {
    const videoFileInputRef = useRef() 
    const [path,setPath] = useState('')
    const pathDefine = (str) =>{
      return str.split("\\").pop()
    }

    const handleFile = async () =>{
      videoFileInputRef.current.click()
    }
    return (
        <>
        <div onClick={()=>handleFile()} className={`absolute flex px-3 ${path ? 'justify-start' : 'justify-center'} items-center border rounded cursor-pointer border-slate-300 w-full h-full gap-x-3`}>{path ? <MdDownloadDone/>:  <FaUpload/> }{path ? getFileName(path) : label}</div>
        <input
          ref={videoFileInputRef}
          type="file"
          accept={accept}
          name={name}
          onChange={(e) => {fileUploader(index, e, formData, setFormData, name)
            if(e.target.value){
              setPath(pathDefine(e.target.value))
            }
          }}
          className={`h-10 relative py-2 visible-none cursor-pointer opacity-0 z-50 my-auto ${cssCondition}`}
        />
        </>
    );
};

VidoeUploadFileInBulk.propTypes = {
    checked:PropTypes.node,
    accept: PropTypes.string,
    formData: PropTypes.array,
    index: PropTypes.number,
    name: PropTypes.string,
    setFormData: PropTypes.func,
    cssCondition: PropTypes.string,
    label: PropTypes.string,
  };

export default VidoeUploadFileInBulk;

