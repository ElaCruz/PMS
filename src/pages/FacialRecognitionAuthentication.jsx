import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FacialRecognitionAuthentication() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [pinInput, setPinInput] = useState("");

  const MIN_DISTANCE = 50; 
  const SECRET_PIN = "1234"; 

  const handleAuthentication = () => {
    if (!videoRef.current || authenticated) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const faceDistance = calculateFaceDistance();

    if (faceDistance <= MIN_DISTANCE && pin === SECRET_PIN) {
      setAuthenticated(true);
       toast.success("Authenticated successfully!", {
         autoClose: 4000, 
       });
       window.location.href = "/dashboard";
    } else {
        toast.error("Authentication failed. Please try again.", {
        autoClose: 2000, 
        });
    }
  };

  const calculateFaceDistance = () => {
    const canvas = canvasRef.current;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Calculate the distance of the face from the camera using the face size
    const faceWidth = canvasWidth / 3; // Assuming face occupies 1/3rd of the canvas width
    const faceHeight = canvasHeight / 3; // Assuming face occupies 1/3rd of the canvas height

    // Get the distance of the face center from the camera center
    const faceCenterX = canvasWidth / 2;
    const faceCenterY = canvasHeight / 2;
    const distanceX = Math.abs(faceCenterX - canvasWidth / 2);
    const distanceY = Math.abs(faceCenterY - canvasHeight / 2);

    // Calculate the distance using the Pythagorean theorem
    const faceDistance = Math.sqrt(
      distanceX * distanceX + distanceY * distanceY
    );

    return faceDistance;
  };



  const handlePinInputChange = (event) => {
    setPinInput(event.target.value);
  };

  const handlePinSubmit = (event) => {
    event.preventDefault();
    setPin(pinInput);
    setPinInput("");
  };

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error("Error accessing the camera: ", error);
        });
    }
  }, []);

  return (
    <div className="d-flex gap-3 ">
      <div className="d-flex justify-content-center flex-column">
        <video ref={videoRef} autoPlay />
        <form onSubmit={handlePinSubmit}>
          <input className="PIN-input mt-4"
            type="password"
            placeholder="Enter PIN"
            value={pinInput}
            onChange={handlePinInputChange}
          />
          <button type="submit" className="btn btn-success mt-1 ms-3" onClick={handleAuthentication}>
            Authenticate
          </button>
        </form>
      </div>

      <div>
        <canvas ref={canvasRef} />
        {authenticated ? <p className="text-success">Authenticated</p> : <p className="text-danger">Not Authenticated</p>}
        <ToastContainer />
      </div>
    </div>
  );
}

export default FacialRecognitionAuthentication;
