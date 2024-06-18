import React, { useRef, useState } from 'react';

const CameraComponent = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [photo, setPhoto] = useState(null);

    const startCamera = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            } catch (error) {
                console.error("Error accessing the camera: ", error);
                alert("Error accessing the camera: " + error.message);
            }
        } else {
            alert("getUserMedia not supported on your browser!");
        }
    };

    const takePhoto = () => {
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, 640, 480);
        const dataUrl = canvasRef.current.toDataURL('image/png');
        setPhoto(dataUrl);
    };

    const uploadPhoto = async () => {
        const response = await fetch('/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: photo }),
        });
        const result = await response.json();
        alert(result.message);
    };

    return (
        <div>
            <video ref={videoRef} width="640" height="480" autoPlay></video>
            <button onClick={startCamera}>Start Camera</button>
            <button onClick={takePhoto}>Snap Photo</button>
            <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
            {photo && (
                <div>
                    <img src={photo} alt="Snapshot" />
                    <button onClick={uploadPhoto}>Upload Photo</button>
                </div>
            )}
        </div>
    );
};

export default CameraComponent;
