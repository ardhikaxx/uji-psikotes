function sjt(text, options, scores, explanation) {
  const best = scores.indexOf(Math.max(...scores));
  return {
    type: "sjt",
    subtype: "situational-judgment",
    category: "Tes Situasional (SJT)",
    text,
    options,
    correctIndex: best,
    sjtScores: scores,
    explanation,
  };
}

export const sjtPools = {
  "information-technology": [
    sjt(
      "Sebuah sistem produksi mengalami gangguan di tengah hari kerja dan banyak pengguna terdampak. Anda adalah engineer yang bertanggung jawab. Apa tindakan paling tepat?",
      [
        "Segera mengomunikasikan status insiden dan mulai menangani prioritas tertinggi sambil memulihkan layanan.",
        "Menutup semua sistem agar tidak ada yang terpengaruh tanpa koordinasi.",
        "Menunggu laporan lengkap dari pengguna sebelum bertindak.",
        "Mengalihkan tanggung jawab ke tim lain tanpa informasi.",
      ],
      [1.0, 0.33, 0.5, 0.17],
      "Komunikasi insiden yang cepat dan penanganan prioritas adalah praktik terbaik dalam manajemen insiden IT."
    ),
    sjt(
      "Rekan Anda meminta kode yang sudah Anda tulis agar ia dapat menyalinnya untuk menyelesaikan tugasnya. Padahal kode tersebut belum diuji. Apa yang sebaiknya Anda lakukan?",
      [
        "Memberikan kode tersebut karena membantu rekan adalah hal baik.",
        "Menolak mentah-mentah dan meminta ia mengerjakan sendiri.",
        "Menjelaskan bahwa kode belum diuji dan menawarkan membantu mengerjakan bersama dengan benar.",
        "Membiarkan rekan menyalin tanpa komentar.",
      ],
      [0.5, 0.17, 1.0, 0.33],
      "Membantu rekan dengan integritas (kode yang benar dan teruji) lebih baik daripada sekadar menyalin."
    ),
    sjt(
      "Anda menemukan bug kecil pada produk yang akan dirilis hari ini. Perbaikan memerlukan waktu tambahan dan bisa menunda rilis. Keputusan terbaik adalah...",
      [
        "Merilis tanpa perbaikan karena bug dianggap kecil.",
        "Menginformasikan kepada tim dan mengevaluasi dampak bug sebelum memutuskan rilis.",
        "Menunda rilis tanpa memberi tahu siapa pun.",
        "Memperbaiki secara diam-diam tanpa memberi tahu tim.",
      ],
      [0.33, 1.0, 0.17, 0.5],
      "Keputusan rilis harus berdasarkan evaluasi dampak yang transparan bersama tim."
    ),
    sjt(
      "Seorang klien meminta fitur baru yang bertentangan dengan spesifikasi keamanan sistem. Apa yang Anda lakukan?",
      [
        "Mengikuti permintaan klien apa pun risikonya.",
        "Menolak permintaan dan mengakhiri hubungan.",
        "Menjelaskan risiko keamanan dan menawarkan alternatif yang aman.",
        "Diam-diam menerapkan fitur tanpa menyebut risikonya.",
      ],
      [0.17, 0.17, 1.0, 0.33],
      "Profesional IT wajib mengutamakan keamanan sambil tetap melayani kebutuhan klien."
    ),
    sjt(
      "Tim Anda melewati tenggat sprint karena estimasi yang salah. Pimpinan menanyakan penyebabnya. Sikap terbaik Anda adalah...",
      [
        "Menyalahkan anggota tim lain.",
        "Mengakui kesalahan estimasi dan mengusulkan perbaikan proses.",
        "Menyembunyikan keterlambatan dan berharap tidak ketahuan.",
        "Menyerahkan tanggung jawab sepenuhnya kepada pimpinan.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Pengakuan jujur dan fokus pada perbaikan proses menunjukkan kedewasaan profesional."
    ),
    sjt(
      "Anda menerima tugas dokumentasi yang membosankan, sementara proyek inti lebih menarik. Apa yang Anda lakukan?",
      [
        "Menunda dokumentasi hingga akhir tenggat.",
        "Mengerjakan proyek inti dan mengabaikan dokumentasi.",
        "Menyelesaikan dokumentasi tepat waktu karena merupakan bagian dari tanggung jawab.",
        "Meminta rekan lain mengerjakan dokumentasi Anda.",
      ],
      [0.33, 0.17, 1.0, 0.5],
      "Profesionalisme berarti menyelesaikan semua tanggung jawab, termasuk yang tidak menarik."
    ),
    sjt(
      "Anda menemukan bahwa rekan Anda membagikan kredensial server kepada orang yang tidak berwenang. Tindakan terbaik adalah...",
      [
        "Mengabaikan karena bukan urusan Anda.",
        "Melaporkan ke atasan atau tim keamanan sesuai prosedur.",
        "Membagikan kredensial Anda juga agar tidak ketinggalan.",
        "Menegur rekan secara pribadi tanpa melaporkan.",
      ],
      [0.17, 1.0, 0.17, 0.66],
      "Insiden keamanan harus dilaporkan melalui jalur resmi untuk mencegah dampak lebih besar."
    ),
    sjt(
      "Produk Anda mendapatkan ulasan negatif karena antarmuka yang sulit digunakan. Sebagai bagian tim, respons terbaik adalah...",
      [
        "Mengabaikan ulasan karena pengguna tidak memahami produk.",
        "Menganalisis umpan balik dan memperbaiki antarmuka pada iterasi berikutnya.",
        "Menghapus ulasan negatif.",
        "Menyalahkan tim desain.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Umpan balik pengguna adalah bahan penting untuk perbaikan produk."
    ),
  ],
  "software-engineering": [
    sjt(
      "Rilis aplikasi mobile Anda ditolak karena crash pada perangkat tertentu. Tindakan paling tepat adalah...",
      [
        "Merilis ulang versi yang sama karena hanya sebagian kecil pengguna terdampak.",
        "Mereproduksi bug, memperbaikinya, dan menguji pada perangkat yang terdampak sebelum rilis ulang.",
        "Menghapus aplikasi dari toko.",
        "Menyalahkan perangkat pengguna.",
      ],
      [0.33, 1.0, 0.17, 0.17],
      "Penyelesaian bug harus melalui reproduksi, perbaikan, dan pengujian yang memadai."
    ),
    sjt(
      "Tim Anda diminta mempercepat pengiriman fitur dengan mengorbankan pengujian otomatis. Apa respons terbaik?",
      [
        "Menyetujui dan menghapus pengujian otomatis.",
        "Menolak seluruh proposal.",
        "Menegosiasikan kompromi, misalnya menguji fitur kritis sambil mempercepat proses lainnya.",
        "Melakukan pengujian manual dadakan tanpa dokumentasi.",
      ],
      [0.17, 0.33, 1.0, 0.5],
      "Kualitas tidak boleh dikorbankan sepenuhnya; negosiasi kompromi adalah solusi terbaik."
    ),
    sjt(
      "Anda menemukan cara yang lebih efisien untuk menulis kode, namun berbeda dari standar tim. Apa yang Anda lakukan?",
      [
        "Langsung menerapkannya tanpa memberi tahu tim.",
        "Membahasnya dengan tim dan mengusulkan pembaruan standar jika disepakati.",
        "Menjaga rahasia agar terlihat lebih unggul.",
        "Menolak perubahan dan tetap pada cara lama.",
      ],
      [0.33, 1.0, 0.17, 0.5],
      "Perbaikan proses sebaiknya didiskusikan agar konsisten dengan standar tim."
    ),
    sjt(
      "Seorang pengguna melaporkan data pribadi terlihat oleh pengguna lain karena kesalahan logika aplikasi. Prioritas Anda adalah...",
      [
        "Menambal kerentanan sesegera mungkin dan meninjau ulang akses data.",
        "Menunggu laporan lebih banyak pengguna.",
        "Mengabaikan karena hanya sedikit yang terdampak.",
        "Menutup aplikasi untuk semua orang tanpa koordinasi.",
      ],
      [1.0, 0.33, 0.17, 0.5],
      "Kebocoran data pribadi adalah insiden serius yang harus segera ditangani."
    ),
    sjt(
      "Rekan baru Anda kesulitan memahami codebase. Anda sudah sibuk dengan pekerjaan sendiri. Apa tindakan terbaik?",
      [
        "Menghindarinya agar tidak mengganggu pekerjaan Anda.",
        "Menyediakan waktu untuk menjelaskan bagian penting dan menyarankan dokumentasi.",
        "Menyerahkan seluruh dokumentasi tanpa menjelaskan.",
        "Menyuruhnya bertanya kepada orang lain.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Mentoring rekan baru meningkatkan produktivitas tim jangka panjang."
    ),
    sjt(
      "Deadline fitur sudah dekat tetapi Anda menemukan bahwa desainnya tidak mendukung aksesibilitas. Apa yang Anda lakukan?",
      [
        "Mengabaikan aksesibilitas demi mengejar deadline.",
        "Memperbaiki aksesibilitas dan berdiskusi tentang penyesuaian jadwal.",
        "Merilis dan memperbaiki belakangan tanpa memberi tahu siapa pun.",
        "Menunda tanpa alasan yang jelas.",
      ],
      [0.17, 1.0, 0.5, 0.33],
      "Aksesibilitas adalah kualitas yang harus dijaga; komunikasikan kebutuhan penyesuaian jadwal."
    ),
  ],
  "finance-accounting": [
    sjt(
      "Anda menemukan selisih kecil antara laporan kas dan transaksi. Menjelang laporan akhir bulan, apa yang Anda lakukan?",
      [
        "Menutup selisih dengan dana taktis agar laporan tampak rapi.",
        "Menelusuri seluruh transaksi untuk menemukan penyebab selisih.",
        "Mengabaikan selisih karena nilainya kecil.",
        "Melaporkan angka tanpa menelusuri sumbernya.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Akuntan wajib menelusuri sumber selisih; menutup selisih secara taktis melanggar integritas."
    ),
    sjt(
      "Atasan meminta Anda mencatat pengeluaran fiktif untuk menaikkan beban usaha. Apa yang Anda lakukan?",
      [
        "Mematuhi perintah atasan.",
        "Menolak dan menjelaskan konsekuensi pelanggaran, lalu melaporkan sesuai prosedur.",
        "Mencatat sebagian agar tidak mencolok.",
        "Berpura-pura lupa.",
      ],
      [0.17, 1.0, 0.33, 0.17],
      "Praktik akuntansi yang tidak jujur adalah pelanggaran etika dan hukum; tolak dengan tegas."
    ),
    sjt(
      "Rekan audit Anda mencurigai manipulasi pada satu akun, tetapi belum ada bukti kuat. Apa tindakan terbaik?",
      [
        "Mengabaikan kecurigaan tanpa bukti.",
        "Melakukan pengujian lebih mendalam pada akun tersebut.",
        "Menghentikan seluruh audit.",
        "Menyampaikan kecurigaan kepada klien.",
      ],
      [0.33, 1.0, 0.17, 0.5],
      "Kecurigaan dalam audit harus diuji lebih dalam melalui prosedur audit."
    ),
    sjt(
      "Klien mengirimkan bukti transaksi yang tampak tidak wajar: tanggal berbeda dari catatan Anda. Apa yang Anda lakukan?",
      [
        "Mengabaikan perbedaan tanggal.",
        "Mengklarifikasi dengan klien dan mencocokkan dokumen asli.",
        "Mengubah catatan agar sesuai.",
        "Menolak seluruh transaksi tanpa pengecekan.",
      ],
      [0.33, 1.0, 0.17, 0.5],
      "Verifikasi dokumen dan klarifikasi adalah bagian penting dari keandalan pencatatan."
    ),
    sjt(
      "Anda mendapati rekan tim sering datang terlambat dan menunda pekerjaan laporan. Apa yang sebaiknya Anda lakukan?",
      [
        "Melaporkannya langsung ke atasan tanpa komunikasi.",
        "Menegur secara pribadi dan mengingatkan dampaknya pada tim.",
        "Menutupi keterlambatan rekan Anda.",
        "Mengabaikan karena bukan tanggung jawab Anda.",
      ],
      [0.5, 1.0, 0.33, 0.17],
      "Komunikasi pribadi yang baik lebih efektif daripada langsung melapor atau mengabaikan."
    ),
    sjt(
      "Menjelang deadline, atasan meminta Anda mengorbankan satu pemeriksaan kepatuhan untuk menghemat waktu. Apa yang Anda lakukan?",
      [
        "Menyetujui agar deadline terpenuhi.",
        "Menjelaskan risiko kepatuhan dan menegosiasikan cakupan pemeriksaan yang realistis.",
        "Menyelesaikan laporan tanpa pemeriksaan.",
        "Menolak dan mengundurkan diri.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Kepatuhan tidak boleh dikorbankan; komunikasikan risiko dan negosiasikan solusi."
    ),
    sjt(
      "Seorang pelanggan meminta Anda menaikkan nilai tagihan agar ia bisa mereklamasi lebih banyak dari kantornya. Apa tindakan Anda?",
      [
        "Menaikkan nilai karena pelanggan selalu benar.",
        "Menolak dan menjelaskan bahwa hal itu melanggar aturan.",
        "Menaikkan sedikit agar tidak ketahuan.",
        "Menyerahkan keputusan kepada pelanggan.",
      ],
      [0.17, 1.0, 0.33, 0.17],
      "Praktik tersebut adalah kecurangan; tolak dengan sopan namun tegas."
    ),
  ],
  "human-resource": [
    sjt(
      "Seorang karyawan berprestasi meminta kenaikan gaji di luar periode peninjauan. Apa respons terbaik Anda sebagai HR?",
      [
        "Menolak karena aturan tidak mengizinkan.",
        "Mendengarkan alasannya dan meninjau ulang kebijakan serta data kinerja.",
        "Menyetujui langsung agar karyawan tidak keluar.",
        "Mengabaikan permintaan.",
      ],
      [0.5, 1.0, 0.33, 0.17],
      "HR yang baik menilai permintaan secara objektif berdasarkan data dan kebijakan."
    ),
    sjt(
      "Dua karyawan berselisih dan saling menuduh dalam satu tim. Anda diminta menengahi. Langkah pertama terbaik adalah...",
      [
        "Memanggil keduanya secara terpisah untuk mendengar setiap sisi.",
        "Memihak pihak yang lebih senior.",
        "Menghindari keterlibatan karena bukan masalah Anda.",
        "Langsung memberikan sanksi kepada keduanya.",
      ],
      [1.0, 0.17, 0.33, 0.5],
      "Mediasi dimulai dengan mendengarkan semua pihak secara objektif."
    ),
    sjt(
      "Anda menemukan bahwa seorang kandidat terbaik berbohong pada pengalaman kerjanya di CV. Apa yang Anda lakukan?",
      [
        "Mengabaikan karena kemampuannya bagus.",
        "Menggugurkan kandidat dan menjelaskan alasannya.",
        "Tetap menerima dengan catatan.",
        "Menutup-nutupi agar proses seleksi cepat selesai.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Integritas adalah nilai inti; kebohongan pada CV menggugurkan kandidat."
    ),
    sjt(
      "Departemen lain meminta data gaji karyawan untuk kepentingan pribadi atasan mereka. Sebagai HR, Anda...",
      [
        "Memberikan data karena permintaan atasan.",
        "Menolak karena melanggar kerahasiaan data karyawan dan mengarahkan pada prosedur resmi.",
        "Memberikan sebagian data.",
        "Mengunggah data ke grup bersama.",
      ],
      [0.17, 1.0, 0.33, 0.17],
      "Data gaji bersifat rahasia dan hanya boleh diakses melalui prosedur yang sah."
    ),
    sjt(
      "Karyawan baru Anda terlihat kesulitan beradaptasi dan performanya menurun pada bulan pertama. Tindakan terbaik adalah...",
      [
        "Segera menghentikan masa percobaannya.",
        "Mengadakan sesi coaching dan menyusun rencana pengembangan.",
        "Mengabaikan dan menunggu evaluasi akhir.",
        "Memberikan peringatan tertulis.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Program onboarding dan coaching membantu karyawan baru beradaptasi."
    ),
    sjt(
      "Seorang manajer melaporkan bawahannya sering absen tanpa keterangan. Sebelum mengambil tindakan, Anda akan...",
      [
        "Langsung mengeluarkan surat peringatan.",
        "Memanggil karyawan untuk klarifikasi dan memeriksa catatan kehadiran.",
        "Memecat karyawan tersebut.",
        "Mengabaikan laporan manajer.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Proses disiplin yang adil dimulai dengan klarifikasi dan pemeriksaan data."
    ),
    sjt(
      "Perusahaan ingin menaikkan target produksi. Sebagai HR, Anda melihat risiko kelelahan karyawan. Apa yang Anda lakukan?",
      [
        "Menyetujui tanpa analisis.",
        "Menyampaikan analisis beban kerja dan mengusulkan penyesuaian sumber daya.",
        "Menolak target baru.",
        "Mengabaikan karena bukan tanggung jawab HR.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "HR berperan menjaga keseimbangan beban kerja dan produktivitas."
    ),
    sjt(
      "Anda menemukan bahwa rekrutmen terakhir tidak mematuhi prosedur keberagaman. Apa tindakan terbaik?",
      [
        "Mengabaikan karena proses sudah selesai.",
        "Mengevaluasi proses dan memperbaiki standar rekrutmen ke depan.",
        "Membatalkan seluruh hasil rekrutmen.",
        "Menyalahkan tim perekrut.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Perbaikan proses berbasis evaluasi lebih efektif daripada menyalahkan."
    ),
  ],
  "marketing-digital": [
    sjt(
      "Anggaran iklan Anda terbatas, tetapi target penjualan tinggi. Strategi paling efektif adalah...",
      [
        "Menyebar anggaran tipis ke semua kanal.",
        "Fokus pada kanal dengan konversi tertinggi dan mengoptimalkan konten.",
        "Menghapus seluruh iklan berbayar.",
        "Menurunkan harga produk drastis.",
      ],
      [0.5, 1.0, 0.33, 0.33],
      "Mengoptimalkan kanal berkinerja terbaik lebih efektif daripada menyebar tipis."
    ),
    sjt(
      "Konten viral yang Anda buat justru memicu kritik karena dianggap tidak sensitif. Tindakan terbaik adalah...",
      [
        "Menghapus semua bukti konten.",
        "Menanggapi dengan permintaan maaf dan evaluasi internal.",
        "Menyerang kritik di media sosial.",
        "Mengabaikan kritik.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Manajemen krisis yang baik adalah merespons dengan jujur dan evaluasi."
    ),
    sjt(
      "Klien meminta Anda menjanjikan hasil yang tidak realistis untuk menutup kesepakatan. Apa yang Anda lakukan?",
      [
        "Menjanjikan hasil tersebut agar klien senang.",
        "Menjelaskan proyeksi yang realistis dan menyusun ekspektasi yang jujur.",
        "Menyetujui tanpa komitmen.",
        "Menghindari pembahasan hasil.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Menetapkan ekspektasi yang jujur menjaga hubungan jangka panjang dengan klien."
    ),
    sjt(
      "Data analitik menunjukkan kampanye terakhir Anda tidak efektif. Apa yang Anda lakukan?",
      [
        "Mengulangi kampanye yang sama agar konsisten.",
        "Menganalisis penyebab dan menguji pendekatan baru.",
        "Menghentikan semua kampanye.",
        "Menyalahkan tim kreatif.",
      ],
      [0.33, 1.0, 0.17, 0.5],
      "Keputusan berbasis data adalah kunci pemasaran digital."
    ),
    sjt(
      "Anda menemukan bahwa pesaing menyalin konten Anda. Tindakan paling profesional adalah...",
      [
        "Membalas dengan konten serupa.",
        "Melakukan dokumentasi dan menempuh jalur hukum/etika yang tepat.",
        "Menyebar fitnah tentang pesaing.",
        "Mengabaikan sepenuhnya.",
      ],
      [0.5, 1.0, 0.17, 0.33],
      "Tangani pelanggaran melalui jalur yang tepat, bukan balas dendam."
    ),
    sjt(
      "Tim kreatif Anda mengusulkan ide yang berani namun berisiko bagi merek. Sebagai pemimpin pemasaran, Anda...",
      [
        "Menolak semua ide berisiko.",
        "Mengevaluasi risiko dan potensi, lalu membuat keputusan berbasis data.",
        "Menyetujui tanpa analisis.",
        "Mengabaikan usulan tim.",
      ],
      [0.5, 1.0, 0.33, 0.17],
      "Keputusan kreatif sebaiknya mempertimbangkan risiko dan peluang secara seimbang."
    ),
    sjt(
      "Seorang influencer yang diajak kerja sama terlibat kontroversi. Keputusan terbaik Anda adalah...",
      [
        "Tetap melanjutkan karena kontrak sudah ditandatangani.",
        "Mengevaluasi dampak merek dan mempertimbangkan penghentian kerja sama.",
        "Mengabaikan kontroversi.",
        "Membuat pernyataan mendukung influencer.",
      ],
      [0.5, 1.0, 0.33, 0.17],
      "Keselarasan nilai merek dengan influencer harus dievaluasi saat terjadi kontroversi."
    ),
    sjt(
      "Anggaran SEO terbatas namun Anda diminta meningkatkan peringkat dengan cepat. Pendekatan terbaik adalah...",
      [
        "Membeli tautan berbayar secara massal.",
        "Fokus pada kata kunci dengan peluang tinggi dan perbaikan teknis dasar.",
        "Mengabaikan SEO dan fokus iklan berbayar.",
        "Menyalin konten situs pesaing.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Strategi SEO yang berkelanjutan lebih baik daripada praktik yang melanggar aturan."
    ),
  ],
  "customer-service-sales": [
    sjt(
      "Seorang pelanggan marah karena produknya terlambat. Anda menangani keluhan tersebut. Respons terbaik adalah...",
      [
        "Membantah bahwa keterlambatan bukan kesalahan Anda.",
        "Mendengarkan, meminta maaf, dan menawarkan solusi nyata.",
        "Menutup telepon.",
        "Menyalahkan bagian pengiriman.",
      ],
      [0.17, 1.0, 0.17, 0.5],
      "Empati dan solusi adalah kunci penanganan pelanggan yang marah."
    ),
    sjt(
      "Pelanggan meminta diskon di luar kebijakan. Anda tahu kebijakan perusahaan tidak mengizinkan. Apa yang Anda lakukan?",
      [
        "Memberikan diskon agar pelanggan puas.",
        "Menjelaskan kebijakan dengan sopan dan menawarkan alternatif yang diizinkan.",
        "Berbohong bahwa diskon tidak tersedia.",
        "Mengalihkan ke rekan tanpa penjelasan.",
      ],
      [0.33, 1.0, 0.17, 0.5],
      "Menjelaskan kebijakan dengan sopan sambil menawarkan solusi adalah cara profesional."
    ),
    sjt(
      "Rekan Anda membicarakan pelanggan dengan nada negatif setelah pelanggan tersebut pergi. Anda...",
      [
        "Ikut membicarakan pelanggan.",
        "Mengalihkan pembicaraan ke hal yang lebih positif.",
        "Membicarakan pelanggan lain.",
        "Diam dan ikut tertawa.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Menjaga profesionalisme berarti tidak menjelekkan pelanggan."
    ),
    sjt(
      "Pelanggan setia Anda meminta rekomendasi produk yang justru lebih murah daripada yang biasa ia beli. Apa yang Anda lakukan?",
      [
        "Menjual produk yang lebih mahal untuk menaikkan komisi.",
        "Memberikan rekomendasi jujur sesuai kebutuhan pelanggan.",
        "Menghindari pertanyaan.",
        "Berbohong bahwa produk murah tidak tersedia.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Kejujuran membangun kepercayaan dan loyalitas jangka panjang."
    ),
    sjt(
      "Satu antrean pelanggan sangat panjang sementara rekan Anda masih berbicara santai. Tindakan Anda adalah...",
      [
        "Menunggu rekan selesai berbicara.",
        "Meminta rekan membantu atau mengambil alih sebagian pelanggan.",
        "Mengabaikan antrean.",
        "Memperlambat layanan Anda.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Inisiatif membantu mengurangi antrean adalah perilaku tim yang baik."
    ),
    sjt(
      "Anda tidak tahu jawaban atas pertanyaan teknis pelanggan. Apa yang Anda lakukan?",
      [
        "Menebak-nebak jawaban.",
        "Mengakui dengan jujur dan mencari jawaban yang benar lalu menghubungi kembali.",
        "Memberikan jawaban yang diinginkan pelanggan.",
        "Mengalihkan topik.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Kejujuran dan tindak lanjut lebih baik daripada jawaban yang salah."
    ),
    sjt(
      "Seorang pelanggan meminta kompensasi atas keluhan yang sudah dijelaskan sebagai kesalahan pelanggan sendiri. Anda...",
      [
        "Memberikan kompensasi penuh untuk menghindari konflik.",
        "Menjelaskan dengan sopan dan menawarkan kompensasi yang adil sesuai kebijakan.",
        "Menolak kasar.",
        "Mengabaikan pelanggan.",
      ],
      [0.5, 1.0, 0.17, 0.33],
      "Solusi yang adil dan sopan menjaga kepuasan tanpa merugikan perusahaan."
    ),
    sjt(
      "Anda melihat rekan penjualan memberi janji berlebihan kepada pelanggan untuk menutup transaksi. Apa yang Anda lakukan?",
      [
        "Ikut menjanjikan hal yang sama.",
        "Mengingatkan rekan secara pribadi tentang risiko janji berlebihan.",
        "Melaporkan langsung tanpa komunikasi.",
        "Mengabaikan.",
      ],
      [0.5, 1.0, 0.33, 0.17],
      "Memberi tahu rekan secara pribadi lebih bijak sebelum melibatkan atasan."
    ),
  ],
  administration: [
    sjt(
      "Atasan Anda meminta dokumen penting dalam 10 menit, tetapi Anda belum selesai menyiapkannya. Apa yang Anda lakukan?",
      [
        "Memberikan dokumen apa adanya walau belum lengkap.",
        "Menginformasikan status terkini dan meminta waktu tambahan singkat.",
        "Diam dan berharap atasan lupa.",
        "Menyerahkan dokumen orang lain.",
      ],
      [0.33, 1.0, 0.17, 0.5],
      "Komunikasi jujur tentang status pekerjaan adalah sikap profesional."
    ),
    sjt(
      "Anda menemukan dokumen rahasia di meja printer. Tindakan terbaik Anda adalah...",
      [
        "Membacanya karena penasaran.",
        "Menyimpannya dan menyerahkannya kepada pemilik atau bagian terkait.",
        "Membuangnya.",
        "Mengirimkannya ke semua orang.",
      ],
      [0.17, 1.0, 0.33, 0.17],
      "Dokumen rahasia harus dijaga dan diserahkan kepada pihak yang berwenang."
    ),
    sjt(
      "Anda diminta memprioritaskan dua pekerjaan dengan deadline yang sama. Apa yang Anda lakukan?",
      [
        "Mengerjakan keduanya setengah-setengah.",
        "Meminta penegasan prioritas dari atasan.",
        "Mengabaikan salah satunya.",
        "Mengerjakan yang paling mudah dulu.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Klarifikasi prioritas dengan atasan adalah cara terbaik menyelesaikan konflik prioritas."
    ),
    sjt(
      "Rekan Anda sering meminjam peralatan kantor tanpa mengembalikan. Anda...",
      [
        "Ikut meminjam tanpa mengembalikan.",
        "Mengingatkan rekan dengan sopan.",
        "Melapor ke atasan tanpa pembicaraan.",
        "Menyembunyikan peralatan.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Komunikasi sopan lebih efektif daripada melapor langsung atau membalas."
    ),
    sjt(
      "Anda menemukan kesalahan pada laporan yang akan dikirim ke pimpinan. Apa yang Anda lakukan?",
      [
        "Mengirim laporan dan berharap tidak ada yang menyadari.",
        "Memperbaiki kesalahan sebelum mengirim.",
        "Menunda pengiriman tanpa penjelasan.",
        "Menyalahkan orang yang membuat data.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Ketelitian dan perbaikan sebelum pengiriman adalah tanggung jawab administrasi."
    ),
  ],
  "supply-chain-logistics": [
    sjt(
      "Pengiriman penting tertunda karena kapasitas gudang penuh. Tindakan terbaik Anda adalah...",
      [
        "Menunda pengiriman tanpa informasi.",
        "Mencari alternatif pengiriman dan mengomunikasikan opsi kepada pihak terkait.",
        "Mengirim lebih banyak barang ke gudang.",
        "Mengabaikan masalah.",
      ],
      [0.33, 1.0, 0.17, 0.17],
      "Solusi alternatif dengan komunikasi proaktif menjaga rantai pasok tetap berjalan."
    ),
    sjt(
      "Anda menemukan perbedaan stok antara catatan sistem dan fisik di gudang. Langkah pertama adalah...",
      [
        "Mengabaikan karena perbedaan kecil.",
        "Melakukan stock opname ulang untuk menemukan penyebab.",
        "Menyesuaikan catatan agar sama.",
        "Menyalahkan staf gudang.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Menelusuri penyebab selisih stok adalah prosedur yang benar."
    ),
    sjt(
      "Pemasok utama Anda tidak dapat memenuhi pesanan mendadak. Apa yang Anda lakukan?",
      [
        "Menunggu pemasok.",
        "Mencari pemasok alternatif dan menegosiasikan prioritas.",
        "Membatalkan seluruh pesanan.",
        "Menambah pesanan ke pemasok yang sama.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Memiliki opsi pemasok alternatif adalah praktik manajemen risiko yang baik."
    ),
    sjt(
      "Biaya pengiriman meningkat tajam dan melebihi anggaran. Keputusan terbaik adalah...",
      [
        "Menghentikan semua pengiriman.",
        "Mengevaluasi rute dan moda pengiriman untuk efisiensi.",
        "Menambah anggaran tanpa analisis.",
        "Mengabaikan kenaikan biaya.",
      ],
      [0.17, 1.0, 0.33, 0.33],
      "Optimasi rute dan moda adalah cara efektif mengendalikan biaya logistik."
    ),
    sjt(
      "Kualitas barang dari pemasok menurun. Sebelum memutuskan, Anda akan...",
      [
        "Langsung mengganti pemasok.",
        "Mendiskusikan dengan pemasok dan menetapkan standar kualitas yang jelas.",
        "Mengabaikan penurunan kualitas.",
        "Menerima barang tanpa pemeriksaan.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Komunikasi dan penetapan standar adalah langkah pertama sebelum mengganti pemasok."
    ),
    sjt(
      "Ada kesalahan pengiriman yang menyebabkan pelanggan menerima barang salah. Tindakan pertama adalah...",
      [
        "Menyalahkan kurir.",
        "Menangani pengiriman ulang dan menelusuri penyebab kesalahan.",
        "Mengabaikan karena sudah terlanjur.",
        "Menunggu pelanggan mengeluh.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Perbaikan segera dan analisis akar masalah menjaga kepercayaan pelanggan."
    ),
  ],
  manufacturing: [
    sjt(
      "Anda menemukan cacat pada sejumlah produk yang sudah diproduksi. Tindakan terbaik adalah...",
      [
        "Membiarkan produk terkirim.",
        "Menghentikan pengiriman produk cacat dan menelusuri penyebabnya.",
        "Menutupi cacat dengan perbaikan cepat.",
        "Menyalahkan operator lini.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Pengendalian mutu mengharuskan penghentian produk cacat dan analisis penyebab."
    ),
    sjt(
      "Lini produksi Anda berhenti karena mesin rusak. Operator menunggu perbaikan. Apa yang Anda lakukan?",
      [
        "Menyuruh operator pulang.",
        "Mengkoordinasikan perbaikan segera dan mengatur ulang pekerjaan.",
        "Membiarkan mesin menyala.",
        "Menunggu perbaikan selesai tanpa komunikasi.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Koordinasi perbaikan dan pengaturan pekerjaan menjaga produktivitas."
    ),
    sjt(
      "Anda melihat seorang operator tidak memakai alat pelindung diri. Apa yang Anda lakukan?",
      [
        "Mengabaikan karena sedang dikejar target.",
        "Menghentikan pekerjaan dan mengingatkan pentingnya keselamatan.",
        "Ikut tidak memakai APD.",
        "Menegur dengan kasar.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Keselamatan kerja adalah prioritas utama yang tidak bisa ditawar."
    ),
    sjt(
      "Target produksi dinaikkan tetapi kualitas mulai menurun. Anda...",
      [
        "Terus mengejar target dan mengabaikan kualitas.",
        "Menyampaikan dampak pada kualitas dan menegosiasikan target realistis.",
        "Mengurangi standar kualitas.",
        "Berhenti memproduksi.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Keseimbangan antara target dan kualitas perlu dikomunikasikan secara jujur."
    ),
    sjt(
      "Anda menemukan bahan baku yang tidak sesuai spesifikasi sudah digunakan. Tindakan terbaik adalah...",
      [
        "Mengabaikan karena sudah terlanjur.",
        "Melaporkan dan mengevaluasi produk yang terdampak.",
        "Menyembunyikan temuan.",
        "Menyalahkan supplier.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Pelaporan dan evaluasi dampak menjaga mutu dan kepatuhan."
    ),
  ],
  engineering: [
    sjt(
      "Anda menemukan potensi bahaya pada desain proyek yang sudah disetujui. Apa yang Anda lakukan?",
      [
        "Mengabaikan karena sudah disetujui.",
        "Melaporkan temuan dan mengusulkan perbaikan desain.",
        "Menyembunyikan temuan agar proyek berjalan.",
        "Langsung mengubah desain tanpa komunikasi.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Keselamatan dan kepatuhan teknis harus diutamakan meskipun desain sudah disetujui."
    ),
    sjt(
      "Klien meminta percepatan jadwal yang berisiko pada mutu pekerjaan. Anda...",
      [
        "Menyetujui tanpa analisis.",
        "Menjelaskan risiko dan menegosiasikan jadwal yang aman.",
        "Menolak semua permintaan klien.",
        "Mempercepat tanpa kontrol mutu.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Jadwal dan mutu harus seimbang; komunikasikan risikonya."
    ),
    sjt(
      "Tim Anda berbeda pendapat tentang metode teknis terbaik. Sebagai engineer, Anda akan...",
      [
        "Memutuskan sendiri sesuai preferensi.",
        "Membandingkan metode berdasarkan data dan membahas bersama tim.",
        "Mengambil keputusan berdasarkan senioritas.",
        "Menunda keputusan tanpa batas.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Keputusan teknis terbaik didasarkan pada analisis data dan diskusi tim."
    ),
    sjt(
      "Anda menemukan bahwa rekan memotong proses pemeriksaan kualitas untuk mengejar deadline. Apa yang Anda lakukan?",
      [
        "Ikut memotong proses.",
        "Mengingatkan rekan tentang risiko dan konsekuensi.",
        "Melaporkan langsung tanpa komunikasi.",
        "Mengabaikan.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Mengingatkan rekan secara pribadi adalah langkah pertama yang profesional."
    ),
    sjt(
      "Peralatan di lapangan menunjukkan pembacaan yang tidak normal. Tindakan pertama Anda adalah...",
      [
        "Mengabaikan pembacaan.",
        "Menghentikan operasi dan memverifikasi pembacaan.",
        "Menyetel ulang peralatan tanpa verifikasi.",
        "Menunggu peralatan rusak.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Verifikasi pembacaan yang tidak normal adalah langkah keselamatan standar."
    ),
    sjt(
      "Anda ditugaskan mengevaluasi proyek yang kemungkinan besar melebihi anggaran. Anda...",
      [
        "Menyembunyikan pembengkakan agar terlihat baik.",
        "Melaporkan proyeksi biaya secara jujur dan mengusulkan langkah mitigasi.",
        "Menghentikan proyek tanpa informasi.",
        "Mengalihkan biaya ke proyek lain.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Pelaporan jujur dan mitigasi adalah tanggung jawab profesional."
    ),
  ],
  healthcare: [
    sjt(
      "Pasien menolak obat yang diresepkan karena khawatir efek samping. Sebagai tenaga kesehatan, Anda...",
      [
        "Memaksa pasien minum obat.",
        "Menjelaskan manfaat dan risiko secara jujur serta menjawab kekhawatiran pasien.",
        "Mengabaikan penolakan.",
        "Memberikan obat tanpa sepengetahuan pasien.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Edukasi pasien adalah bagian penting dari pelayanan kesehatan yang etis."
    ),
    sjt(
      "Anda melihat rekan perawat mengabaikan prosedur sterilisasi karena terburu-buru. Apa yang Anda lakukan?",
      [
        "Mengabaikan karena bukan urusan Anda.",
        "Mengingatkan rekan dan melaporkan jika berulang.",
        "Ikut mengabaikan prosedur.",
        "Menegur dengan keras di depan pasien.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Keselamatan pasien adalah prioritas; ingatkan rekan dan laporkan jika perlu."
    ),
    sjt(
      "Rumah sakit penuh dan Anda harus memprioritaskan pasien yang akan ditangani. Kriteria terbaik adalah...",
      [
        "Pasien yang datang lebih dulu.",
        "Pasien dengan kondisi paling kritis (triase).",
        "Pasien yang membayar lebih.",
        "Pasien yang lebih muda.",
      ],
      [0.5, 1.0, 0.17, 0.33],
      "Triase berbasis tingkat kegawatan adalah standar penanganan darurat."
    ),
    sjt(
      "Keluarga pasien meminta informasi kondisi yang seharusnya disampaikan oleh dokter. Anda...",
      [
        "Memberikan semua informasi yang Anda tahu.",
        "Menjelaskan bahwa informasi medis disampaikan oleh dokter sesuai prosedur.",
        "Menolak tanpa penjelasan.",
        "Berbohong tentang kondisi pasien.",
      ],
      [0.5, 1.0, 0.17, 0.17],
      "Batasan kewenangan dalam penyampaian informasi medis harus dijaga."
    ),
    sjt(
      "Anda menemukan kesalahan dalam pemberian dosis obat kepada pasien. Tindakan terbaik adalah...",
      [
        "Menyembunyikan kesalahan.",
        "Melaporkan segera dan memberikan penanganan yang tepat.",
        "Menunggu dilihat orang lain.",
        "Menyalahkan rekan.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Pelaporan kesalahan medis secara jujur dan cepat adalah tanggung jawab etis."
    ),
    sjt(
      "Seorang pasien dengan penyakit menular menolak isolasi. Anda...",
      [
        "Menghormati keinginan pasien.",
        "Menjelaskan risiko dan pentingnya isolasi bagi keselamatan bersama.",
        "Mengusir pasien.",
        "Mengisolasi tanpa penjelasan.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Edukasi dan komunikasi diperlukan agar pasien memahami pentingnya isolasi."
    ),
    sjt(
      "Rekan Anda tampak kelelahan dan berisiko melakukan kesalahan medis. Anda...",
      [
        "Mengabaikan.",
        "Mengingatkan rekan dan mengusulkan dukungan/istirahat.",
        "Melaporkan tanpa berbicara dengan rekan.",
        "Menyuruh rekan pulang tanpa koordinasi.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Kesejahteraan rekan berdampak pada keselamatan pasien."
    ),
  ],
  education: [
    sjt(
      "Seorang siswa tertinggal jauh dari materi. Sebagai guru, Anda...",
      [
        "Mengabaikan karena harus mengejar materi.",
        "Mengadakan pendampingan tambahan dan menyesuaikan metode.",
        "Memberi hukuman.",
        "Menyuruh siswa belajar sendiri.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Pendampingan dan penyesuaian metode membantu siswa tertinggal."
    ),
    sjt(
      "Dua siswa bertengkar di kelas. Tindakan terbaik Anda adalah...",
      [
        "Memarahi keduanya di depan kelas.",
        "Memisahkan mereka dan menangani konflik dengan tenang.",
        "Mengabaikan.",
        "Menghukum tanpa mendengar penjelasan.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Penanganan konflik yang tenang dan adil menciptakan lingkungan belajar aman."
    ),
    sjt(
      "Anda menemukan siswa mencontek saat ujian. Tindakan terbaik adalah...",
      [
        "Mengumumkannya ke seluruh kelas.",
        "Menindak sesuai aturan dan berbicara secara pribadi.",
        "Mengabaikan.",
        "Memberi nilai nol tanpa konfirmasi.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Penanganan pelanggaran secara pribadi dan sesuai aturan lebih mendidik."
    ),
    sjt(
      "Orang tua siswa meminta nilai anaknya dinaikkan. Anda...",
      [
        "Menaikkan nilai karena diminta.",
        "Menjelaskan penilaian berdasarkan hasil belajar dan menawarkan bimbingan.",
        "Menurunkan nilai anak lain.",
        "Mengabaikan permintaan.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Integritas penilaian harus dijaga; tawarkan dukungan belajar."
    ),
    sjt(
      "Metode mengajar Anda tidak efektif di satu kelas. Sebagai pendidik, Anda...",
      [
        "Mengulangi metode yang sama.",
        "Mengevaluasi dan mencoba metode yang berbeda.",
        "Menyalahkan siswa.",
        "Berhenti mengajar.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Evaluasi dan adaptasi metode pengajaran adalah praktik profesional."
    ),
    sjt(
      "Anda diminta memimpin proyek penelitian oleh rekan yang lebih senior. Anda...",
      [
        "Menolak karena bukan tugas Anda.",
        "Menerima dan berkoordinasi dengan jelas.",
        "Menerima tanpa komunikasi.",
        "Menyerahkan ke orang lain tanpa izin.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Kesediaan berkolaborasi dan komunikasi yang jelas adalah kunci."
    ),
    sjt(
      "Seorang mahasiswa menghadapi masalah pribadi yang memengaruhi studinya. Anda...",
      [
        "Mengabaikan masalah pribadinya.",
        "Mendengarkan dan mengarahkan pada layanan konseling yang tepat.",
        "Meminta ia berhenti kuliah.",
        "Menilai kinerjanya lebih rendah.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Dukungan dan rujukan pada layanan konseling adalah pendekatan yang tepat."
    ),
  ],
  "hospitality-tourism": [
    sjt(
      "Tamu mengeluh kamar belum bersih saat check-in. Respons terbaik Anda adalah...",
      [
        "Menjelaskan bahwa itu bukan kesalahan Anda.",
        "Meminta maaf dan segera menangani pembersihan kamar.",
        "Mengabaikan keluhan.",
        "Menawarkan kamar dengan biaya tambahan.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Permintaan maaf dan solusi cepat adalah standar layanan hotel."
    ),
    sjt(
      "Tamu VIP meminta layanan yang di luar standar fasilitas. Anda...",
      [
        "Menolak semua permintaan.",
        "Mengevaluasi kemungkinan dan memberikan yang terbaik sesuai kebijakan.",
        "Menjanjikan semua permintaan.",
        "Mengabaikan tamu VIP.",
      ],
      [0.5, 1.0, 0.33, 0.17],
      "Melayani dengan yang terbaik namun tetap dalam batas kebijakan."
    ),
    sjt(
      "Terjadi overbooking di hotel Anda. Tamu yang sudah memesan tidak mendapat kamar. Tindakan terbaik adalah...",
      [
        "Menyuruh tamu mencari hotel lain.",
        "Mencari kamar alternatif, menawarkan kompensasi, dan meminta maaf.",
        "Mengabaikan reservasi.",
        "Menempatkan tamu di ruang staf.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Menangani overbooking dengan solusi dan kompensasi menjaga reputasi hotel."
    ),
    sjt(
      "Rombongan wisatawan Anda terlambat karena bus rusak. Sebagai tour guide, Anda...",
      [
        "Membiarkan rombongan menunggu.",
        "Mengomunikasikan situasi dan menyusun rencana alternatif.",
        "Membatalkan tur.",
        "Menyalahkan sopir.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Komunikasi dan rencana alternatif menjaga pengalaman wisatawan."
    ),
    sjt(
      "Tamu menawarkan tip besar agar Anda melanggar aturan hotel. Anda...",
      [
        "Menerima tip dan melanggar aturan.",
        "Menolak dengan sopan dan tetap mematuhi aturan.",
        "Menerima tip tanpa melanggar.",
        "Melaporkan tamu.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Integritas lebih penting daripada imbalan."
    ),
    sjt(
      "Rekan Anda sedang kewalahan menangani banyak tamu saat check-in. Anda...",
      [
        "Pura-pura tidak melihat.",
        "Membantu rekan agar antrean cepat teratasi.",
        "Memperlambat pekerjaan Anda.",
        "Mengabaikan.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Kerja sama tim meningkatkan kualitas layanan."
    ),
    sjt(
      "Wisatawan merasa kecewa karena cuaca buruk mengganggu jadwal wisata. Anda...",
      [
        "Mengabaikan kekecewaan.",
        "Menawarkan aktivitas alternatif dan mengelola ekspektasi dengan jujur.",
        "Menjanjikan cuaca akan membaik.",
        "Membatalkan semua aktivitas.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Fleksibilitas dan alternatif menjaga pengalaman tetap menyenangkan."
    ),
  ],
  "retail-ecommerce": [
    sjt(
      "Seorang pelanggan mengembalikan produk tanpa struk. Menurut kebijakan toko, pengembalian butuh struk. Anda...",
      [
        "Menolak tanpa penjelasan.",
        "Menjelaskan kebijakan dan mencari solusi alternatif yang diizinkan.",
        "Menerima pengembalian tanpa syarat.",
        "Mengabaikan pelanggan.",
      ],
      [0.5, 1.0, 0.33, 0.17],
      "Penjelasan kebijakan dengan solusi alternatif menjaga kepuasan pelanggan."
    ),
    sjt(
      "Stok produk utama menipis menjelang promo besar. Anda...",
      [
        "Menunggu stok habis.",
        "Menambah stok dari pemasok dan menyusun strategi penjualan.",
        "Menaikkan harga.",
        "Menghentikan promo.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Persiapan stok dan strategi adalah kunci menghadapi promo."
    ),
    sjt(
      "Pelanggan online mengeluh produk tidak sesuai gambar. Anda...",
      [
        "Menyalahkan pelanggan.",
        "Menanggapi dengan empati dan menawarkan pengembalian/penukaran.",
        "Mengabaikan keluhan.",
        "Menghapus ulasan.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Empati dan solusi menjaga kepercayaan pelanggan online."
    ),
    sjt(
      "Anda menemukan rekan kasir memberikan diskon tanpa izin kepada temannya. Anda...",
      [
        "Ikut memberikan diskon.",
        "Mengingatkan rekan tentang prosedur.",
        "Melaporkan tanpa komunikasi.",
        "Mengabaikan.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Mengingatkan rekan adalah langkah pertama sebelum melapor."
    ),
    sjt(
      "Target penjualan bulan ini sulit dicapai. Sebagai supervisor toko, Anda...",
      [
        "Menyerah sebelum bulan berakhir.",
        "Menganalisis data penjualan dan menyusun strategi promosi.",
        "Memaksa staf bekerja lembur tanpa rencana.",
        "Menurunkan target.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Analisis data dan strategi adalah pendekatan yang tepat."
    ),
    sjt(
      "Sebuah produk di situs e-commerce Anda salah harga (terlalu murah) dan banyak pesanan masuk. Anda...",
      [
        "Membatalkan semua pesanan tanpa informasi.",
        "Mengomunikasikan kesalahan dan menawarkan kompensasi yang adil.",
        "Mengirim produk dengan harga salah.",
        "Mengabaikan pesanan.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Komunikasi transparan dan kompensasi adil adalah penanganan yang tepat."
    ),
    sjt(
      "Staf toko Anda melayani pelanggan dengan tidak ramah. Anda...",
      [
        "Mengabaikan.",
        "Menegur secara pribadi dan memberikan contoh layanan yang baik.",
        "Memecat langsung.",
        "Menegur di depan pelanggan.",
      ],
      [0.5, 1.0, 0.33, 0.17],
      "Pembinaan dan contoh yang baik lebih efektif daripada hukuman."
    ),
  ],
  "bumn-government": [
    sjt(
      "Seorang pengusaha menawarkan hadiah agar Anda mempercepat pengurusan dokumennya. Anda...",
      [
        "Menerima hadiah.",
        "Menolak dan menjelaskan bahwa pelayanan dilakukan sesuai prosedur.",
        "Menerima dengan catatan mempercepat.",
        "Mengabaikan.",
      ],
      [0.17, 1.0, 0.33, 0.17],
      "Integritas dan anti-gratifikasi adalah prinsip utama pelayanan publik."
    ),
    sjt(
      "Anda menemukan rekan menerima suap dari pemohon dokumen. Tindakan terbaik adalah...",
      [
        "Mengabaikan.",
        "Melaporkan ke atasan atau unit pengaduan sesuai prosedur.",
        "Ikut menerima.",
        "Menegur rekan tanpa melaporkan.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Pelaporan melalui jalur resmi menjaga integritas institusi."
    ),
    sjt(
      "Masyarakat mengeluhkan prosedur pelayanan yang berbelit. Sebagai petugas, Anda...",
      [
        "Menjelaskan bahwa aturan memang begitu.",
        "Mencatat keluhan dan mengusulkan penyederhanaan prosedur.",
        "Mengabaikan keluhan.",
        "Menyalahkan atasan.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Keterbukaan terhadap perbaikan pelayanan publik adalah sikap yang baik."
    ),
    sjt(
      "Anda diminta menandatangani dokumen yang belum Anda periksa oleh atasan. Anda...",
      [
        "Menandatangani karena diperintah.",
        "Memeriksa dokumen terlebih dahulu sebelum menandatangani.",
        "Menandatangani sebagian.",
        "Menolak tanpa alasan.",
      ],
      [0.33, 1.0, 0.5, 0.17],
      "Ketelitian dan tanggung jawab atas tanda tangan sangat penting."
    ),
    sjt(
      "Ada informasi rahasia negara/instansi yang bocor dari departemen Anda. Anda...",
      [
        "Mengabaikan.",
        "Melaporkan kebocoran dan membantu penyelidikan.",
        "Menyebarkan informasi.",
        "Menyembunyikan fakta.",
      ],
      [0.17, 1.0, 0.33, 0.5],
      "Keamanan informasi adalah tanggung jawab seluruh pegawai."
    ),
    sjt(
      "Rekan Anda sering menunda pekerjaan pelayanan publik sehingga antrean menumpuk. Anda...",
      [
        "Mengabaikan.",
        "Mengingatkan rekan tentang dampak pada masyarakat.",
        "Melapor tanpa komunikasi.",
        "Menggantikan pekerjaan rekan tanpa koordinasi.",
      ],
      [0.5, 1.0, 0.33, 0.17],
      "Komunikasi dan kerja sama menjaga kualitas pelayanan."
    ),
    sjt(
      "Anda memiliki akses data kependudukan warga. Seorang kerabat meminta data tersebut. Anda...",
      [
        "Memberikan karena kerabat.",
        "Menolak karena melanggar kerahasiaan data.",
        "Memberikan sebagian.",
        "Menjual data.",
      ],
      [0.17, 1.0, 0.33, 0.17],
      "Perlindungan data pribadi adalah kewajiban hukum dan etika."
    ),
  ],
};