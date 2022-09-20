const fs = require("fs");
fs.writeFileSync(
  "./.env",
  `REACT_APP_CLIENT_ID=${process.env.REACT_APP_CLIENT_ID}\nREACT_APP_BASE_URL=${process.env.REACT_APP_BASE_URL}\n`
);
