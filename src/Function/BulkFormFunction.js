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
