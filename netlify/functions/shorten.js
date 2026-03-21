exports.handler = async (event) => {
  const { category, url } = JSON.parse(event.body);

  const BIN_ID = 69beeb75b7ec241ddc8d1815;
  const API_KEY = $2a$10$3UHIk7wd7VT0EzjZYDehUOTQTE6nGNrmm.6mr6YjI0gngq10BBjNC;

  // Get current data
  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: {
      "X-Master-Key": API_KEY
    }
  });

  const data = await res.json();
  let links = data.record.links;

  // Find next number
  let count = 1;
  while (links[`${category}-${count}`]) {
    count++;
  }

  const code = `${category}-${count}`;

  // Save new link
  links[code] = url;

  await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY
    },
    body: JSON.stringify({ links })
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      shortUrl: `https://yourdomain.com/${code}`
    })
  };
};
