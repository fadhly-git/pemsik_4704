// object mahasiswa
const mahasiswa = [
  {
    NIM: "A11.2022.14501",
    nama: "Fadhly",
    umur: 20,
    status: true,
    jurusan: "Teknik Informatika",
    matakuliah: [
      {
        matkulId: 4704,
        nama: "Pemrograman Web",
        tugas: 80,
        uts: 85,
        uas: 90,
        sks: 3,
      },
      {
        matkulId: 4705,
        nama: "Basis Data",
        tugas: 75,
        uts: 80,
        uas: 85,
        sks: 2,
      },
      {
        matkulId: 4706,
        nama: "Algoritma dan Pemrograman",
        tugas: 90,
        uts: 95,
        uas: 100,
        sks: 4,
      },
    ],
  },
];

// menampilkan data mahasiswa
function showStudentInfo() {
  return mahasiswa
    .map(
      (mhs) =>
        `NIM: ${mhs.NIM}, Nama: ${mhs.nama}, Umur: ${mhs.umur}, Status: ${
          mhs.status ? "Aktif" : "Tidak Aktif"
        }, Jurusan: ${mhs.jurusan} \n Mata Kuliah: \n ${mhs.matakuliah
          .map(
            (mk) =>
              `- ${mk.nama}: Tugas(${mk.tugas}), UTS(${mk.uts}), UAS(${mk.uas})`
          )
          .join("\n")}`
    )
    .join("\n\n");
}

console.log("show", JSON.stringify(showStudentInfo()));

const students = mahasiswa;

// menambah data mahasiswa
function addMhs(newMhs) {
  students.push(newMhs);
}
addMhs({
  NIM: "A11.2022.14302",
  nama: "Owi",
  umur: 21,
  status: true,
  jurusan: "Teknik Informatika",
  matakuliah: [
    {
      matkulId: 4704,
      nama: "Pemrograman Web",
      tugas: 70,
      uts: 75,
      uas: 80,
    },
    {
      matkulId: 4705,
      nama: "Basis Data",
      tugas: 65,
      uts: 70,
      uas: 75,
    },
    {
      matkulId: 4706,
      nama: "Algoritma dan Pemrograman",
      tugas: 80,
      uts: 85,
      uas: 90,
    },
  ],
});

console.log("add", JSON.stringify(students));

// mengubah data mahasiswa
const updateMhs = (NIM, newName, status) => {
  const mhs = students.find((m) => m.NIM === NIM);
  if (mhs) {
    mhs.nama = newName;
    mhs.status = status;
  }
};
updateMhs("A11.2022.14302", "Ngap Owi", false);

console.log("update", JSON.stringify(students));

// menghapus data mahasiswa
function deleteMhs(NIM) {
  const index = students.findIndex((m) => m.NIM === NIM);
  if (index !== -1) {
    students.splice(index, 1);
  }
}

deleteMhs("A11.2022.14302");

console.log("delete", JSON.stringify(students));

function TotalNilai(NIM) {
  const mhs = students.find((m) => m.NIM === NIM);
  if (mhs) {
    const rataRataMatkul = mhs.matakuliah.map((mk) => {
      return (mk.tugas + mk.uts + mk.uas) / 3;
    });

    const total = rataRataMatkul.reduce((sum, nilai) => sum + nilai, 0);
    rataRataMatkul.length;
    return total.toFixed(2);
  }
  return 0;
}

console.log("total", TotalNilai("A11.2022.14501"));

function categoryGrade(NIM) {
  const mhs = students.find((m) => m.NIM === NIM);
  if (mhs) {
    return mhs.matakuliah.map((mk) => {
      const total = (mk.tugas + mk.uts + mk.uas) / 3;
      let grade;
      if (total >= 85) {
        grade = "A";
      } else if (total >= 70) {
        grade = "B";
      } else if (total >= 60) {
        grade = "C";
      } else {
        grade = "D";
      }
      return {
        matkul: mk.nama,
        nilai: total,
        kategori: grade,
      };
    });
  }
}

console.log("category", JSON.stringify(categoryGrade("A11.2022.14501")));

function IPS(NIM) {
  const mhs = students.find((m) => m.NIM === NIM);
  var total = 0;
  var sksTotal = 0;
  if (mhs) {
    mhs.matakuliah.map((mk) => {
      const nilai = (mk.tugas + mk.uts + mk.uas) / 3;
      let bobot;
      if (nilai >= 85) {
        bobot = 4;
      } else if (nilai >= 70) {
        bobot = 3;
      } else if (nilai >= 60) {
        bobot = 2;
      } else {
        bobot = 1;
      }
      total += bobot * mk.sks;
      sksTotal += mk.sks;
    });
    return (total / sksTotal).toFixed(2);
  }
}

console.log("IPS", IPS("A11.2022.14501"));

console.log("students", students);

function clearMhs() {
  students.length = 0;
}

console.log("before clear", JSON.stringify(students));
clearMhs();

console.log("clear", JSON.stringify(students));

// arrays of object

const mhs = [
  {
    NIM: "A11.2022.14501",
    nama: "Fadhly",
    umur: 20,
    status: true,
    jurusan: "Teknik Informatika",
    matakuliah: [
      {
        matkulId: 4704,
        nama: "Pemrograman Web",
        tugas: 80,
        uts: 85,
        uas: 90,
        sks: 3,
      },
      {
        matkulId: 4705,
        nama: "Basis Data",
        tugas: 75,
        uts: 80,
        uas: 85,
        sks: 2,
      },
      {
        matkulId: 4706,
        nama: "Algoritma dan Pemrograman",
        tugas: 90,
        uts: 95,
        uas: 100,
        sks: 4,
      },
    ],
  },
  {
    NIM: "A11.2022.14302",
    nama: "Ngap Owi",
    umur: 21,
    status: false,
    jurusan: "Teknik Informatika",
    matakuliah: [
      {
        matkulId: 4704,
        nama: "Pemrograman Web",
        tugas: 70,
        uts: 75,
        uas: 80,
      },
      { matkulId: 4705, nama: "Basis Data", tugas: 65, uts: 70, uas: 75 },
      {
        matkulId: 4706,
        nama: "Algoritma dan Pemrograman",
        tugas: 80,
        uts: 85,
        uas: 90,
      },
    ],
  },
];

console.log("mhs", mhs);
// jumlah mahasiswa
function jumlahMahasiswa() {
  return mhs.length;
}

console.log("jumlah", jumlahMahasiswa());

// sort berdasarkan NIM
function sortByNIM() {
  return mhs.sort((a, b) => a.NIM.localeCompare(b.NIM));
}

console.log("sorted by NIM:", JSON.stringify(sortByNIM()));

// sort berdasarkan status
function sortByStatus() {
  return mhs.sort((a, b) => b.status - a.status);
}

console.log("sorted by status:", JSON.stringify(sortByStatus()));

// jumlah aktfif dan tidak aktif
function countStatus() {
  const students = [...mhs];
  return students.reduce(
    (acc, curr) => {
      if (curr.status) {
        acc.aktif += 1;
      } else {
        acc.tidakAktif += 1;
      }
      return acc;
    },
    { aktif: 0, tidakAktif: 0 }
  );
}

console.log("count status", countStatus());

// clear array mhs

console.log("before clear", JSON.stringify(mhs));

function clearMhsArray() {
  mhs.length = 0; // Mengosongkan array
}

clearMhsArray();

console.log("clear", mhs);
