# 🌤️ Türkiye Hava Durumu Uygulaması (Weather App)

Bu proje, Türkiye'nin 81 ili için anlık hava durumu verilerini görüntüleyen, modern arayüze sahip bir web uygulamasıdır.

Kullanıcılar şehirler arasında anlık arama yapabilir ve her şehrin sıcaklık, rüzgar hızı ve hava durumu ikonlarını dinamik olarak görüntüleyebilir.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License]()

✨ Özellikler

* **API Entegrasyonu:** **Open-Meteo API** kullanılarak gerçek zamanlı hava durumu verileri (sıcaklık, rüzgar hızı, hava kodu) çekilir.
* **JSON Veri Yönetimi:** İllerin koordinat bilgileri (enlem/boylam) yerel bir `iller.json` dosyasından yönetilir.
* **Anlık Arama (Live Search):** Arama kutusuna yazılan harflere göre şehirler anında filtrelenir.
* **Dinamik UI:** Hava durumuna göre değişen hareketli GIF ikonları (Güneşli, Bulutlu, Yağmurlu, Karlı).
* **Modern Tasarım:**
    * **Glassmorphism:** Kartlarda ve arama çubuğunda buzlu cam efekti.
    * **Responsive:** Bootstrap 5 grid sistemi ile mobil ve masaüstü tam uyumluluk.
    * **Loading State:** Veriler yüklenirken kullanıcıya görsel geri bildirim verilir.

🛠️ Kullanılan Teknolojiler

* ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
* ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) **(Bootstrap 5 + Custom CSS)**
* ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) **(ES6+, Fetch API, Async/Await)**
* **Veri Kaynağı:** [Open-Meteo API](https://open-meteo.com/)

```markdown
## 📂 Dosya Yapısı

weather-app/
├── assets/
│   └── images/          # Hava durumu GIF'leri (sunny, cloudy, rainy, snowy)
├── css/
│   └── style.css        # Özelleştirilmiş stiller ve Glassmorphism efektleri
├── js/
│   └── app.js           # API istekleri, DOM manipülasyonu ve arama mantığı
├── iller.json           # 81 ilin koordinat verileri
├── index.html           # Ana sayfa
└── README.md            # Proje dokümantasyonu
🚀 Kurulum ve Çalıştırma
Projeyi bilgisayarınıza klonlayın:

Bash
git clone [https://github.com/KULLANICI_ADIN/weather-app.git](https://github.com/KULLANICI_ADIN/weather-app.git)
Proje klasörüne gidin.

index.html dosyasını tarayıcınızda açın.

Not: Fetch API kullandığı için bazı tarayıcılarda yerel dosyalar (file://) güvenlik engeline takılabilir. VS Code "Live Server" eklentisi ile açmanız önerilir.
