import React from "react";

interface ResponseBoxProps {
  response: string;
}

const ResponseBox: React.FC<ResponseBoxProps> = ({ response }) => {
  if (!response) return null;

  return (
    <div
      style={{
        margin: "20px auto",
        padding: "20px",
        maxWidth: 600,
        backgroundColor: "#f0f0f0",
        color: "#222",
        borderRadius: 10,
        fontFamily: "monospace",
        whiteSpace: "pre-wrap",
        fontSize: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {response}
    </div>
  );
};

export default ResponseBox;
