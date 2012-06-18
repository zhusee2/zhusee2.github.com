/* Load IE6 fixes */
if($.browser.msie && $.browser.version.substr(0,1) < 7) {
  $.getScript('http://ie7-js.googlecode.com/svn/version/2.0(beta3)/IE8.js');
}

/* Load Global Scripts */
$(document).ready(function(){
  setTimeout(initialize, 300);
  $('a[rel*=facebox]').facebox()
  enableHorizonScroll();
});

/* Application Supporting Functions */
function initialize() {
  $('#container')
    .height($(window).height())
    .width($('#backPage').offset().left + 900);
  if($('#booklet').offset().top > ($('#navigator').height() + 10)) {
    var naviTop = $('#booklet').offset().top - $('#navigator').height() -10;
    $('#navigator').css({top: naviTop});
  }

  reachHash();
  $('a[href^=#]').click(function() {
    reachTarget($(this).attr('href'));
    location.hash = $(this).attr('href').replace('#', '/');
    
    return false;
  });
  
  enableTableSwap();
}

function reachTarget(targetObject) {
  var hashArray = targetObject.replace('/', ' #').split(' ');
  targetObject = hashArray[hashArray.length - 1];
  
  var target = ($(targetObject).offset().left - 100) + 'px',
      speed = Math.abs(($(targetObject).offset().left - 100) - $(window).scrollLeft()) / 3;
      speed = (speed > 2000) ? speed * 0.8 : speed;
      speed = (speed > 2000) ? speed * 0.8 : speed;

  $.scrollTo(target, speed, {axis: 'x', easing: 'easeInOutQuad'});
  
}

function reachHash() {
  var hash = location.hash;
  
  if (hash) { 
    var hashArray = hash.split('/');
    var target = '#' + hashArray[hashArray.length - 1];
    /* reachTarget(target); */
    $(window).scrollLeft($(target).offset().left - 100);
    
    return true;
	}
  
  return false;
}

function enableTableSwap() {
  $('table.column_swap tr td:odd, table.row_swap tr:odd').addClass('swap');
  
  return true;
}

function enableHorizonScroll() {
  $(document).mousewheel(function(event, delta) {
    if(navigator.appVersion.indexOf("Win")!=-1) delta = delta * 10;
    var currentX = $(window).scrollLeft(),
        targetX = (currentX - delta);
    $(window).scrollLeft(targetX);
    event.preventDefault();
  });
}