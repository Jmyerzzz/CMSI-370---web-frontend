

## Jackson Myers

##### https://github.com/lmu-cmsi370-fall2017/web-front-end-Jmyerzzz.git

| | Feedback | Points | Notes |
| --- | --- | ---: | --- |
| **Web Service Functions (_3b_, _4a_, _4b_, _4d_)** | 3 API calls seen, all generally implemented correctly. The case where an empty location array is returned is not handled correctly though. | 45 | Empty location list causes a non-API error due to a hardcoded `[0]` |
| **Web App Layout (_2b_, _3a_, _3b_, _4a_, _4b_, _4d_)** | Web app is very straightforward and works fine as long as a valid city is entered. Disambiguation isn’t possible (e.g., there’s more than one “Athens” but the one in Greece is always chosen)—and the location search API call _does_ return multiple locations in the case of a multiple match, so this one can’t be blamed on an API limitation.<br> | 25 | Support for multiple location hits is possible but not implemented |
| **Test Suite (_4a_, _4b_, _4d_)** | 10 successes, 2 skips out of 12 tests—around 1/4 of the coverage is actually for the sample code, so the percentages are actually a little smaller. However, the API uses JSONP which is harder to test, so some accommodation given due to that.<br><br>**Statements** 28/43 (65.12%)<br>**Branches** 0/0 (100.00%)<br>**Functions** 0/6 (0.00%)<br>**Lines** 26/41 (63.41%) | 16 | Low coverage that is inflated by inclusion of sample code unit tests; however API uses JSONP so deduction is not as large
| **Code Style (_4c_)** | no errors |  |  |
| **Version Control (_4e_)** | 8 commits—somewhat on the low side given the scale of the assignment | -1 |  |
| **Punctuality (_4f_)** | met original due date |  |  |
|  |  | **85** | **Total** |
