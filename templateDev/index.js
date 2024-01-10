$('#event-search-form').on('submit', function () {
    var teamNumber = $("#team-number").val();
    if(Array.from(teamNumber).length != 5 || isNaN(teamNumber))
    {
        $("#team-number")[0].classList = "bg-gray-50 border border-red-300 text-red-900 text-sm rounded-lg ring-red-700 border-red-700 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:ring-red-700 dark:border-red-700"
        $("#team-number-label")[0].classList = "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
        $("#team-number-svg")[0].classList = "w-4 h-4 text-red-500 dark:text-red"
    }
    else{
        var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://ftc-api.firstinspires.org/v2.0/2023/events?teamNumber=24660");
xhr.setRequestHeader("Authorization", "Basic YWxleHcxMDg6NDYxN0JCOUMtRDdCOC00OEM4LUE4OEItRDcyQUJGM0QxMzZG");

xhr.send();
    }
    return false;
});