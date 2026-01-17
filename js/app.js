// Konfigürasyon
const JSON_URL = 'iller.json'; 
const CONTAINER = document.getElementById('cities-container');
const LOADING = document.getElementById('loading');
const SEARCH_INPUT = document.getElementById('city-search');
const NO_RESULT = document.getElementById('no-result');

// Başlat
document.addEventListener('DOMContentLoaded', init);

async function init() {
    try {
        // Verileri Çek
        const response = await fetch(JSON_URL);
        if (!response.ok) throw new Error("JSON dosyası okunamadı.");
        
        const data = await response.json();
        
        // Kartları Oluştur
        await fetchWeatherDataForCities(data.cities);

        // Arama Fonksiyonunu Aktif Et
        setupSearchFilter();
        
    } catch (error) {
        console.error('Hata:', error);
        CONTAINER.innerHTML = `<div class="alert alert-danger w-100">Veri yükleme hatası: ${error.message}</div>`;
        LOADING.style.display = 'none';
        CONTAINER.style.display = 'block';
    }
}

async function fetchWeatherDataForCities(cities) {
    const cityPromises = cities.map(async (city) => {
        try {
            const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`;
            const res = await fetch(apiUrl);
            const weatherData = await res.json();
            
            return { ...city, weather: weatherData.current_weather };
        } catch (err) {
            console.error(`${city.name} verisi alınamadı`, err);
            return null;
        }
    });

    const results = await Promise.all(cityPromises);
    
    LOADING.style.display = 'none';
    CONTAINER.style.display = 'flex';

    results.forEach(cityData => {
        if (cityData) createCityCard(cityData);
    });
}

function createCityCard(data) {
    const weatherCode = data.weather.weathercode;
    const weatherInfo = getWeatherDetails(weatherCode);
    
    // Sıcaklığı yuvarla (Örn: 14.7 -> 15)
    const roundedTemp = Math.round(data.weather.temperature);

    const col = document.createElement('div');
    col.className = 'col city-card-wrapper'; 
    col.setAttribute('data-city-name', data.name.toLowerCase());

    col.innerHTML = `
        <div class="card h-100 shadow-sm">
            <img src="assets/images/${weatherInfo.image}" class="card-img-top" alt="${weatherInfo.description}">
            
            <div class="card-body text-center">
                <h5 class="card-title fw-bold text-primary">${data.name}</h5>
                <span class="badge bg-info text-dark weather-badge mb-3">${weatherInfo.description}</span>
                
                <div class="temp-text">${roundedTemp}°C</div>
                
                <hr>
                <div class="d-flex justify-content-around">
                    <div class="detail-item">
                        <small>Rüzgar</small><br>
                        <strong>${data.weather.windspeed} km/s</strong>
                    </div>
                    <div class="detail-item">
                        <small>Kod</small><br>
                        <strong>${weatherCode}</strong>
                    </div>
                </div>
            </div>
        </div>
    `;

    CONTAINER.appendChild(col);
}

function getWeatherDetails(code) {
    let image = 'sunny.gif';
    let description = 'Bilinmiyor';

    if (code === 0) {
        description = 'Güneşli';
        image = 'sunny.gif';
    } else if ([1, 2, 3, 45, 48].includes(code)) {
        description = 'Bulutlu';
        image = 'cloudy.gif';
    } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82, 95].includes(code)) {
        description = 'Yağmurlu';
        image = 'rainy.gif';
    } else if ([71, 73, 75, 77, 85, 86].includes(code)) {
        description = 'Karlı';
        image = 'snowy.gif';
    }

    return { image, description };
}

// Arama ve Filtreleme Mantığı
function setupSearchFilter() {
    SEARCH_INPUT.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.city-card-wrapper');
        let hasResult = false;

        cards.forEach(card => {
            const cityName = card.getAttribute('data-city-name');
            
            if (cityName.includes(searchTerm)) {
                card.style.display = 'block';
                hasResult = true;
            } else {
                card.style.display = 'none';
            }
        });

        NO_RESULT.style.display = hasResult ? 'none' : 'block';
    });
}