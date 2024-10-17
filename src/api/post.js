const post = async (data) => {
  const api =
    "https://script.google.com/macros/s/AKfycbxpQoohOywiBida4LlUnld6bz_W2k-F8nyznjuzVS0GTyB6XzHkERCorYIFUqd2Z8Fi/exec";
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
