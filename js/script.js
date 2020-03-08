// memilih atribut class tanah
const tanah = document.querySelectorAll('.tanah');
// memilih atribut class tikus
const tikus = document.querySelectorAll('.tikus');
// memilih atribut class papan-skor
const papanSkor = document.querySelector('.papan-skor');
// memilih atribut class pops
const pop = document.querySelector('#pop');

// deklarasi variabel tanahSebelumnya untuk menghindari angka kembar
let tanahSebelumnya;
// deklarasi variabel selesai untuk menentukan kapan game berakhir / selesai
let selesai;
// deklarasi variabel skor
let skor;

function randomTanah(tanah) {
    
    // buat const tRandom digunakan untuk menyimpan angka random (max: banyaknya elemen tanah)
    const t = Math.floor(Math.random() * tanah.length);

    // const tRandom di isi dengan param tanah yang didalamnya terdapat angka random
    const tRandom = tanah[t];

    // jika isi dari tRandom sama dengan tanahSebelumnya makan jalankan function randomTanah kembali
    if( tRandom == tanahSebelumnya ) {
        randomTanah(tanah);
    }
    
    // jika isi dari tRandom & tanahSebelumnya tidak sama makan simpan isi tanahSebelumnya dengan const tRandom
    tanahSebelumnya = tRandom

    // kembalikan nilai tRandom
    return tRandom;
}

// membuat waktu kemunculan tikus secara acak / random
function randomWaktu(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function munculkanTikus() {
    // console.log(tanah); check isi dari const tanah

    // const tRandom memanggil function randomTanah
    const tRandom = randomTanah(tanah);
    
    // const wRandom menjalankan function randomWaktu main 500 mili detik max 1500 mili detik
    const wRandom = randomWaktu(750, 1000);

    // menambahkan class muncul ke dalam elemen class tanah
    tRandom.classList.add('muncul');

    // hapus class muncul
    setTimeout(() => {
        tRandom.classList.remove('muncul');
        
        // jalankan game sampai dengan kondisi var selesai = true
        if (!selesai) {
            // menjalankan function munculkanTikus recursive / terus menerus
            munculkanTikus();
        }
        
        // diset sesuai dengan wRandom
    }, wRandom);
}

function mulai() {
    // menentukan game mulai
    selesai = false;
    // skor dimulai dari angka 0
    skor = 0;
    // papan skor dimulai dari angka 0
    papanSkor.textContent = 0;

    // jalankan function munculkanTikut() untuk munculkan tikus
    munculkanTikus();

    // selama 15 detik tikus akan muncul
    setTimeout(() => {
        selesai = true;
    }, 15000);
}

function pukul() {
    // menaikan angka skor
    skor++;
    
    // merubah tampilan skor 
    papanSkor.textContent = skor;
    
    
    // jika tikus kena pukul hapus class muncul pada class parent (tanah)
    this.parentNode.classList.remove('muncul');
    
    // jalankan audio
    pop.play();

}

// perulangan forEach
tikus.forEach(t => {
    // jika tikus kena pukul
    t.addEventListener('click', pukul);
});