// Function for making Ajax requst to target FCC url
// and get the local weather
function getWeather(api, lat, lon, temp) {
  var urlString = api + lat + "&" + lon;
  $.ajax({
    url: urlString,
    success: function (result) {
      $("#city").text(result.name + ", ");
      $("#country").text(result.sys.country);
      temp = Math.round(result.main.temp * 10) / 10;
      $("#temp").text(temp + " " + String.fromCharCode(176) + 'C');
      $("#desc").text(result.weather[0].main);
      IconGen(result.weather[0].main);
  }
  });
}

// Function for getting the target weather icon
function IconGen(desc) {
  var desc = desc.toLowerCase()
  switch (desc) {
    case 'drizzle':
      addIcon(desc)
      break;
    case 'clouds':
      addIcon(desc)
      break;
    case 'rain':
      addIcon(desc)
      break;
    case 'snow':
      addIcon(desc)
      break;
    case 'clear':
      addIcon(desc)
      break;
    case 'thunderstom':
      addIcon(desc)
      break;
    default:
      $('div.clouds').removeClass('hide');
  }
}

// Function for showing the weather icon
function addIcon(desc) {
  $('div.' + desc).removeClass('hide');
}

$(document).ready(() => {
  // If user is seeing the index page of blogs
  // where an announcement alert is shown
  if ($("#announcementDiv").length) {
    // Make a GET Ajax request to get the latest announcement
    $.get('/announcements', function(res) {
      $('#announcement').text(res.data);
      $('#announcementDiv').show(1500);
      setTimeout(function() {
        $('#announcementDiv').fadeOut(4000);
      }, 2000)
    });
  }

  // If user is seeing the index page of blogs
  // where his/her local weather is shown
  if ($('#weatherCard').length) {
    // Weather API provided by FreeCodeCamp
    var api = "https://fcc-weather-api.glitch.me/api/current?";
    var lat,
        lon,
        temp;
    // Check if client browser enables getting geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = "lat=" + position.coords.latitude;
        var lon = "lon=" + position.coords.longitude;
        getWeather(api, lat, lon);
        $('#weatherCard').show(2000);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    // Allow user to close the weather box by clicking the close icon
    $('.close').on('click',function() {
      $(this).closest('.card').fadeOut();
    });
  }

  // If there is a textarea for writing blog content
  if ($("[name='content']").length) {
    // Replace default textarea with CKEditor
    CKEDITOR.replace('content', {
      plugins: 'wysiwygarea,toolbar,basicstyles,link'
    });
  }
  // Enable all alert messages to be closed by user
  $('.alert').alert();
});
