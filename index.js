import { io } from "socket.io-client";
import { generateScreenshot } from "./services/genFile.js";
// import { printTicket } from "./services/printEscpos.js";
import baseConfig from "./config.js";

const socket = io(baseConfig.socket.url);

//cek koneksi
socket.on("connect", () => {
  console.log("Connected to server");
  socket.emit("status", { status: "connected" });
});

socket.on("test", (data) => {
  console.log("Disconnected from server", data);
});

socket.on(baseConfig.socket.topik.printNomorAntrean, async (data) => {
  console.log("Received print-ticket event:", data);
  const fileURLToPath = await generateScreenshot(data);
  // await printTicket(fileURLToPath);

  setTimeout(() => {
    console.log("Printing ticket...");
    socket.emit("status", { status: "printed" });
  }, 5000);
});
