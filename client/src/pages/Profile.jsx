import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Profile = () => {
  const { currentUser, isLoading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const imageRef = useRef(null);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");
  const [imageError, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(selected.type)) {
      setError("Only JPEG, JPG, PNG or WEBP images are allowed.");
      setFile(null);
      return;
    }

    // Validate file size (2MB = 2 * 1024 * 1024)
    if (selected.size > 2 * 1024 * 1024) {
      setError("File size must be less than 2MB.");
      setFile(null);
      return;
    }

    setError("");
    setFile(selected);
  };

  useEffect(() => {
    if(file){
      handleUpload();
    }
  }, [file]);

  const handleUpload = () => {
    if (!file) {
      setError("Please choose a valid image.");
      return;
    }

    const fileRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (err) => {
        console.error("Upload error:", err);
        setError("Upload failed.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadURL(url);
          setError("");
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {

  }

  return (
    <div className="max-w-lg p-5 mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          hidden
          ref={imageRef}
        />
        <img
          src={currentUser.profilePicture}
          alt=""
          className="w-24 h-24 rounded-full self-center object-cover cursor-pointer"
          onClick={() => imageRef.current.click()}
        />
        {uploadProgress > 0 && uploadProgress < 100 && (
          <p className="text-sm">Uploading: {uploadProgress.toFixed(0)}%</p>
        )}

        {error && <p className="text-red-500 mt-2">{error}</p>}
        <input
          type="text"
          name="username"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Username"
          id="username"
          value={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Email"
          id="email"
          value={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Password"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={isLoading}
          className="bg-slate-700 p-3 rounded-lg text-white hover:opacity-95 uppercase disabled:opacity-80 cursor-pointer"
        >
          {isLoading ? "Loading..." : "update"}
        </button>
      </form>
      <div className="text-red-700 mt-5 flex justify-between">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
