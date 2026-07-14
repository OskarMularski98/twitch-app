// useTokenManage.js
import useAppState from "@/composables/useAppState";

const { tokenState } = useAppState();

const CLIENT_ID = process.env.VUE_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.VUE_APP_CLIENT_SECRET;

let fetchPromise = null; // shared in-flight promise, module-level

const fetchNewToken = async () => {
  const res = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "client_credentials",
    }),
  });

  if (!res.ok) throw new Error(`Token fetch failed: ${res.status}`);
  const data = await res.json();

  tokenState.value.token = data.access_token;
  tokenState.value.expiresAt = Date.now() + data.expires_in * 1000;

  const refreshInMs = data.expires_in * 1000 - 60 * 1000;
  setTimeout(() => {
    fetchPromise = null; // clear so next getToken() triggers a fresh fetch
    fetchNewToken();
  }, refreshInMs);

  return tokenState.value.token;
};

const useTokenManage = () => {
  const getToken = async () => {
    // valid cached token? just return it
    if (tokenState.value.token && Date.now() < tokenState.value.expiresAt) {
      return tokenState.value.token;
    }
    // fetch already in flight? wait on the same promise instead of starting a new one
    if (!fetchPromise) {
      fetchPromise = fetchNewToken();
    }
    return fetchPromise;
  };

  return { getToken, tokenState };
};

export default useTokenManage;
