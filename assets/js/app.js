var hudApp = angular.module('hudApp', []);

/// <summary>
/// Current weather controller
/// </summary>
hudApp.controller('currentWeatherController', ['$scope', '$interval', '$http',
    function($scope, $interval, $http) {        
        $scope.getCurrentWeather = function() {
            if(WEATHER_API_KEY == SETTINGS.text.default || CITY_ID == SETTINGS.text.default) {
                console.log(SETTINGS.errors.weather_keys);
                return false;
            }

            // Get the current weather data
            $http.get(SETTINGS.urls.current_weather)
                .success(function(response) {
                    var latitude = response.coord.lat;
                    var longitude = response.coord.lon;
                    var sunriseSunsetUrl = SETTINGS.urls.sunrise_sunset[0] + latitude 
                        + SETTINGS.urls.sunrise_sunset[1] + longitude 
                        + SETTINGS.urls.sunrise_sunset[2];                    
                    
                    $scope.currentWeather = {                                
                        weatherId: response.weather[0].id,
                        latitude: latitude,
                        longitude: longitude,
                        temperature: Math.round(response.main.temp),
                        icon: getWeatherIcon(response.weather[0].id)
                    }
                    
                    // If not already available, retreive the sunrise and sunset times
                    if(SETTINGS.sunrise_time == null || SETTINGS.sunset_time == null) {                        
                        $http.get(sunriseSunsetUrl)
                            .success(function(response) {
                                SETTINGS.sunrise_time = response.results.sunrise;
                                SETTINGS.sunset_time = response.results.sunset;
                            })
                            .error(function(response) {
                                console.log(SETTINGS.errors.sunrise_sunset_http);
                            });
                    }
                })
                .error(function(response) {
                    console.log(SETTINGS.errors.current_weather_http);
                });
        };
        
        // Get the current data, then update it every 30 minutes thereafter 
        $scope.getCurrentWeather();                
        $interval( function() { $scope.getCurrentWeather(); }, 
            SETTINGS.intervals.current_weather);
    }
]);

/// <summary>
/// Forecast Weather controller
/// </summary>
hudApp.controller('forecastController', ['$scope', '$interval', '$http',
    function($scope, $interval, $http) {                
        $scope.getForecastWeather = function() {
            if(WEATHER_API_KEY == SETTINGS.text.default || CITY_ID == SETTINGS.text.default) {
                console.log(SETTINGS.errors.weather_keys);
                return false;
            }

            // Get the weather forecast data
            $http.get(SETTINGS.urls.forecast_weather)
                .success(function(response) {
                    $scope.forecasts = interpretForecastData(response.list);
                })
                .error(function(response) {
                    console.log(SETTINGS.errors.forecast_weather_http);
                });
        };
        
        // Get the forecast data, then update it every 12 hours thereafter 
        $scope.getForecastWeather();                
        $interval( function() { $scope.getForecastWeather(); }, 
            SETTINGS.intervals.forecast_weather);
    }
]);

/// <summary>
/// Controller for the Habitica checklist
/// </summary>
hudApp.controller('checklistController', ['$scope', '$interval', '$http',
    function($scope, $interval, $http) {                  
        $scope.getHabiticaTasks = function() {
            if(HABITICA_USER_KEY == SETTINGS.text.default 
                || HABITICA_API_KEY == SETTINGS.text.default) {
                console.log(SETTINGS.errors.habitica_key);
                return false;
            }

            // Get the Habitica data
            $http.get(SETTINGS.urls.habitica_tasks, {
                // Add the authorization headers
                headers: {
                    'x-api-user': HABITICA_USER_KEY,
                    'x-api-key': HABITICA_API_KEY,
                }
            })
            .success(function(response) {
                $scope.items = interpretHabitData(response);
            })
            .error(function(response) {
                console.log(SETTINGS.errors.habitica_http);
            });
        };
        
        // Determine whether or not the two column layout should be used
        $scope.useTwoColumns = function() {
            return ($scope.items.totalItems > SETTINGS.max_checklist_items_per_column);
        }
        
        // Get the Habitica task data, then update it every 30 minutes thereafter 
        $scope.getHabiticaTasks();                
        $interval( function() { $scope.getHabiticaTasks(); }, 
            SETTINGS.intervals.habitica_tasks);
    }
]);

/// <summary>
/// Controller for the date and time aspect of the page
/// </summary>
hudApp.controller('clockController', ['$scope', '$interval', 
    function($scope, $interval) {
        $scope.updateTime = function() {
            $scope.clock = {
                dateTime: moment().format(SETTINGS.formatting.dateTime),
                hoursAndMinutes: moment().format(SETTINGS.formatting.hoursAndMinutes),
                seconds: moment().format(SETTINGS.formatting.seconds)
            };
        };
        
        // Update the time, then update it every 1 second thereafter 
        $scope.updateTime();                
        $interval( function() { $scope.updateTime(); }, 
            SETTINGS.intervals.clock);
    }
]);

/// <summary>
/// Controller for the countdown timer
/// </summary>
hudApp.controller('countdownController', ['$scope', '$interval', 
    function($scope, $interval) {
        $scope.updateCountdown = function() {
            var eventTime = moment.utc(SETTINGS.countdown_end_time, "MM/DD/YYYY HH:mm:ss A");
            var now = moment.utc();
            var difference = (eventTime - now); // milliseconds
            
            if(difference > 0) {
                var duration = moment.duration(difference, 'milliseconds');
                
                $scope.countdown = duration.months() + " month" + (duration.months() != 1 ? "s" : "") + ", "
                    + duration.days() + " day" + (duration.days() != 1 ? "s" : "") + ", "
                    + duration.hours() + " hour" + (duration.hours() != 1 ? "s" : "") + ", "
                    + duration.minutes() + " minute" + (duration.minutes() != 1 ? "s" : "");
                    
                $scope.businessDays = eventTime.businessDiff(now) + 1;
            } else {
                $scope.countdown = "";
                $scope.businessDays = "";
            }
        };
        
        // Update the time, then update it every 1 second thereafter 
        $scope.updateCountdown();                
        $interval( function() { $scope.updateCountdown(); }, 
            SETTINGS.intervals.countdown);
    }
]);
