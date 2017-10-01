/***
*  Function for removing HTML tags in
*  content due to the use of EKEditor
* and also for security concerns 
***/

module.exports = {
  stripTags: function(content) {
    return content.replace(/<(?:.|\n)*?>/gm, '');
  }
};
