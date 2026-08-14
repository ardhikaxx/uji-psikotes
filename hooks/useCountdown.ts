"use client";

import * as React from "react";

export function useCountdown(
  initialSeconds: number,
  running: boolean,
  onExpire?: () => void
) {
  const [remaining, setRemaining] = React.useState(initialSeconds);
  const onExpireRef = React.useRef(onExpire);

  React.useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  // Reset countdown ketika durasi tes berubah (tes dimulai / dilanjutkan).
  // Membaca nilai dari storage hanya boleh dilakukan setelah mount di browser,
  // sehingga state awal tidak bisa diinisialisasi langsung di useState.
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRemaining(initialSeconds);
  }, [initialSeconds]);

  // Detik berjalan; onExpire hanya dipanggil saat timer benar-benar
  // menghitung mundur hingga nol, bukan saat running baru diaktifkan.
  React.useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setRemaining((s) => {
        if (s <= 1) {
          window.clearInterval(id);
          onExpireRef.current?.();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  return remaining;
}