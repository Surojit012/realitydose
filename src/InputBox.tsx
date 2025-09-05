import React from "react";

interface InputBoxProps {
  userInput: string;
  setUserInput: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

const InputBox: React.FC<InputBoxProps> = ({
  userInput,
  setUserInput,
  onSubmit,
  loading,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !loading) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div style={{ width: "90%", maxWidth: 600, margin: "20px auto" }}>
      <textarea
        rows={5}
        placeholder="Drop your dream, hot take, or excuse..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        style={{
          width: "100%",
          fontSize: 18,
          padding: 12,
          borderRadius: 8,
          borderColor: "#4caf50",
          fontFamily: "monospace",
          resize: "vertical",
        }}
      />
      <button
        onClick={onSubmit}
        disabled={loading || !userInput.trim()}
        style={{
          marginTop: 12,
          padding: "14px 20px",
          width: "100%",
          fontSize: 18,
          fontWeight: "bold",
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Slapping..." : "Slap me"}
      </button>
    </div>
  );
};

export default InputBox;
