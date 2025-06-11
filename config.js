// require("dotenv").config();
import "dotenv/config";

const baseConfig = {
  web_url: process.env.WEB_URL,
  socket: {
    url: process.env.SOCKET_URL,
  },
};

export default baseConfig;
