import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
});

const printData = {
  instansi: "test",
  layanan: "test",
  nomor_antrean: "test",
  tanggal: "test",
  jam: "test",
  loket: `Loket test`,
};

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);

  // Kirim event ke server
  socket.emit("print_nomor_antrean_1", printData);
  socket.emit("wat", printData);
  console.log("📤 Data dikirim:", printData);

  // Tutup koneksi setelah 3 detik
  setTimeout(() => {
    socket.disconnect();
  }, 3000);
});

socket.on("print_nomor_antrean_1", (msg) => {
  console.log("📩 Chat diterima:", msg);
});

socket.on("disconnect", () => {
  console.log("❌ Disconnected");
});
