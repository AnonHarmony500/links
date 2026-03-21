exports.handler = async (event) => {
  const path = event.path.replace("/", "");

  const BIN_ID = "YOUR_BIN_ID";
  const API_KEY = "YOUR_API_KEY";

  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: {
      "X-Master-Key": API_KEY
    }
  });

  const data = await res.json();
  const links = data.record.links;

  if (links[path]) {
    return {
      statusCode: 302,
      headers: {
        Location: links[path]
      }
    };
  }

  return {
    statusCode: 404,
    body: "Link not found"
  };
};
