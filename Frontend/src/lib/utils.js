import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export async function uploadFileToRoboflow(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // Convert the file to base64
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64data = reader.result.split(",")[1]; 

      // API call to upload the image to Roboflow
      try {
        const response = await axios({
          method: "POST",
          url: "https://api.roboflow.com/dataset/railway-madan-sih/2/upload",
          params: {
            api_key: "BhDw1Gy7Gk2kWEe9UpPw", 
            name: file.name,
            split: "train", // or "valid" or "test"
            batch: "YOUR_BATCH_NAME" // You can customize this
          },
          data: base64data,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        });

        resolve(response.data); // Resolve with the response data
      } catch (error) {
        reject(error.message); // Reject with the error message
      }
    };

    reader.onerror = (error) => reject(error);
  });
};
