import React, { useState } from "react";
import "./App.css";

function App() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchRealityDose(input: string): Promise<string> {
    const API_KEY = import.meta.env.VITE_FIREWORKS_API_KEY;

    if (!API_KEY) {
      throw new Error("API key is missing in environment variables");
    }

    const systemPrompt = `
You are "Reality Check Bot," delivering blunt, concise, practical truth. Format:
1) Reality Check: 2-4 sentences identifying flawed assumptions, missing evidence, or hard constraints.
2) If requested, output "Next steps:" and 3 numbered actions the user can do this week.
Tone: Blunt and professional, no insults or abuse.
`;

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: input }
    ];

    const response = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "accounts/sentientfoundation-serverless/models/dobby-mini-unhinged-plus-llama-3-1-8b",
        max_tokens: 4096,
        top_p: 1,
        top_k: 40,
        presence_penalty: 0,
        frequency_penalty: 0,
        temperature: 0.6,
        messages,
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content ?? "No response from API.";
  }

  // Format response text with bullet points for "Next Steps"
  function formatResponse(raw: string) {
    const [rc, stepsBlock] = raw.split(/Next Steps:/i);
    const realityCheck = rc ? rc.trim() : raw.trim();

    let steps: string[] = [];
    if (stepsBlock) {
      steps = stepsBlock
        .split(/\n/)
        .map(line => line.replace(/^\d+\.\s*/, '').trim())
        .filter(line => line.length > 0);
    }

    return (
      <div>
        <div className="rc-head">Reality Check</div>
        <div className="rc-text">{realityCheck}</div>
        {steps.length > 0 && (
          <ul className="rc-list">
            {steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!userInput.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const realityDoseResponse = await fetchRealityDose(userInput);
      setResponse(realityDoseResponse);
    } catch (error: any) {
      setResponse(`Oops, something went wrong. Please try again.\n${error.message}`);
      console.error("API error details:", error);
    }

    setLoading(false);
  };

  return (
    <div className="dose-bg">
      <div className="center-card">
        <div className="dose-title">REALITYDOSE!</div>
        <textarea
          className="dose-input"
          rows={6}
          placeholder="Drop your dream, hot take, or excuse..."
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          disabled={loading}
        />
        <button
          className="dose-btn"
          onClick={handleSubmit}
          disabled={loading || !userInput.trim()}
        >
          {loading ? "Thinking..." : "slap me"}
        </button>
        {response && (
          <div className="dose-response">
            {formatResponse(response)}
          </div>
        )}
      </div>
      <div className="dose-footer">Built by surojitpvt</div>
    </div>
  );
}

export default App;
