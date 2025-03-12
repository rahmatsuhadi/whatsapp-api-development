const { default: axios } = require("axios");

const clientAmikom = axios.create({
  baseURL: "https://apiamikom.vercel.app", // Ganti dengan URL dasar API Anda
  headers: {
    "Content-Type": "application/json", // Menentukan tipe konten
  },
});

const getMatakuliah = async (nim, token) => {
  try {
    const response = await clientAmikom.get("/jadwal", {
      params: {
        nim: nim,
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching matakuliah data:", error);
    throw error;
  }
};

const absen = async (nim, kode, token) => {
    try {
        const response = await clientAmikom.get('/absen/v2', {
            params: {
                nim: nim,
                kode: kode,
                token: token,
            },
        });
        console.log('Absen berhasil:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error saat melakukan absen:', error);
        throw error;
    }
};



module.exports = {getMatakuliah, absen}