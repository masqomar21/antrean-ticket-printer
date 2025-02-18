import { io } from "socket.io-client";
import { generateScreenshot } from "./services/genFile.js";
import { printTicket } from "./services/printEscpos.js";
import baseConfig from "./config.js";
import { testPrint } from "./services/testPrint.js";

const socket = io(baseConfig.socket.url);

//cek koneksi

let cekPrinter = false;
socket.on("connect", () => {
  console.log("Connected to server");
  socket.emit("status", { status: "connected" });
  while (!cekPrinter) {
    console.log("Checking printer...");
    cekPrinter = testPrint();
  }
  console.log("Printer ready!");
});

socket.on(baseConfig.socket.topik.printNomorAntrean, async (data) => {
  const start = new Date();
  console.log("Received print-ticket event:", data);
  const fileURLToPath = await generateScreenshot(data);
  await printTicket(fileURLToPath);
  console.log("Printing ticket done in", new Date() - start, "ms");

  // setTimeout(() => {
  //   console.log("Printing ticket...");
  //   socket.emit("status", { status: "printed" });
  // }, 5000);
});
