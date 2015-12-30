var weatherIcons = [
            { id: 0, icon: "2.svg", description: "default" },
            { id: 1, icon: "1.svg", description: "sunrise" },
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
        
        function getWeatherIcon(weatherIcons, id) {
            var icon = weatherIcons[0].icon;
            
            $.each(weatherIcons, function(key, value) {
                if(value.id == id) {
                    icon = value.icon;
                    break;
                }
            })
            
            return icon;
        }
        
        function updateTime() {
            $("#dateTime").html(moment().format('dddd, MMMM D, YYYY'));
            $("#clock").html(moment().format('hh:mm'));
            $("#clockSeconds").html(moment().format('ss'));
            
        }
        
        function getCurrentWeather(cityId, weatherKey) {
            // Open Weather Map API: http://openweathermap.org/current#one
            var url = "http://api.openweathermap.org/data/2.5/weather?id=" 
                + cityId + "&APPID=" + weatherKey + "&units=imperial";
        var currentWeather; 
    
        $.ajax({
            url: url,
                async: false,
                dataType: 'json',
                success: function(data) {
                    currentWeather = data;
                }
            });

            return currentWeather;
        }
        
        function get5DayWeather(cityId, weatherKey) {
            // Open Weather Map API: http://openweathermap.org/forecast5#5days
            var url = "http://api.openweathermap.org/data/2.5/forecast/city?id=" 
                + cityId + "&APPID=" + weatherKey + "&units=imperial";
                
        var fiveDayWeather; 
    
        $.ajax({
            url: url,
                async: false,
                dataType: 'json',
                success: function(data) {
                    fiveDayWeather = data;
                }
            });

            return fiveDayWeather;
        }