// membuat objek mahasiswa
const mahasiswa = {
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
    },
    {
      matkulId: 4705,
      nama: "Basis Data",
      tugas: 75,
      uts: 80,
      uas: 85,
    },
    {
      matkulId: 4706,
      nama: "Algoritma dan Pemrograman",
      tugas: 90,
      uts: 95,
      uas: 100,
    },
  ],
};

//  membuat array ( banyak data tapi satu tipe data )
const arr = [1, 2, 3, 4, 5];

//  membuat array dengan objek (banyak data dengan tipe data berbeda)
const arrObj = [
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
      },
      {
        matkulId: 4705,
        nama: "Basis Data",
        tugas: 75,
        uts: 80,
        uas: 85,
      },
      {
        matkulId: 4706,
        nama: "Algoritma dan Pemrograman",
        tugas: 90,
        uts: 95,
        uas: 100,
      },
    ],
  },
  {
    NIM: "A11.2022.14502",
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
  },
];

console.log(arrObj);

// destrukturisasi objek
const { NIM, nama, umur, status, jurusan, matakuliah } = mahasiswa;
console.log(NIM);
console.log(nama);
console.log(umur);
console.log(status);
console.log(jurusan);
console.log(matakuliah);

// destrukturisasi array
const [a, b, c, d, e] = arr;
console.log(a);

const { matkulId, nama: namaMatkul, tugas, uts, uas } = matakuliah[0];
console.log(matkulId);
console.log(namaMatkul);
console.log(tugas);
console.log(uts);
console.log(uas);

// spread operator
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// menggabungkan dua array
const arr3 = [...arr1, ...arr2];
console.log(arr3);

// template literal
const greeting = `Halo, nama saya ${nama}, NIM saya ${NIM}, saya berumur ${umur} tahun, saya jurusan ${jurusan}`;
console.log(greeting);
