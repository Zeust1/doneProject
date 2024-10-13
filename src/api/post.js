const post = async (data) => {
  const api =
    "https://script.google.com/macros/s/AKfycbzbnmX8E-pMtOVwCHxlZPnMEPlvscWd7O7YehWZTUoqp1odcnLxArxPzj63zfWq1-3_/exec";
  await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    mode: "no-cors"
  })
};

export default post;
