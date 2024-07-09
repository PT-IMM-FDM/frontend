"use client";

import { useState } from "react";
import { Label, Radio, Button, HR } from "flowbite-react";

export function Component() {
  const [answers, setAnswers] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
  });

  const handleRadioChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allAnswered = Object.values(answers).every((answer) => answer !== "");
    if (!allAnswered) {
      alert("Harap menjawab semua pertanyaan sebelum mengirimkan.");
    } else {
      // Lakukan sesuatu dengan jawaban, misalnya mengirim ke server
      console.log("Jawaban terkirim:", answers);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="flex max-w-md flex-col gap-4">
        <legend className="mb-4 font-semibold">
          Pertanyaan 1 : BAGAIMANA PERASAAN KEADAAN KELELAHAN ANDA SEKARANG?
        </legend>
        <div className="flex items-center gap-2">
          <Radio
            id="q1a1"
            name="1"
            value="USA"
            onChange={handleRadioChange}
            checked={answers["1"] === "USA"}
          />
          <Label htmlFor="q1a1">
            Sangat waspada & terjaga
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            id="q1a2"
            name="1"
            value="Germany"
            onChange={handleRadioChange}
            checked={answers["1"] === "Germany"}
          />
          <Label htmlFor="q1a2">
            Sedikit lelah & perlu upaya untuk tetap waspada
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            id="q1a3"
            name="1"
            value="Spain"
            onChange={handleRadioChange}
            checked={answers["1"] === "Spain"}
          />
          <Label htmlFor="q1a3">
            Sangat lelah & sulit untuk tetap waspada
          </Label>
        </div>
        <HR.Text text="2" />


        <legend className="mb-4 font-semibold">
          Pertanyaan 2 : BERAPA JAM ANDA TIDUR DALAM 24 JAM TERAKHIR/ 1 HARI
          TERAKHIR? (DIHITUNG MUNDUR 24 JAM DARI JAM PERMULAAN SHIFT KERJA
          SEKARANG, KEMUDIAN JUMLAHKAN JAM TIDUR ANDA YANG TERPUTUS)
        </legend>
        <div className="flex items-center gap-2">
          <Radio
            id="q2a1"
            name="2"
            value="USA"
            onChange={handleRadioChange}
            checked={answers["2"] === "USA"}
          />
          <Label htmlFor="q2a1">
            1. Tidur lebih dari/ sama dengan 6 jam 
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            id="q2a2"
            name="2"
            value="Germany"
            onChange={handleRadioChange}
            checked={answers["2"] === "Germany"}
          />
          <Label htmlFor="q2a2">
            2. Tidur 5 jam
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            id="q2a3"
            name="2"
            value="Spain"
            onChange={handleRadioChange}
            checked={answers["2"] === "Spain"}
          />
          <Label htmlFor="q2a3">
            3. Tidur kurang dari/ sama dengan 4 jam
          </Label>
        </div>
        <HR.Text text="3" />
        {/* <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr> */}


        
        <legend className="mb-4 font-semibold">
          Pertanyaan 3 : BERAPA JAM ANDA TIDUR DALAM 48 JAM TERAKHIR/ 2 HARI
          TERAKHIR? (DIHITUNG MUNDUR 48 JAM DARI JAM PERMULAAN SHIFT KERJA
          SEKARANG, KEMUDIAN JUMLAHKAN JAM TIDUR ANDA YANG TERPUTUS)
        </legend>
        <div className="flex items-center gap-2">
          <Radio
            id="q3a1"
            name="3"
            value="USA"
            onChange={handleRadioChange}
            checked={answers["3"] === "USA"}
          />
          <Label htmlFor="q3a1">
            1. Tidur lebih dari/ sama dengan dua belas jam
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            id="q3a2"
            name="3"
            value="Germany"
            onChange={handleRadioChange}
            checked={answers["3"] === "Germany"}
          />
          <Label htmlFor="q3a2">
            2. Tidur sembilan s.d sebelas jam
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            id="q3a3"
            name="3"
            value="Spain"
            onChange={handleRadioChange}
            checked={answers["3"] === "Spain"}
          />
          <Label htmlFor="q3a3">
            3. Tidur kurang dari/ sama dengan 8 jam
          </Label>
        </div>
        <HR.Text text="4" />



        <legend className="mb-4 font-semibold">
          Pertanyaan 4 : BAGAIMANA KUALITAS TIDUR ANDA ?
          (Jawablah Pertanyaan dengan Mengklik Salah Satu Jawaban)
        </legend>
        <div className="flex items-center gap-2">
          <Radio
            id="q4a1"
            name="4"
            value="USA"
            onChange={handleRadioChange}
            checked={answers["4"] === "USA"}
          />
          <Label htmlFor="q4a1">
            1. Baik
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            id="q4a2"
            name="4"
            value="Germany"
            onChange={handleRadioChange}
            checked={answers["4"] === "Germany"}
          />
          <Label htmlFor="q4a2">
            2. Buruk (Sering terbangun saat tidur dengan frekuensi dua kali atau
            lebih disertai baru bisa tidur setelah lebih tiga puluh menit di
            pembaringan/tempat tidur)
          </Label>
        </div>
        <HR.Text text="5" />



        <legend className="mb-4 font-semibold">
          Pertanyaan 5 : APAKAH HARI INI ANDA MENGALAMI TANDA & GEJALA FATIGUE
          DALAM KATEGORI FAKTOR FISIK ? (LIHAT DAFTAR TANDA & GEJALA FAKTOR
          FISIK DIATAS)
        </legend>
        <div className="flex items-center gap-2">
          <Radio
            id="q5a1"
            name="5"
            value="USA"
            onChange={handleRadioChange}
            checked={answers["5"] === "USA"}
          />
          <Label htmlFor="q5a1">
            1. Tidak terdapat tanda gejala Fatigue
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            id="q5a2"
            name="5"
            value="Germany"
            onChange={handleRadioChange}
            checked={answers["5"] === "Germany"}
          />
          <Label htmlFor="q5a2">
            2. Ya, terdapat tanda gejala Fatigue
          </Label>
        </div>
        <HR.Text text="6" />

        <legend className="mb-4 font-semibold">
          Pertanyaan 6 : APAKAH HARI INI ANDA MENGALAMI TANDA & GEJALA FATIGUE
          DALAM KATEGORI FAKTOR MENTAL ? (LIHAT DAFTAR TANDA & GEJALA FAKTOR
          MENTAL DIATAS)
        </legend>
        <div className="flex items-center gap-2">
          <Radio
            id="q6a1"
            name="6"
            value="USA"
            onChange={handleRadioChange}
            checked={answers["6"] === "USA"}
          />
          <Label htmlFor="q6a1">
            1. Tidak terdapat tanda gejala Fatigue
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            id="q6a2"
            name="6"
            value="Germany"
            onChange={handleRadioChange}
            checked={answers["6"] === "Germany"}
          />
          <Label htmlFor="q6a2">
            2. Ya, terdapat tanda gejala Fatigue
          </Label>
        </div>
        <HR.Text text="7" />

        <legend className="mb-4 font-semibold">
          Pertanyaan 7 : APAKAH DALAM 24 JAM TERKAHIR ANDA MENGALAMI SALAH SATU
          KELUHAN BERIKUT: NYERI DADA, SESAK NAPAS, NYERI ULU HATI, BERDEBAR ?
        </legend>
        <div className="flex items-center gap-2">
          <Radio
            id="q7a1"
            name="7"
            value="USA"
            onChange={handleRadioChange}
            checked={answers["7"] === "USA"}
          />
          <Label htmlFor="q7a1">
            1. Tidak
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            id="q7a2"
            name="7"
            value="Germany"
            onChange={handleRadioChange}
            checked={answers["7"] === "Germany"}
          />
          <Label htmlFor="q7a2">
            2. Ya
          </Label>
        </div>
        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <Button className="mb-8" type="submit">Submit</Button>
      </fieldset>
    </form>
  );
}
