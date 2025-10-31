// SoundButton.jsx
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";

export default function SoundButton({ src, levelKey, delay = 1000 }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }

    const audio = new Audio(src);
    audioRef.current = audio;

    const t = setTimeout(() => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }, delay);

    return () => {
      clearTimeout(t);
      audio.pause();
      audio.src = "";
    };
  }, [levelKey, src, delay]); 

  const handleClick = () => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
    a.play().catch(() => {});
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white hover:bg-[#E8F6FF] rounded-full p-3 shadow-md hover:scale-105 transition"
      aria-label="Play sound"
    >
      <FontAwesomeIcon icon={faVolumeUp} className="text-[#0094FF] text-xl" />
    </button>
  );
}
