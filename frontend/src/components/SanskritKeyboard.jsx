import React from "react";

const sanskritCharacters = [
  "अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ए", "ऐ", "ओ", "औ",
  "क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ",
  "ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न",
  "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श", "ष", "स", "ह"
];

const SanskritKeyboard = ({ onKeyClick }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(40px,1fr))] gap-2 p-4 bg-gray-100 rounded-lg mt-2">
      {sanskritCharacters.map((char) => (
        <button
          key={char}
          className="bg-gray-200 px-3 py-2 rounded text-sm md:text-base hover:bg-gray-300"
          onClick={() => onKeyClick(char)}
        >
          {char}
        </button>
      ))}
    </div>
  );
};

export default SanskritKeyboard;
