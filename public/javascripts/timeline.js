if (window.location.href[window.location.href.length - 1] === '#') {
  window.location.href = window.location.href.substring(0, window.location.href.length - 1);
}

$(document).ready(function(){
  $('.down-arrow').on('click', function(){
    $('.drop-down').toggleClass('hidden')
  })

})
