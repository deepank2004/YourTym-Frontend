import { useState } from "react";
import API from "../services/api";

function KMLUpload() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a KML file");
      return;
    }

    const formData = new FormData();
    formData.append("kml", file);

    try {
      const res = await API.post(
        "/upload-kml",
        formData
      );

      alert(res.data.message);

    } catch (error) {
      console.log(error);
      alert("Upload Failed");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Upload KML File
      </h2>

      <div className="flex gap-4 items-center">

        <input
          type="file"
          accept=".kml"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
          className="border border-gray-300 rounded p-2"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
        >
          Upload
        </button>

      </div>
    </div>
  );
}

export default KMLUpload;