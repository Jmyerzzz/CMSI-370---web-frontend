"use strict";

(() => {
    window.AccuWeatherReport = {
        init: () => {
            let searchTerm = $("#search-term");
            let searchButton = $("#search-button");
            let weatherResponse = $("#weather-response");
            var apiKey = "1xLQjfls8wGi2Ad54vFsEpTZ0Ln5n8rS";
            let locationUrl = "";
            let conditionsUrl = "";
            let locationKey = "";
            let cityName = "";

            searchButton.click(() => {
                locationUrl = "http://dataservice.accuweather.com/locations/v1/search?apikey=" + apiKey + "&q=" + searchTerm.val();

                $.ajax({
                    type: "GET",
                    url: locationUrl,
                    dataType: "jsonp",
                    cache: true,
                    jsonpCallback: "awxCallback",
                    success: function (data) {
                        locationKey = data[0].Key;
                        cityName = data[0].EnglishName;
                        conditionsUrl = "http://dataservice.accuweather.com/currentconditions/v1/" + locationKey + "?apikey=" + apiKey;

                        $.ajax({
                            type: "GET",
                            url: conditionsUrl,
                            dataType: "jsonp",
                            cache: true,
                            jsonpCallback: "awxCallback",
                            success: function (data) {
                                weatherResponse.html('The weather in ' + cityName + ' is ' + data[0].WeatherText + ' and ' + data[0].Temperature.Imperial.Value + '°F.');
                            },
                            error: function (xhr) {
                                weatherResponse.html('HTTP ' + xhr.status + 'error');
                            }
                        });

                    },
                    error: function (xhr) {
                        weatherResponse.html('No results found. Please try again. ' + xhr.status);
                    }

                });

            });

            searchTerm.bind("input", () => searchButton.prop("disabled", !searchTerm.val()));
        }
    };
})();
