import React, { useState, useRef, useEffect } from 'react';
import { Cattle } from '../types';
import { GoogleGenAI } from '@google/genai';

interface AddCattleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddCattle: (cattle: Omit<Cattle, 'id' | 'sellerId' | 'dateListed'>) => void;
}

const AddCattleModal: React.FC<AddCattleModalProps> = ({ isOpen, onClose, onAddCattle }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isScanning, setIsScanning] = useState(false);

    // Video Recording State
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
    const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
    const recordedChunksRef = useRef<Blob[]>([]);

    // AI Video Generation State
    const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
    const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
    const [generationStatus, setGenerationStatus] = useState('');
    
    const [formData, setFormData] = useState({
        breed: '',
        age: '',
        gender: 'Male',
        weight: '',
        location: '',
        price: '',
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleScanQr = async () => {
        setIsScanning(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setTimeout(() => {
                 alert('QR Code Scanned! Cattle ID: 12345XYZ');
                 setIsScanning(false);
                 if (videoRef.current && videoRef.current.srcObject) {
                    (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
                 }
            }, 3000);
        } catch (error) {
            console.error("Error accessing camera:", error);
            alert("Could not access camera. Please ensure permissions are granted.");
            setIsScanning(false);
        }
    };

    const cleanupCamera = () => {
        if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
            setVideoStream(null);
        }
        if (isRecording) {
            mediaRecorderRef.current?.stop();
            setIsRecording(false);
        }
    };
    
    useEffect(() => {
        return () => {
            cleanupCamera();
        };
    }, [isOpen]);

    const handleStartRecording = async () => {
        setRecordedVideoUrl(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setVideoStream(stream);
            if(videoRef.current) videoRef.current.srcObject = stream;
            
            recordedChunksRef.current = [];
            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;
            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunksRef.current.push(event.data);
                }
            };
            recorder.onstop = () => {
                const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                setRecordedVideoUrl(url);
                cleanupCamera();
            };
            recorder.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing media devices.", err);
            alert("Could not access camera/microphone. Please ensure permissions are granted.");
        }
    };

    const handleStopRecording = () => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
    };

    const handleGenerateAiVideo = async () => {
        setGeneratedVideoUrl(null);

        try {
            const hasKey = await window.aistudio.hasSelectedApiKey();
            if (!hasKey) {
                await window.aistudio.openSelectKey();
            }
        } catch (e) {
            // This can happen if the user closes the dialog.
            if (process.env.NODE_ENV === 'development') {
                console.log("API Key selection cancelled or failed.", e);
            }
            return;
        }

        setIsGeneratingVideo(true);
        setGenerationStatus("Initializing AI model...");

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const { breed, age, weight, gender, location } = formData;
            const prompt = `Create a short, cinematic promotional video for a ${age}-year-old ${gender} ${breed} from ${location}, weighing approximately ${weight} kg. Highlight its strength, health, and premium quality. Show it in a beautiful, serene farm environment.`;
            
            setGenerationStatus("Crafting the script...");
            let operation = await ai.models.generateVideos({
                model: 'veo-3.1-fast-generate-preview',
                prompt: prompt,
                config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
            });

            setGenerationStatus("Generating scenes (this can take a few minutes)...");
            while (!operation.done) {
                await new Promise(resolve => setTimeout(resolve, 10000));
                operation = await ai.operations.getVideosOperation({ operation: operation });
            }
            
            setGenerationStatus("Finalizing video...");
            const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
            if (downloadLink) {
                 const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
                 const videoBlob = await response.blob();
                 const videoUrl = URL.createObjectURL(videoBlob);
                 setGeneratedVideoUrl(videoUrl);
            } else {
                 throw new Error("Video generation did not return a valid link.");
            }

        } catch (error: any) {
            console.error("AI video generation failed:", error);
            if (error.message.includes("Requested entity was not found")) {
                alert("AI video generation failed. The selected API Key may be invalid. Please try selecting another key.");
                // Optionally reset key state here
            } else {
                alert(`An error occurred during AI video generation: ${error.message}`);
            }
        } finally {
            setIsGeneratingVideo(false);
            setGenerationStatus('');
        }
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center backdrop-blur-sm p-4">
            <div className="bg-white/95 rounded-2xl shadow-2xl w-full max-w-2xl border border-[#8B4513]/30 max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-[#8B4513]/30 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-sm z-10">
                    <h2 className="text-2xl font-bold text-[#654321]">Register New Cattle</h2>
                    <button onClick={onClose} className="text-[#8B4513] hover:text-[#A0522D] transition-all duration-300 transform hover:scale-125"><i className="fas fa-times text-xl"></i></button>
                </div>
                <div className="p-6">
                     <form className="space-y-4">
                        <button type="button" onClick={handleScanQr} className="group relative w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white font-bold rounded-xl hover:from-[#A0522D] hover:to-[#8B4513] transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8B4513]/70 border-2 border-[#654321]/30 active:scale-100 active:translate-y-0">
                           <span className="relative z-10"><i className="fas fa-qrcode"></i> Add Cattle via QR Tag Scanning</span>
                           <span className="absolute inset-0 bg-white/20 rounded-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                        </button>
                        {isScanning && <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg h-64 object-cover bg-black"></video>}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <input name="breed" value={formData.breed} onChange={handleFormChange} type="text" placeholder="Breed" className="w-full bg-white text-[#654321] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513] border border-[#8B4513]/30"/>
                           <input name="age" value={formData.age} onChange={handleFormChange} type="number" placeholder="Age (years)" className="w-full bg-white text-[#654321] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513] border border-[#8B4513]/30"/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <select name="gender" value={formData.gender} onChange={handleFormChange} className="w-full bg-white text-[#654321] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513] border border-[#8B4513]/30">
                                <option>Male</option>
                                <option>Female</option>
                             </select>
                           <input name="weight" value={formData.weight} onChange={handleFormChange} type="number" placeholder="Weight (kg)" className="w-full bg-white text-[#654321] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513] border border-[#8B4513]/30"/>
                        </div>
                         <input name="location" value={formData.location} onChange={handleFormChange} type="text" placeholder="Location" className="w-full bg-white text-[#654321] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513] border border-[#8B4513]/30"/>
                         <input name="price" value={formData.price} onChange={handleFormChange} type="number" placeholder="Price (PKR)" className="w-full bg-white text-[#654321] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513] border border-[#8B4513]/30"/>

                        <div>
                            <label className="text-[#654321]">Upload Photos & Videos</label>
                            <div className="mt-1 p-4 bg-[#F5F5DC]/60 rounded-lg border border-[#8B4513]/30 space-y-4">
                               <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-[#8B4513]/30 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <i className="fas fa-images mx-auto h-12 w-12 text-[#8B4513]/50"></i>
                                        <p className="text-sm text-[#8B4513]">Drag & drop photos or click to upload</p>
                                    </div>
                               </div>
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                   <button type="button" onClick={isRecording ? handleStopRecording : handleStartRecording} className={`group relative w-full flex items-center justify-center gap-2 px-4 py-3 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl border-2 active:scale-100 active:translate-y-0 ${isRecording ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white hover:shadow-red-500/70 border-red-400/30' : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white hover:shadow-blue-500/70 border-blue-400/30'}`}>
                                       <span className="relative z-10"><i className={`fas ${isRecording ? 'fa-stop-circle' : 'fa-video'}`}></i> {isRecording ? 'Stop Recording' : 'Record Video'}</span>
                                       <span className="absolute inset-0 bg-white/20 rounded-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                                   </button>
                                   <button type="button" onClick={handleGenerateAiVideo} disabled={isGeneratingVideo} className="group relative w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#8B4513] to-[#A0522D] hover:from-[#A0522D] hover:to-[#8B4513] text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8B4513]/70 border-2 border-[#654321]/30 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:border-gray-400 disabled:shadow-none active:scale-100 active:translate-y-0">
                                       <span className="relative z-10"><i className="fas fa-magic"></i> {isGeneratingVideo ? 'Generating...' : 'Generate AI Video'}</span>
                                       <span className="absolute inset-0 bg-white/20 rounded-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left disabled:hidden"></span>
                                   </button>
                               </div>
                                {isGeneratingVideo && <div className="text-center text-[#8B4513] animate-pulse">{generationStatus}</div>}
                                {(videoStream || recordedVideoUrl || generatedVideoUrl) && (
                                    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
                                        <video ref={videoRef} src={recordedVideoUrl || generatedVideoUrl || ''} autoPlay={!recordedVideoUrl && !generatedVideoUrl} playsInline controls={!!recordedVideoUrl || !!generatedVideoUrl} className="w-full h-full object-cover"></video>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Health records and other fields... */}
                        
                        <div className="pt-5 flex justify-end gap-4">
                             <button type="button" onClick={onClose} className="group relative px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded-xl hover:from-gray-600 hover:to-gray-500 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gray-500/60 border-2 border-gray-400/30 active:scale-105 active:translate-y-0">
                                 <span className="relative z-10">Cancel</span>
                                 <span className="absolute inset-0 bg-white/20 rounded-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                             </button>
                             <button type="submit" className="group relative px-6 py-3 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white font-bold rounded-xl hover:from-[#A0522D] hover:to-[#8B4513] transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8B4513]/70 border-2 border-[#654321]/30 active:scale-105 active:translate-y-0">
                                 <span className="relative z-10">Add Cattle</span>
                                 <span className="absolute inset-0 bg-white/20 rounded-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                             </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCattleModal;