// require("dotenv").config();
import "dotenv/config";

const baseConfig = {
  web_url: process.env.WEB_URL,
  socket: {
    url: process.env.SOCKET_URL || "http://localhost:3000",
    topik: {
      printNomorAntrean:
        process.env.TOPIC_PRINT_NOMOR_ANTREAN || "print_nomor_antrean",
      status: process.env.TOPIC_STATUS || "status",
    },
  },
};

export default baseConfig;
