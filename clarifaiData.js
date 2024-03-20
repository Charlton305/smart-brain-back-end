const PAT = '24250ea9f9924370a28ce9f76bad3cbd';
const USER_ID = 'charlton305';
const APP_ID = 'my-first-application-9rgd3';

export const returnClarifaiRequestOptions = (url) => {
  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": url
          }
        }
      }
    ]
  });

  return {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };
}