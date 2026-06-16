export const uploadToImgBB = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  
  const apiKey = process.env.REACT_APP_IMGBB_API_KEY;
  if (!apiKey) throw new Error("ImgBB API key is missing");

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: 'POST',
    body: formData
  });

  const data = await response.json();
  if (data.success) {
    return data.data.url;
  } else {
    throw new Error(data.error?.message || "Image upload failed");
  }
};
