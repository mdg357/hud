/// <summary>
/// Get the weather icon based on the id and the time of day
/// </summary>
/// <param name=""></param>
/// <returns></returns>
function getWeatherIcon(id) {
    var defaultIconIndex = (isDayTime() ? SETTINGS.default_weather_id_day : SETTINGS.default_weather_id_night);
    var icon = SETTINGS.image_path + WEATHER_ICON_LIST[defaultIconIndex].icon;
    var description = WEATHER_ICON_LIST[defaultIconIndex].description;
    
    $.each(WEATHER_ICON_LIST, function(key, value) {
        if(value.id == id) {
            icon = SETTINGS.image_path + value.icon;
            description = value.description;
            return false;
        }
    })
    
    return icon;
}

/// <summary>
/// Check if the current time is between sunrise and sunset
/// </summary>
/// <param name=""></param>
/// <returns>True, if it is currently daytime, False otherwise</returns>
function isDayTime() {
    if(SETTINGS.sunrise_time != undefined && SETTINGS.sunset_time != undefined) {
        return (moment.utc() >= moment.utc(SETTINGS.sunrise_time, SETTINGS.formatting.sunrise_sunset) 
            && moment.utc() < moment.utc(SETTINGS.sunset_time, SETTINGS.formatting.sunrise_sunset));
    }            
    return true;
}

/// <summary>
/// 
/// </summary>
/// <param name=""></param>
/// <returns></returns>
function interpretHabitData(habitData) {            
    var day = moment().format(SETTINGS.formatting.three_letter_day).toLowerCase();
    var shortDay = SETTINGS.shortDayStrings[day];
    var itemCount = 0;
    var todoList = [];
    var todos = [];
    
    $.each(habitData, function(key, value) {
        if(value.completed == false 
            && value.type == SETTINGS.habitica_task_type 
            && value.repeat[shortDay] == true) {
            todos.push(value.text);
            itemCount += 1;
            
            if(itemCount >= SETTINGS.max_checklist_items)
                return false;
        }
    });
    
    if(itemCount > SETTINGS.max_checklist_items_per_column) {
        for(var i = 0; i < todos.length; ) {
            if(i + 1 < todos.length) {
                todoList.push([todos[i++], todos[i++]]);
            } else {                        
                todoList.push([todos[i++]]);
            }
        }
    } else {
        todoList = todos;
    }
    
    return {
        totalItems: itemCount,
        list: todoList
    }
}

/// <summary>
/// 
/// </summary>
/// <param name=""></param>
/// <returns></returns>
function interpretForecastData(forecastData) {
    var forecasts = [];
    var dayList = [];
    
    // Create the empty objects for each of the dates we need
    for(var i = 1; i <= 5; ++i) {
        var dateString = moment().add(i, 'days').format(SETTINGS.formatting.date);
        var value = {
            date: dateString,
            dayText: SETTINGS.text.default,
            tempMinArr: [],
            tempMaxArr: [],
            tempMin: undefined,
            tempMax: undefined,
            weatherTypes: [],
            weatherIcon: SETTINGS.text.default,
            weatherId: SETTINGS.text.default
        };
        forecasts.push(value);
        dayList.push(dateString);
    }
    
    // Locate the minimum temps, maximum temps, and types of weather
    $.each(forecastData, function(key, value) {
        var date = moment.utc(value.dt, SETTINGS.formatting.unix)
            .format(SETTINGS.formatting.date);
        var dayText = moment(date, SETTINGS.formatting.date)
            .format(SETTINGS.formatting.three_letter_day);
        var tempMin = value.main.temp_min;
        var tempMax = value.main.temp_max;
        var weatherType = value.weather[0].id;
        var index = null;
        
        // Try to locate the index for the given date
        switch(date)
        {
            case dayList[0]: index = 0; break;
            case dayList[1]: index = 1; break;
            case dayList[2]: index = 2; break;
            case dayList[3]: index = 3; break;
            case dayList[4]: index = 4; break;
        }
        
        // If an index was found, populate the object
        if(index != null) {
            var entry = forecasts[index];
            entry.dayText = dayText;
            entry.tempMinArr.push(tempMin);
            entry.tempMaxArr.push(tempMax);
            
            // If the weather array is empty, add a new entry
            if(entry.weatherTypes.length == 0) {
                entry.weatherTypes.push([weatherType, 1]);
            } else { // Otherwise, see if the entry already exists in the array
                var valueFound = false;
                $.each(entry.weatherTypes, function(key, value) {
                    if(value[SETTINGS.weather_type_index] == weatherType) {
                        value[SETTINGS.weather_count_index] += 1;
                        valueFound = true;
                    }
                });
                
                // If no entry was found, add a new one
                if(!valueFound) {
                    entry.weatherTypes.push([weatherType, 1]);
                }
            }
        }
    });
    
    // Once the forecast array is populate, go through it again to find the 
    // temperatures and the most prevalent weather condition
    $.each(forecasts, function(key, value) {
        // Locate the minimum and maximum temperatures
        for(var i = 0; i < value.tempMinArr.length; ++i) {
            if(value.tempMin == undefined || value.tempMinArr[i] < value.tempMin) 
                value.tempMin = value.tempMinArr[i];
        }
        
        for(var i = 0; i < value.tempMaxArr.length; ++i) {
            if(value.tempMax == undefined || value.tempMaxArr[i] > value.tempMax)
                value.tempMax = value.tempMaxArr[i];          
        }
        
        // Round the value if it exists
        if(value.tempMin != undefined)
            value.tempMin = Math.round(value.tempMin);
        else
            value.tempMin = SETTINGS.text.unknown;
        
        if(value.tempMax != undefined)
            value.tempMax = Math.round(value.tempMax);
        else
            value.tempMax = SETTINGS.text.unknown;
        
        var mostPrevalentCount = undefined;
        var mostPrevalentIndex = undefined;
        // Find the most prevalent weather condition
        for(var i = 0; i < value.weatherTypes.length; ++i) {
            if(mostPrevalentCount == undefined || 
                (mostPrevalentCount != undefined && value.weatherTypes[i][SETTINGS.weather_count_index] > mostPrevalentCount)) {
                mostPrevalentIndex = i;
                mostPrevalentCount = value.weatherTypes[i][SETTINGS.weather_count_index];
            }
        }
        
        if(mostPrevalentIndex != undefined) {
            value.weatherId = value.weatherTypes[mostPrevalentIndex][SETTINGS.weather_type_index];
            value.weatherIcon = getWeatherIcon(value.weatherId);
        } else {
        }
    })
    return forecasts;
}