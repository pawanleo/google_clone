"use client"
import AudioSearch from "@/components/AudioSearch";
import { useState } from "react";

const ParentComponent = () => {
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsVoiceSearchOpen(true)}>
      Mic
      </button>

      <AudioSearch
        isOpen={isVoiceSearchOpen}
        onClose={() => setIsVoiceSearchOpen(false)}
      />
    </>
  );
};
export default ParentComponent;
