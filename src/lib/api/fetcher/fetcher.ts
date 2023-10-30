/* eslint-disable @typescript-eslint/no-explicit-any */
export const fetcher = async (url: string, method: string, token: string, body: any) => {
   const headers = {
    Accept: "application/json", 
     "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',
  };

  try {
    const response = await fetch(url, {
      headers: token ? { ...headers, Authorization: `Bearer ${token}` } : headers,
      method,
      body: body ? JSON.stringify(body) : null,
    });
    const { ok, status, statusText } = response;
    if (ok) {
      try {
        const data = await response.json();
        return { data, status, statusText };
      } catch (e: any) {
        return { error: true, status, statusText: e.message };
      }
    } else {
      return { error: true, status, statusText };
    }
  } catch (e: any) {
    // network error
    return { error: true, statusText: e.message };
  }
};

export const fetcherXml = async (url: string, method: string, token: string, body: any) => {
  const headers = {
    Accept: "application/xml",
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',
  };

  try {
    const response = await fetch(url, {
      headers: token ? { ...headers, Authorization: `Bearer ${token}` } : headers,
      method,
      body: body ? JSON.stringify(body) : null,
    });
    const { ok, status, statusText } = response;
    if (ok) {
      try {
        const data = await response.text();
        return { data, status, statusText };
      } catch (e: any) {
        return { error: true, status, statusText: e.message };
      }
    } else {
      return { error: true, status, statusText };
    }
  } catch (e: any) {
    return { error: true, status: 0, statusText: e.message };
  }
};