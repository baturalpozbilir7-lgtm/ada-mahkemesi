import { useState } from "react";

function App() {
  const [hakimler, setHakimler] = useState([
    { ad: "Hakim A", beraat: 1000, cekimser: 500 },
    { ad: "Hakim B", beraat: 1200, cekimser: 400 },
    { ad: "Hakim C", beraat: 800, cekimser: 300 },
    { ad: "Hakim D", beraat: 1500, cekimser: 700 },
    { ad: "Hakim E", beraat: 900, cekimser: 450 },
  ]);

  const [juriSayisi, setJuriSayisi] = useState(5);
  const [juriRusvet, setJuriRusvet] = useState(200);
  const [sonuc, setSonuc] = useState(null);

  const handleHakimChange = (index, alan, value) => {
    const yeniHakimler = [...hakimler];
    yeniHakimler[index][alan] = Number(value);
    setHakimler(yeniHakimler);
  };

  const hesapla = () => {
    let enUcuz = { maliyet: Infinity, hakim: null, karar: null };

    hakimler.forEach((h) => {
      if (h.beraat < enUcuz.maliyet)
        enUcuz = { maliyet: h.beraat, hakim: h.ad, karar: "Beraat" };
      const cekimserJuri = Math.ceil(juriSayisi / 2);
      const cekimserMaliyet = h.cekimser + cekimserJuri * juriRusvet;
      if (cekimserMaliyet < enUcuz.maliyet)
        enUcuz = { maliyet: cekimserMaliyet, hakim: h.ad, karar: "Çekimser" };
      const sucMaliyet = juriSayisi * juriRusvet;
      if (sucMaliyet < enUcuz.maliyet)
        enUcuz = { maliyet: sucMaliyet, hakim: h.ad, karar: "Suçlu" };
    });

    setSonuc(enUcuz);
  };

  return (
    <div className="container">
      <h1>Ada Mahkemesi</h1>

      <h2>Hakimler</h2>
      <div>
        {hakimler.map((h, index) => (
          <div key={index}>
            <h3>{h.ad}</h3>
            <div>
              <label>
                Beraat:
                <input
                  type="number"
                  value={h.beraat}
                  onChange={(e) =>
                    handleHakimChange(index, "beraat", e.target.value)
                  }
                />
              </label>
              <label>
                Çekimser:
                <input
                  type="number"
                  value={h.cekimser}
                  onChange={(e) =>
                    handleHakimChange(index, "cekimser", e.target.value)
                  }
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      <h2>Jüri</h2>
      <div>
        <label>
          Jüri sayısı:
          <input
            type="number"
            value={juriSayisi}
            onChange={(e) => setJuriSayisi(Number(e.target.value))}
          />
        </label>
        <label>
          Jüri rüşveti:
          <input
            type="number"
            value={juriRusvet}
            onChange={(e) => setJuriRusvet(Number(e.target.value))}
          />
        </label>
      </div>

      <button onClick={hesapla}>Hesapla</button>

      {sonuc && (
        <div>
          <h2>En Ucuz Beraat Sonucu</h2>
          <p>
            <strong>Hakim:</strong> {sonuc.hakim}
          </p>
          <p>
            <strong>Karar:</strong> {sonuc.karar}
          </p>
          <p>
            <strong>Toplam Maliyet:</strong> {sonuc.maliyet}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
