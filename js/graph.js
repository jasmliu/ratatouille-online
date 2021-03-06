function setDates() {
  date_start = $("#date_start").val();
  date_end = $("#date_end").val();
  query(date_start, date_end);
}

function query(date_start, date_end) {
  console.log("query request");
  console.log("start date: " + date_start);
  console.log("end date: " + date_end);
  $.post(
    "php/jsonfeed.php",
    {date_start: date_start, date_end: date_end},
    function(data) {
    console.log("query complete");
    data = jQuery.parseJSON(data);
    var date = null;
    var array = {};
    for (var i = 0; i < data.length; i++) {
      if (data[i].date != date) {
        date = data[i].date;
        var key = date;
        if (!(key in array)) {
          array[key] = [];
        }
      }
      var key = data[i].date;
      array[key].push(data[i]);
    }
    console.log(array);
    var dataPoints = [];
    for (var key in array) {
      dataPoints.push({y: array[key].length});
    }
    
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Object.keys(array),
          datasets: [
            {
              data: dataPoints,
              label: "dates",
              fill: false
            }
          ]
          },
          options: {
            responsive:true,
            maintainAspectRatio:false,
            legend: {
              display: false,
            }
        }
      });
  });
}

window.onload = function() {
  var date_start = '2017-07-22';
  var date_end = '2017-08-22';
  $('#date_start').val(date_start);
  $('#date_end').val(date_end);
  query(date_start, date_end);
}
