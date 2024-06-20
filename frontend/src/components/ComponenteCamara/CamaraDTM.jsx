import React, { useEffect, useRef, useState } from 'react';
import { FcCamera } from "react-icons/fc";

const CamaraDTM = () => {
    const videoRef = useRef(null);
    const fotoRef = useRef(null);
    const [foto, setFoto] = useState(null);

    const verCamara = () => {
        navigator.mediaDevices.getUserMedia({
            video: { width: 1920, height: 1080 }
        }).then(stream => {
            let miVideo = videoRef.current;
            if (miVideo) {
                miVideo.srcObject = stream;
                miVideo.play();
            }
        }).catch(err => {
            console.log(err);
        });
    };

    const tomarFoto = () => {
        const video = videoRef.current;
        const fotoCanvas = fotoRef.current;
        if (video && fotoCanvas) {
            const context = fotoCanvas.getContext('2d');
            fotoCanvas.width = video.videoWidth;
            fotoCanvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, fotoCanvas.width, fotoCanvas.height);
            const imageDataUrl = fotoCanvas.toDataURL('image/png');
            setFoto(imageDataUrl);
        }
    };

    useEffect(() => {
        verCamara();
    }, [videoRef]);

    return (
        <div>
            <div>
                <video ref={videoRef}></video>
                <button onClick={tomarFoto}>
                    <FcCamera className='Button' type='button' />
                </button>
            </div>
            {foto && (
                <div>
                    <h2>Foto tomada:</h2>
                    <img src={foto} alt="Foto tomada" />
                </div>
            )}
            <canvas ref={fotoRef} style={{ display: 'none' }}></canvas>
        </div>
    );
};

export default CamaraDTM;
