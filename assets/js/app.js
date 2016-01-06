var hudApp = angular.module('hudApp', []);

hudApp.controller('currentWeatherController', ['$scope', '$interval', '$http',
    function($scope, $interval, $http) {        
        $scope.getCurrentWeather = function() {
            if(WEATHER_API_KEY == "" || CITY_ID == "") {
                console.log("Weather API Key or City ID not set, exiting...");
                return false;
            }

            $http.get(CURRENT_WEATHER_URL)
                .success(function(response) {                            
                    $scope.currentWeather = {                                
                        weatherId: response.weather[0].id,
                        latitude: response.coord.lat,
                        longitude: response.coord.lon,
                        temperature: Math.round(response.main.temp),
                        icon: getWeatherIcon(response.weather[0].id)
                    }
                    
                    // TODO: retool Sunrise sunset to use angular promises too
                    /*if(SUNRISE_TIME == null || SUNSET_TIME == null)
                    getSunriseSunsetTimes(latitude, longitude);*/
                })
                .error(function(response) {
                    console.log("Error retreiving current weather data");
                });
        };
        
        // Update the current data, then update it every 30 minutes thereafter 
        $scope.getCurrentWeather();                
        $interval( function() { $scope.getCurrentWeather(); }, 1000 * 60 * 30);
    }
]);

hudApp.controller('forecastController', ['$scope', '$interval', '$http',
    function($scope, $interval, $http) {                
        $scope.getForecastWeather = function() {
            if(WEATHER_API_KEY == "" || CITY_ID == "") {
                console.log("Weather API Key or City ID not set, exiting...");
                return false;
            }

            $http.get(FORECAST_WEATHER_URL)
                .success(function(response) {
                    $scope.forecasts = interpretForecastData(response.list);
                })
                .error(function(response) {
                    console.log("Error retreiving forecast weather data");
                });
        };
        
        // Update the forecast data, then update it every 12 hours thereafter 
        $scope.getForecastWeather();                
        $interval( function() { $scope.getForecastWeather(); }, 1000 * 60 * 60 * 12);
    }
]);

hudApp.controller('checklistController', function($scope) {
    
});

hudApp.controller('clockController', ['$scope', '$interval', 
    function($scope, $interval) {
        $scope.updateTime = function() {
            $scope.clock = {
                dateTime: moment().format('dddd, MMMM D, YYYY'),
                hoursAndMinutes: moment().format('hh:mm'),
                seconds: moment().format('ss')
            };
        };
        
        // Update the time, then update it every 1 second thereafter 
        $scope.updateTime();                
        $interval( function() { $scope.updateTime(); }, 1000);
    }
]);
