import { io } from "socket.io-client";
import { testPrint } from "./services/testPrint.js";
import { generateScreenshot } from "./services/genFile.js";
import { printTicket } from "./services/printEscpos.js";

// Buat koneksi dengan reconnect aktif
const socket = io("https://backend-mpp.newus.id");

// Saat berhasil connect
let cekPrinter = false;
socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);
  console.log("🔗 Transport:", socket.io.engine.transport.name);
  socket.emit("status", { status: "connected" });
  while (!cekPrinter) {
    console.log("Checking printer...");
    cekPrinter = testPrint();
  }

  // Cek printer atau proses lain di sini kalau perlu
  console.log("🖨️ Printer ready!");
});

// Event antrean_print diterima
socket.on("antrean_print", async (msg, ack) => {
  const start = new Date();
  console.log("📩 antrean_print diterima:", msg);

  const fileURLToPath = await generateScreenshot(data);
  console.log("Screenshot generated at:", fileURLToPath);
  await printTicket(fileURLToPath);

  // Proses print, screenshot, dsb (asynchronous boleh pakai await di sini)

  console.log("✅ Print selesai dalam", new Date() - start, "ms");
  console.log("📤 Mengirim ACK ke server...", ack);
  if (ack) ack("ok"); // Kirim ACK ke server (jika server pakai)
});

socket.io.engine.on("upgrade", (transport) => {
  console.log("🔄 Transport upgraded to:", transport.name);
});

// Saat disconnect
socket.on("disconnect", (reason) => {
  console.log("❌ Disconnected. Reason:", reason);
});

// Saat mencoba reconnect
socket.io.on("reconnect_attempt", (attempt) => {
  console.log("🔄 Reconnect attempt:", attempt);
});

// Saat reconnect berhasil
socket.io.on("reconnect", (attempt) => {
  console.log("✅ Reconnected! Attempt:", attempt);
});

// Saat reconnect gagal
socket.io.on("reconnect_failed", () => {
  console.log("❌ Gagal reconnect");
});

// Cek koneksi setiap 10 detik
setInterval(() => {
  if (socket.connected) {
    console.log("🟢 Socket masih nyambung:", socket.id);
  } else {
    console.log("🔴 Socket tidak terhubung. Mencoba reconnect...");
    socket.connect(); // Paksa connect ulang
  }
}, 10000);
