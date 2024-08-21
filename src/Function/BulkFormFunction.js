export const handleBulkUploadVideoFile = (e, setFiles, user, setFormData) => {
  const filesArray = Array.from(e.target.files);
  console.log(filesArray,'filesArray');
  if (filesArray.length > 10) {
      alert("You cannot upload more than 10 files at a time.");
      setFormData([]);
      setFiles([]);
    } else {
        setFiles(filesArray);
    const formDataArray = filesArray.map((file) => ({
      title: "",
      description: "",
      metaTitle: "",
      metaDescription: "",
      category: "video-templates",
      subCategories: [],
      type: [],
      tags: { tag1: "", tag2: "", tag3: "", tag4: "", tag5: "" },
      uploadedUserEmail: user?.email,
      applicationSupport: "",
      file: file,
      previewFile:[],
      thumbnail: URL.createObjectURL(file),
    }));
    setFormData(formDataArray);
  }
};

export const deleteFiledHandler = (
    index,
    files,
    setFiles,
    formData,
    setFormData
  ) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  
    const updatedFormData = [...formData];
    updatedFormData.splice(index, 1);
    setFormData(updatedFormData);
};

export const handleChange = (index, e, formData, setFormData, fieldName) => {
    const updatedFormData = [...formData];
    updatedFormData[index][fieldName] = e.target.value.replace(/\s+/g, " ");
  
    setFormData(updatedFormData);
  };

  export const videoTemplateSubCategoryConstant = {
    subCategory:[
      {
        subCategoryName:"Social media video templates",
        subCategoryLink:"social-media-video-templates",
      },
      {
        subCategoryName:"Youtube video templates",
        subCategoryLink:"youbube-video-templates",
      },
      {
        subCategoryName:"X/Twitter video templates",
        subCategoryLink:"x-twitter-video-templates",
      },
      {
        subCategoryName:"Facebook video templates",
        subCategoryLink:"facebook-video-templates",
      },
      {
        subCategoryName:"Instagram video templates",
        subCategoryLink:"instagram-video-templates",
      },
      {
        subCategoryName:"LinkedIn video templates",
        subCategoryLink:"linkedin-video-templates",
      }
  
    ]
  }

  export const changeAutoComplete = (
    index,
    value,
    formData,
    setFormData,
    fieldName
  ) => {
    const updatedFormData = [...formData];
    updatedFormData[index][fieldName] = value;
    setFormData(updatedFormData);
  };

  export const videoFileType ={
    fileType:[
        {
            name:"Mogrt",
            link:"mogrt"
        },
        {
            name:"Aep",
            link:"aep"
        },
        {
            name:"Mov",
            link:"Mov"
        }
    ]
} 


//   Application Supported 
export const videoTemplateApplicationSupportedConstant = {
    applicationSupported: [
      {
        name: "Premiere Pro",
        link: "premiere-pro",
      },
      {
        name: "After Effects",
        link: "after-effects",
      },
      {
        name: "DaVinci",
        link: "davinci",
      },
    ],
  };

  export const handleTagChange = (index, e, formData, setFormData) => {
    const updatedFormData = [...formData];
    const tagsArray = e.target.value.split(",");
  
    const tagsObject = {};
    tagsArray.forEach((tag, idx) => {
      tagsObject[`tag${idx + 1}`] = tag.trim();
    });
  
    updatedFormData[index].tags = tagsObject;
    setFormData(updatedFormData);
  };


  export const fileUploader = (index, e, formData, setFormData, fieldName) => {
    const updatedFormData = [...formData];
    console.log(e.target.files);
    updatedFormData[index][fieldName] = e.target.files;
  
    setFormData(updatedFormData);
  };

  const getFileName =(fullPath) => {

    if(fullPath.length>30){
      const array = fullPath.split('.')
      const extension = array[array.length-1]
      return fullPath.substring(0, 30) + '...'+ extension;
    }
    const fileNameWithExtension = fullPath.split("\\").pop();

    const fileName = fileNameWithExtension.substring(0, fileNameWithExtension.lastIndexOf("."));

    const fileExtension = fileNameWithExtension.substring(fileNameWithExtension.lastIndexOf("."));

    return `${fileName}${fileExtension}`;
}

export default getFileName;


export const textAreaClass =
  "peer relative w-full rounded border border-slate-300 px-4 pt-2 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-[#ff0000] focus:outline-none";
("peer relative  w-full rounded border border-slate-300 px-4 pt-2 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-[#ff0000] focus:outline-none");