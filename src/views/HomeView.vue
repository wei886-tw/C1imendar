<template >
  <div class="container-fluid">
    <div class="row flex-wrap">
      <div
        class="d-none d-lg-block col-lg-1 border-end border-2 border-white shadow shadow-lg vh-100"
      >
        <navbar-view></navbar-view>
      </div>

      <div class="col-12 col-lg-8 px-24 ps-lg-40 pt-24">
        <div class="container">
          <div class="container px-0 d-flex mb-24 mb-lg-40">
            <div class="container ps-0">
              <h1 class="d-none d-md-block fs-40 noto-serif-tc fw-bold mb-16 pt-36">
                台北市今日天氣
              </h1>
              <h2 class="d-block d-md-none fs-40 noto-serif-tc fw-bold pt-24">台北市</h2>
              <h2 class="d-block d-md-none fs-40 noto-serif-tc fw-bold">今日天氣</h2>
              <p class="d-none d-md-block fs-24 mb-0">天氣狀況：{{ weatherDescription }}</p>
              <p class="d-none d-md-block fs-24 mb-0">溫度： {{ parseInt(temp) }} °C</p>
            </div>
            <div class="container mb-0 pe-0 d-flex justify-content-end">
              <img
                :src="weatherPic[weatherDescription]"
                alt="天氣圖片"
                class="d-none d-md-block"
                style="height: auto; max-height: 200px"
              />
              <img
                :src="weatherPic[weatherDescription]"
                alt="天氣圖片"
                class="d-block d-md-none"
                style="height: auto; max-height: 150px"
              />
            </div>
          </div>
        </div>

        <!-- 今日天氣 -->
        <div
          class="container d-flex px-0 justify-content-between flex-wrap align-items-center mt-lg-auto"
        >
          <div class="row justify-content-between gap-24 gap-lg-32">
            <div
              class="col-12 col-lg-5 border rounded rounded-3 ps-16 d-flex align-items-center justify-content-start shadow py-16 py-md-36"
            >
              <p class="fs-20 fs-xl-24 mb-0"><i class="bi bi-thermometer-half"></i> 體感溫度：</p>
              <p class="fs-20 fs-xl-24 fw-bold mb-0">
                &nbsp;&nbsp;&nbsp;&nbsp;{{ parseInt(feelsLike) }} °C
              </p>
            </div>

            <div
              class="col-12 col-lg-5 border rounded rounded-3 ps-16 d-flex align-items-center justify-content-start shadow py-16 py-md-36"
            >
              <p class="fs-20 fs-xl-24 mb-0"><i class="bi bi-droplet"></i> 濕度：</p>
              <p class="fs-20 fs-xl-24 fw-bold mb-0">&nbsp;&nbsp;&nbsp;&nbsp;{{ humidity }} %</p>
            </div>

            <div
              class="col-12 col-lg-5 border rounded rounded-3 ps-16 d-flex align-items-center justify-content-start shadow py-16 py-md-36"
            >
              <p class="fs-20 fs-xl-24 mb-0"><i class="bi bi-thermometer-sun"></i> 最高溫度：</p>
              <p class="fs-20 fs-xl-24 fw-bold mb-0">
                &nbsp;&nbsp;&nbsp;&nbsp;{{ parseInt(tempMax) }} °C
              </p>
            </div>

            <div
              class="col-12 col-lg-5 border rounded rounded-3 ps-16 d-flex align-items-center justify-content-start shadow py-16 py-md-36"
            >
              <p class="fs-20 fs-xl-24 mb-0"><i class="bi bi-graph-up"></i> 氣壓：</p>
              <p class="fs-20 fs-xl-24 fw-bold mb-0">&nbsp;&nbsp;&nbsp;&nbsp;{{ pressure }} hPa</p>
            </div>

            <div
              class="col-12 col-lg-5 border rounded rounded-3 ps-16 d-flex justify-content-start align-items-center shadow py-16 py-md-36"
            >
              <p class="fs-20 fs-xl-24 mb-0"><i class="bi bi-thermometer-snow"></i> 最低溫度：</p>
              <p class="fs-20 fs-xl-24 fw-bold mb-0">
                &nbsp;&nbsp;&nbsp;&nbsp;{{ parseInt(tempMin) }} °C
              </p>
            </div>

            <div
              class="col-12 col-lg-5 border rounded rounded-3 ps-16 d-flex justify-content-start align-items-center shadow py-16 py-md-36"
            >
              <p class="fs-20 fs-xl-24 mb-0"><i class="bi bi-wind"></i> 風速：</p>
              <p class="fs-20 fs-xl-24 fw-bold mb-0">&nbsp;&nbsp;&nbsp;&nbsp;{{ speed }} m/s</p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="col-12 col-lg-3 pt-24 px-24 ps-lg-48 d-flex flex-column"
        style="min-height: 100vh"
      >
        <div class="container px-0 d-flex justify-content-between"></div>
        <!-- 明日預測 -->
        <h2 class="fs-40 mb-24 noto-serif-tc fw-bold text-white">台北市一週天氣</h2>
        <div class="container mb-lg-60 mb-xxl-96">
          <p class="fs-24 mb-0">明日天氣： {{ nextWeatherDescription }}</p>
          <div class="container d-flex justify-content-between px-0">
            <!-- <div class="container px-0">
              <p class="mb-0 fw-bolder fs-24 d-lg-none d-xl-block">
                <i class="bi bi-thermometer-half " style="-webkit-text-stroke: 0.5px"></i
                >&nbsp;&nbsp;
              </p>
              <div class="container d-flex flex-xl-column px-0">
                <p class="d-lg-none">體感溫度：</p>
                <p class="mb-0 fs-16 fs-xl-24">{{ parseInt(nextDayFeelsLike) }} °C</p>
              </div>
            </div> -->

            <div class="container px-0">
              <div class="container d-flex px-0 justify-content-start flex-wrap">
                <p class="fs-24 mb-0">低溫：</p>
                <p class="mb-0 fs-24">{{ parseInt(nextDayTempMin) }} °C</p>
              </div>
            </div>

            <div class="container px-0">
              <!-- <p class="mb-0 fw-bolder fs-24 d-lg-none d-xl-block">
                <i class="bi bi-thermometer-sun" style="-webkit-text-stroke: 0.5px"></i>&nbsp;&nbsp;
              </p> -->
              <div class="container d-flex px-0 justify-content-end flex-wrap">
                <p class="fs-24 mb-0">高溫：</p>
                <p class="mb-0 fs-24">{{ parseInt(nextDayTempMax) }} °C</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 一週預測 -->
        <div
          class="container px-0 d-flex flex-column justify-content-between border border-2 rounded rounded-3 "
        >
          <div class="container border-bottom border-2">
            <div class="container d-flex py-16 py-xxl-20 mb-0 justify-content-between pe-24">
              <!-- todo 優化 RWD UI -->
              <p class="fs-20 fs-md-24 mb-0 d-block d-lg-none d-xl-block">
                {{ forecastDays.day1 ? forecastDays.day1.substr(5, 5) : '' }} :&nbsp;&nbsp;
              </p>
              <p class="fs-20 fs-md-24 mb-0">
                {{
                  weatherEmoji[
                    forecastDescription.day1 ? forecastDescription.day1[0].description : ''
                  ]
                }}
              </p>

              <p class="d-block d-lg-none d-xl-block fs-20 fs-md-24 mb-0">
                {{ forecastWeather.day1 ? parseInt(forecastWeather.day1.temp_max) : '' }}/
                {{ forecastWeather.day1 ? parseInt(forecastWeather.day1.temp_min) : '' }}
              </p>
            </div>
          </div>

          <div class="container border-bottom border-2">
            <div class="container d-flex py-16 py-xxl-20 mb-0 justify-content-between pe-24">
              <p class="fs-20 fs-md-24 mb-0 d-block d-lg-none d-xl-block">
                {{ forecastDays.day2 ? forecastDays.day2.substr(5, 5) : '' }} :&nbsp; &nbsp;
              </p>
              <p class="fs-20 fs-md-24 mb-0">
                {{
                  weatherEmoji[
                    forecastDescription.day2 && forecastDescription.day2[0]
                      ? forecastDescription.day2[0].description
                      : ''
                  ]
                }}
              </p>

              <p class="d-block d-lg-none fs-20 fs-md-24 mb-0">
                {{ forecastWeather.day2 ? parseInt(forecastWeather.day2.temp_max) : '' }}/
                {{ forecastWeather.day2 ? parseInt(forecastWeather.day2.temp_min) : '' }}
              </p>
            </div>
          </div>

          <div class="container border-bottom border-2">
            <div class="container d-flex py-16 py-xxl-20 mb-0 justify-content-between pe-24">
              <p class="fs-20 fs-md-24 mb-0 d-block d-lg-none d-xl-block">
                {{ forecastDays.day3 ? forecastDays.day3.substr(5, 5) : '' }} :&nbsp; &nbsp;
              </p>
              <p class="fs-20 fs-md-24 mb-0">
                {{
                  weatherEmoji[
                    forecastDescription.day3 && forecastDescription.day3[0]
                      ? forecastDescription.day3[0].description
                      : ''
                  ]
                }}
              </p>

              <p class="d-block d-lg-none fs-20 fs-md-24 mb-0">
                {{ forecastWeather.day3 ? parseInt(forecastWeather.day3.temp_max) : '' }}/
                {{ forecastWeather.day3 ? parseInt(forecastWeather.day3.temp_min) : '' }}
              </p>
            </div>
          </div>

          <div class="container border-bottom border-2">
            <div class="container d-flex py-16 py-xxl-20 mb-0 justify-content-between pe-24">
              <p class="fs-20 fs-md-24 mb-0 d-block d-lg-none d-xl-block">
                {{ forecastDays.day4 ? forecastDays.day4.substr(5, 5) : '' }} :&nbsp; &nbsp;
              </p>
              <p class="fs-20 fs-md-24 mb-0">
                {{
                  forecastDescription.day4 && forecastDescription.day4[0]
                    ? weatherEmoji[forecastDescription.day4[0].description]
                    : ''
                }}
              </p>

              <p class="d-block d-lg-none fs-20 fs-md-24 mb-0">
                {{ forecastWeather.day4 ? parseInt(forecastWeather.day4.temp_max) : '' }}/
                {{ forecastWeather.day4 ? parseInt(forecastWeather.day4.temp_min) : '' }}
              </p>
            </div>
          </div>

          <div class="container">
            <div class="container d-flex py-16 py-xxl-20 mb-0 justify-content-between pe-24">
              <p class="fs-20 fs-md-24 mb-0 d-block d-lg-none d-xl-block">
                {{ forecastDays.day5 ? forecastDays.day5.substr(5, 5) : '' }} :&nbsp; &nbsp;
              </p>
              <p class="fs-20 fs-md-24 mb-0">
                {{
                  forecastDescription.day5 && forecastDescription.day5[0]
                    ? weatherEmoji[forecastDescription.day5[0].description]
                    : ''
                }}
              </p>

              <p class="fs-20 fs-md-24 d-block d-lg-none">
                {{ forecastWeather.day5 ? parseInt(forecastWeather.day5.temp_max) : '' }}/
                {{ forecastWeather.day5 ? parseInt(forecastWeather.day5.temp_min) : '' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/components/NavbarView.vue'
import NavbarView from '@/components/NavbarView.vue'

export default {
  components: { NavbarView },
  data() {
    return {
      apiKey: import.meta.env.VITE_WEATHER_API_KEY,
      weatherDescription: null,
      temp: null,
      feelsLike: null, // 體感溫度
      tempMin: null, // 最低溫度
      tempMax: null, // 最高溫度
      pressure: null, // 氣壓
      humidity: null, // 濕度
      speed: null, // 風速
      name: null, // 城市名稱
      nextDayTemp: null,
      nextDayFeelsLike: null,
      nextDayTempMin: null,
      nextDayTempMax: null,
      nextDayPressure: null,
      nextDayHumidity: null,
      nextDaySpeed: null,
      nextDayName: null,
      nextWeatherDescription: null,
      todayDate: new Date(),
      fiveDaysForecast: null,
      forecastData: null,
      todayDays: null,
      weatherEmoji: {
        小雨: '💧 ',
        中雨: '🌧️',
        多雲: '🌥️',
        '陰，多雲': '☁️',
        晴: '☀️',
        陰: '🌫️',
        雷雨: '⛈️',
        大雨: '🌧️',
        陣雨: '🌦️',
        雪: '❄️',
        霧: '🌫️',
        '晴，少雲': '🌤️',
      },
      weatherPic: {
        小雨: 'https://cdn-icons-png.flaticon.com/512/1779/1779927.png',
        中雨: 'https://cdn-icons-png.flaticon.com/512/1146/1146858.png',
        多雲: 'https://cdn-icons-png.flaticon.com/512/414/414927.png',
        '陰，多雲': 'https://cdn-icons-png.flaticon.com/512/1146/1146869.png',
        晴: 'https://cdn-icons-png.flaticon.com/512/979/979585.png',
        陰: 'https://cdn-icons-png.flaticon.com/512/1146/1146856.png',
        雷雨: 'https://cdn-icons-png.flaticon.com/512/1146/1146860.png',
        大雨: 'https://cdn-icons-png.flaticon.com/512/1146/1146859.png',
        陣雨: 'https://cdn-icons-png.flaticon.com/512/1163/1163657.png',
        雪: 'https://cdn-icons-png.flaticon.com/512/642/642000.png',
        霧: 'https://cdn-icons-png.flaticon.com/512/1197/1197102.png',
      },
      forecastDays: {
        day1: null,
        day2: null,
        day3: null,
        day4: null,
        day5: null,
      },
      forecastWeather: {
        day1: null,
        day2: null,
        day3: null,
        day4: null,
        day5: null,
      },
      forecastDescription: {
        day1: null,
        day2: null,
        day3: null,
        day4: null,
        day5: null,
      },
    }
  },

  methods: {
    async getCurrentWeather() {
      try {
        const res = await this.$http.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Taipei,TW&appid=${this.apiKey}&units=metric&lang=zh_tw`
        )
        this.weatherDescription = res.data.weather[0].description
        this.temp = res.data.main.temp
        this.feelsLike = res.data.main.feels_like // 體感溫度
        this.tempMin = res.data.main.temp_min // 最低溫度
        this.tempMax = res.data.main.temp_max // 最高溫度
        this.pressure = res.data.main.pressure // 氣壓
        this.humidity = res.data.main.humidity // 濕度
        this.speed = res.data.wind.speed // 風速
        this.name = res.data.name // 城市名稱
      } catch (err) {
        console.log(err.message)
      }
    },

    async getNextDayForecast() {
      try {
        const res = await this.$http.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Taipei&appid=${this.apiKey}&units=metric&lang=zh_tw`
        )
        this.nextDayTemp = res.data.main.temp
        this.nextDayFeelsLike = res.data.main.feels_like
        this.nextDayTempMin = res.data.main.temp_min
        this.nextDayTempMax = res.data.main.temp_max
        this.nextDayPressure = res.data.main.pressure
        this.nextDayHumidity = res.data.main.humidity
        this.nextDaySpeed = res.data.wind.speed
        this.nextDayName = res.data.name
        this.nextWeatherDescription = res.data.weather[0].description
      } catch (err) {
        console.log(err.message)
      }
    },

    async getFiveDayForecast() {
      const loader = this.$loading.show()
      try {
        const res = await this.$http.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=Taipei&units=metric&lang=zh_tw&appid=${this.apiKey}`
        )
        this.forecastData = res.data.list
        let j = 1
        for (let i = 0; i < this.forecastData.length; i++) {
          if (this.forecastData[i].dt_txt.includes('00:00:00')) {
            this.forecastDays['day' + [j]] = this.forecastData[i].dt_txt
            this.forecastWeather['day' + [j]] = this.forecastData[i].main
            this.forecastDescription['day' + [j]] = this.forecastData[i].weather
            j++
          }
        }
      } catch (err) {
        alert(err.message)
      }
      setTimeout(() => {
        loader.hide()
      }, 1000)
    },

    convertTimeStamp2LocalTime(timeStamp) {
      const date = new Date(timeStamp * 1000)
      return date.toLocaleString('zh-Tw', {
        timeZone: 'Asia/Taipei',
      })
    },

    convert2WeatherEmoji(weather) {
      return this.weatherEmoji(weather)
    },
  },

  mounted() {
    this.getCurrentWeather()
    this.getNextDayForecast()
    this.getFiveDayForecast()
  },
}
</script>