$(document).ready(() => {
  // If user is seeing the index page of blogs
  // where an announcement alert is shown
  if ($("#announcementDiv").length) {
    // Make a GET Ajax request to get the latest announcement
    $.get('/announcements', function(res) {
      $('#announcement').text(res.data);
      setTimeout(function() {
        $('#announcementDiv').show(1500);
      }, 2000)
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
