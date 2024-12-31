import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJson = async function (apiUrl) {
  try {
    const response = await Promise.race([fetch(apiUrl), timeout(TIMEOUT_SEC)]);
    if (!response.ok)
      throw new Error(
        `Sorry! Can't find the recipe. Status: ${response.status}`
      );
    return await response.json();
  } catch (err) {
    throw err;
  }
};

export const sendJson = async function (apiUrl, uploadData) {
  try {
    const fetchPro = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });

    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    if (!response.ok)
      throw new Error(
        `Sorry! Can't find the recipe. Status: ${response.status}`
      );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
