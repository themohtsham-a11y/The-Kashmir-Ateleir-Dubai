import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ka_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function streamAIConsult({ session_id, message, onChunk, onDone }) {
  const res = await fetch(`${API}/ai/consult`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id, message, history: [] }),
  });
  if (!res.ok || !res.body) {
    onDone?.(new Error("Stream failed"));
    return;
  }
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    onChunk?.(decoder.decode(value));
  }
  onDone?.();
}
