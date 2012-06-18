
$(document).ready(function() {
  $('.thumb ul#maps_menu_list li a').click(loadDetail);
  $('.maps #site_menu #speech_info').click(function(e) {
    if($('#infoBox a').length == 0)
      $('<p><a href="#" onclick="$(\'#infoBox\').slideUp(\'slow\'); return false;">關閉</a></p>').appendTo('#infoBox');
    $('#infoBox').slideDown('slow');
    return false;
  });
  $('.maps #site_menu li#shareFB a').click(function(e) {
    window.open($(this).attr('href'), '_blank', 'width=540, height=300');
    
    return false;
  });
  if($('.detail').length!=0) {
    mapAlign();
    $(window).resize(mapAlign);
  }
  if($('.thumb').length!=0) mapInit();  
});

var coordinal = {
  gate: { x: 1128, y: 1267 },
  dormM5: { x: 3269, y: 1576 },
  gender: { x: 1567, y: 1538 },
  xiaoFu: { x: 1842, y: 950 },
  adminBldg: { x: 1746, y: 1433 },
  sac: { x: 2363, y: 1023 },
  dormF: { x: 2230, y: 630 },
  count: function(target) {
    var tempX = (($(window).width()*0.14) - coordinal[target].x),
        tempY = (222 - coordinal[target].y);
    return { x: tempX, y: tempY };
  }
}

function thumbAlign() {
  $('.thumb #map').css({
    left: $('.thumb #map').offset().left,
    top: $('.thumb #map').offset().top 
  }).removeClass('ready');
}

function mapAlign() {
  var cor = coordinal.count($('.detail #maps_container').attr('class'));
  var pos = cor.x + 'px ' + cor.y + 'px';
  $('.detail #maps_container').css('background-position', pos);
}

function loadDetail(target) {
  var target = $(this).parent().attr('id').replace('link_','');
  $(this).addClass('loading');
  $.get(target + '.html', '', function(data, status) {
    $(data).find('#detail_container').appendTo('#maps_container').hide();
    $('li a').removeClass('loading');
    $('#site_menu').fadeOut();
    thumbAlign();
    mapEnlarge(target);
  }, 'html');
  
  return false;
}

function mapEnlarge(target) {
  
  $('.thumb #maps_menu #map').animate({
    width: 4156,
    height: 2737,
    top: coordinal.count(target).y,
    left: coordinal.count(target).x
  }, 1500, function() {
    $('body').addClass('detail');
    $('#maps_container').addClass(target).css('overflow', 'hidden');
    mapAlign();$(window).resize(mapAlign);
    $('#detail_container').fadeIn('normal', function() {
      $('#maps_container').css('overflow', 'auto');
      $('.detail a#close_button').click(mapThumb);
    });
    $('#maps_menu').fadeOut('normal', function() {
      $('body').removeClass('thumb');
    });
  });

  return false;
}

function mapThumb() {
  
  $('body').addClass('thumb');
  
  $('#detail_container').fadeOut('normal', function() {
    $('#detail_container').remove();
    $('.thumb #maps_menu #map').animate({
      width: 1039,
      height: 684,
      top: ($(window).height()/2-342) + 'px',
      left: (($(window).width()/2)-520) + 'px'
    }, 700, function(e) { $('#site_menu').fadeIn(); });
  });
  $('#maps_menu').fadeIn('normal', function() {
    $('body').removeClass('detail');
    $(window).unbind('resize').resize(thumbAlign);
    $('#maps_container').removeAttr('class').removeAttr('style');
    $('a#close_button').unbind();
  });
  
  return false;
}

function mapInit() {
  $.preload([ 'imgMapLarge.jpg', 'imgMapLayer.png' ], {
      base: '../images/',
      onRequest: function(){ alertBox('正在載入...'); }, 
      onFinish: function(){ $('#alertBoxContainer').remove(); }
  });
}

function alertBox(text) {
  if($('#alertBoxContainer').length==0) {
    $('<div />').attr('id', 'alertBoxContainer').appendTo('body').css({
      width: '100%', height: '100%',
      position: 'absolute', top: 0, left: 0, zIndex: 2000 
    });
    $('<div />').attr('id', 'alertBox').appendTo('#alertBoxContainer').css({
      width: 200, height: 100,
      background: 'white',
      textAlign: 'center',
      position: 'absolute',
      top: '50%', left: '50%',
      marginTop: '-50px', marginLeft: '-100px'
    });
    $('<p>').appendTo('#alertBox').css({ position: 'absolute', top: '50%', left: '50%', lineHeight: '16px' }).append('<span/>');
    $('<img src="../images/imgLoading.gif" align="left">').appendTo('#alertBox p').css('margin-right', '0.5em');
  }
  $('#alertBox p span').text(text);
  $('#alertBox p').css({
    marginTop: 0-($('#alertBox p').height()/2), marginLeft: 0-($('#alertBox p').width()/2)
  });
}