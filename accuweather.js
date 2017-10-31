"use strict";

(() => {
    window.AccuWeatherReport = {
        init: () => {
            let searchButton = $("#search-button");
            let searchTerm = $("#search-term");
            let weatherResponse = $("#weather-response");
            const apiKey = "d8EOBzKoMMzcU2IMemWuArv5foAi3U6U";
            let locationKey = "";

            searchButton.click(function() {

                $.post("http://dataservice.accuweather.com/locations/v1/search",
                    {
                        apikey: apiKey,
                        q: searchTerm,
                        language: "en-us",
                        boolean: true,
                        offset: 1
                    },
                    function(data) {
                        locationKey === data[0].Key;
                    });

                $.post("http://dataservice.accuweather.com/currentconditions/v1/" + locationKey,
                    {
                        apikey: apiKey,
                        language: "en-us",
                        boolean: true
                    },
                    function(data) {
                        weatherResponse.html("The weather in " + searchTerm + " is " + data[0].WeatherText + ".");
                    });
            });

            searchTerm.bind("input", () => searchButton.prop("disabled", !searchTerm.val()));
        }
    };
})();
