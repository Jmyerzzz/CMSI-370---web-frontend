"use strict";

(() => {
    window.AccuWeatherReport = {
        init: () => {
            let searchTerm = $("#search-term");
            let searchButton = $("#search-button");
            let weatherResponse = $("#weather-response");
            let accuLink = $("#accu-link");
            accuLink.hide();
            let forecastResponse = $("#forecast-response");
            var apiKey = "4XuJGqBiNNCg3tbEpZ1kOBjetxmbbNbG";
            let locationUrl = "";
            let conditionsUrl = "";
            let forecastUrl = "";
            let locationKey = "";
            let cityName = "";

            searchButton.click(() => {
                locationUrl = "http://dataservice.accuweather.com/locations/v1/search?apikey=" +
                apiKey + "&q=" + searchTerm.val();

                $.ajax({
                    type: "GET",
                    url: locationUrl,
                    dataType: "jsonp",
                    cache: true,
                    success: function (data) {
                        locationKey = data[0].Key;
                        cityName = data[0].EnglishName;
                        conditionsUrl = "http://dataservice.accuweather.com/currentconditions/v1/" +
                                        locationKey + "?apikey=" + apiKey;
                        forecastUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/" +
                                      locationKey + "?apikey=" + apiKey;

                        $.ajax({
                            type: "GET",
                            url: conditionsUrl,
                            dataType: "jsonp",
                            cache: true,
                            success: function (data) {
                                weatherResponse.html('The weather in ' + cityName + ' is ' + data[0].WeatherText +
                                ' and ' + data[0].Temperature.Imperial.Value + '°F.');
                                accuLink.html('For more information visit: <a href="' +
                                data[0].Link + '"> ' + data[0].Link + '</a>');
                                accuLink.show();
                            },
                            error: function (xhr) {
                                weatherResponse.html('HTTP ' + xhr.status + 'error: current');
                            }
                        });

                        $.ajax({
                            type: "GET",
                            url: forecastUrl,
                            dataType: "jsonp",
                            cache: true,
                            success: function (data) {
                                forecastResponse.html('The lowest temperature today will be ' +
                                data.DailyForecasts[0].Temperature.Minimum.Value + '°F, and the highest will be ' +
                                data.DailyForecasts[0].Temperature.Maximum.Value + '°F.');
                            },
                            error: function (xhr) {
                                weatherResponse.html('HTTP ' + xhr.status + 'error: forecast');
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
