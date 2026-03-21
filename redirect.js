exports.handler = async (event) => {
  const path = event.path.split("/").pop();

  const BIN_ID = "69beeb75b7ec241ddc8d1815";
  const API_KEY = "$2a$10$Fk35Luoxc3X.LjEWROkpI.hrsnL0KYwRNlBJbOACT9iMbPAv/t7M.";

  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: {
      "X-Master-Key": API_KEY
    }
  });

  const data = await res.json();
  const links = data.record?.links || {};

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
