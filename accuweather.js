"use strict";

(() => {
    window.AccuWeatherReport = {
        init: () => {
            let searchTerm = $("#search-term");
            let searchButton = $("#search-button");
            let weatherResponse = $("#weather-response");
            var apiKey = "d8EOBzKoMMzcU2IMemWuArv5foAi3U6U";
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
                            error: function (a, b, c) {
                                weatherResponse.html('HTTP ' + a.status + 'error');
                            }
                        });

                    },
                    error: function () {
                        weatherResponse.html('No results found. Please try again.');
                    }

                });

            });

            searchTerm.bind("input", () => searchButton.prop("disabled", !searchTerm.val()));
        }
    };
})();
