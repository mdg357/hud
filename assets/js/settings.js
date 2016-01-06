var WEATHER_API_KEY = "";
var HABITICA_USER_KEY = "";
var HABITICA_API_KEY = "";
var CITY_ID = "5074472"; // Omaha, NE

var SETTINGS = {
    sunrise_time: null,
    sunset_time: null,
    default_weather_id_day: 0,
    default_weather_id_night: 1,
    weather_type_index: 0,
    weather_count_index: 1,
    image_path: "assets/images/",
    habitica_task_type: "daily",
    countdown_end_time: "05/27/2016 10:00:00 PM", //UTC time
    urls: {
        current_weather: "http://api.openweathermap.org/data/2.5/weather?id=" + CITY_ID + "&APPID=" + WEATHER_API_KEY + "&units=imperial",
        forecast_weather: "http://api.openweathermap.org/data/2.5/forecast/city?id=" + CITY_ID + "&APPID=" + WEATHER_API_KEY + "&units=imperial",
        habitica_tasks: "https://habitica.com/api/v2/user/tasks",
        sunrise_sunset: ["http://api.sunrise-sunset.org/json?lat=", "&lng=", "&date=today"]
    },
    text: {
        default: "",
        unknown: "?",
    },
    errors: {
        habitica_http: "Error retreiving Habitica task data",
        habitica_key: "Habitica API or User Key not set, exiting...",
        forecast_weather_http: "Error retreiving forecast weather data",
        current_weather_http: "Error retreiving current weather data",
        weather_keys: "Weather API Key or City ID not set, exiting...",
        sunrise_sunset_http: "Error retreiving sunrise/sunset data"
    },
    intervals: {
        current_weather: 1000 * 60 * 30, // 30 minutes
        forecast_weather: 1000 * 60 * 60 * 12, // 12 hours
        habitica_tasks: 1000 * 60 * 30, // 30 minutes
        clock: 1000,
        countdown: 1000
    },
    formatting: {
        dateTime: "dddd, MMMM D, YYYY",
        sunrise_sunset: "h:mm:ss A",
        hoursAndMinutes: "hh:mm",
        three_letter_day: "ddd",
        date: "MM/DD/YYYY",
        seconds: "ss",
        unix: "X",
    },
    shortDayStrings: {
        sun: "su",        
        mon: "m", 
        tue: "t",
        wed: "w",
        thu: "th",
        fri: "f",
        sat: "s"
    },
    max_checklist_items: 12,
    max_checklist_items_per_column: 6
};

var WEATHER_ICON_LIST = [
    { id: SETTINGS.default_weather_id_day, icon: "2.svg", description: "default-day" },
    { id: SETTINGS.default_weather_id_night, icon: "3.svg", description: "default-night" },
    { id: 200, icon: "27.svg", description: "thunderstorm with light rain" },
    { id: 201, icon: "27.svg", description: "thunderstorm with rain" },
    { id: 202, icon: "27.svg", description: "thunderstorm with heavy rain" },
    { id: 210, icon: "27.svg", description: "light thunderstorm" },
    { id: 211, icon: "27.svg", description: "thunderstorm" },
    { id: 212, icon: "27.svg", description: "heavy thunderstorm" },
    { id: 221, icon: "27.svg", description: "ragged thunderstorm" },
    { id: 230, icon: "27.svg", description: "thunderstorm with light drizzle" },
    { id: 231, icon: "27.svg", description: "thunderstorm with drizzle" },
    { id: 232, icon: "27.svg", description: "thunderstorm with heavy drizzle" },
    { id: 300, icon: "17.svg", description: "light intensity drizzle" },
    { id: 301, icon: "17.svg", description: "drizzle" },
    { id: 302, icon: "17.svg", description: "heavy intensity drizzle" },
    { id: 310, icon: "17.svg", description: "light intensity drizzle rain" },
    { id: 311, icon: "17.svg", description: "drizzle rain" },
    { id: 312, icon: "17.svg", description: "heavy intensity drizzle rain" },
    { id: 313, icon: "17.svg", description: "shower rain and drizzle" },
    { id: 314, icon: "18.svg", description: "heavy shower rain and drizzle" },
    { id: 321, icon: "17.svg", description: "shower drizzle" },
    { id: 500, icon: "17.svg", description: "light rain" },
    { id: 501, icon: "17.svg", description: "moderate rain" },
    { id: 502, icon: "18.svg", description: "heavy intensity rain" },
    { id: 503, icon: "18.svg", description: "very heavy rain" },
    { id: 504, icon: "18.svg", description: "extreme rain" },
    { id: 511, icon: "18.svg", description: "freezing rain" },
    { id: 520, icon: "17.svg", description: "light intensity shower rain" },
    { id: 521, icon: "17.svg", description: "shower rain" },
    { id: 522, icon: "18.svg", description: "heavy intensity shower rain" },
    { id: 531, icon: "22.svg", description: "ragged shower rain" },
    { id: 600, icon: "22.svg", description: "light snow" },
    { id: 601, icon: "22.svg", description: "snow" },
    { id: 602, icon: "23.svg", description: "heavy snow" },
    { id: 611, icon: "22.svg", description: "sleet" },
    { id: 612, icon: "22.svg", description: "shower sleet" },
    { id: 615, icon: "22.svg", description: "light rain and snow" },
    { id: 616, icon: "22.svg", description: "rain and snow" },
    { id: 620, icon: "22.svg", description: "light shower snow" },
    { id: 621, icon: "22.svg", description: "shower snow" },
    { id: 622, icon: "23.svg", description: "heavy shower snow" },
    { id: 800, icon: "2.svg", description: "clear sky" },
    { id: 801, icon: "2.svg", description: "few clouds" },
    { id: 802, icon: "25.svg", description: "scattered clouds" },
    { id: 803, icon: "25.svg", description: "broken clouds" },
    { id: 804, icon: "25.svg", description: "overcast clouds" },
    { id: 905, icon: "6.svg", description: "windy" },
    { id: 906, icon: "24.svg", description: "hail" },
    { id: 951, icon: "2.svg", description: "calm" },
    { id: 741, icon: "13.svg", description: "fog" }
];
