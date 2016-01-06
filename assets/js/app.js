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
                    var latitude = response.coord.lat;
                    var longitude = response.coord.lon;
                    var sunriseSunsetUrl = "http://api.sunrise-sunset.org/json?lat=" 
                        + latitude + "&lng=" + longitude + "&date=today";
                    
                    $scope.currentWeather = {                                
                        weatherId: response.weather[0].id,
                        latitude: latitude,
                        longitude: longitude,
                        temperature: Math.round(response.main.temp),
                        icon: getWeatherIcon(response.weather[0].id)
                    }
                    
                    // If not already available, retreive the sunrise and sunset times
                    if(SUNRISE_TIME == null || SUNSET_TIME == null) {                        
                        $http.get(sunriseSunsetUrl)
                            .success(function(response) {
                                SUNRISE_TIME = response.results.sunrise;
                                SUNSET_TIME = response.results.sunset;
                            })
                            .error(function(response) {
                                console.log("Error retreiving sunrise/sunset data");
                            });
                    }
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

hudApp.controller('checklistController', ['$scope', '$interval', '$http',
    function($scope, $interval, $http) {
        $scope.items = {
            totalItems: 2,
            list: [
                [
                    "List Item #1",
                    "List Item #2"
                ],
                [
                    "List Item #3",
                    "List Item #4"
                ],
            ]
        } // TODO: build this out of the Habitica data
        
        $scope.useTwoColumns = function() {
            return ($scope.items.totalItems > MAX_CHECKLIST_ITEMS_PER_COLUMN);
        }
    }
]);

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
