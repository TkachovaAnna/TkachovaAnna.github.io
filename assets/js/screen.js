var intro_slider, cs_slider
var n = $('nav.navbar').outerHeight(true);
var slider_break = 767.98;

var jump = null;
if(location.hash) {
	jump = location.hash;
  setTimeout(function() {
	window.scrollTo(0, 0);
  }, 1);
}


function scrollToEl(c){
	var o = c.offset();
	var d = o.top - n;
	$('html, body').animate({ scrollTop: d }, 1000, "swing");
}

function submitForm(d){

	$('#form-contact button.btn-submit').attr("disabled", true);

	$.ajax({
		type: "POST",
		url: "../../bin/process.php",
		data: 'form=more_info&'+d,
		success: function() {
			$('#form-contact').fadeOut(200,function(){
				$('#msg-submit-success').fadeIn(700);
			})
			console.log(d);
			return false;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
			//console.log("Status: " + textStatus); alert("Error: " + errorThrown);
			$('#msg-submit-error').fadeIn(700).delay(15000).fadeOut(200);
			$('#form-contact button.btn-submit').attr("disabled", false);
			return false;
		}
     });
     
}

function initIntroSlider(){
	intro_slider = $('#intro-slider').lightSlider({
        item:1,
        pause:7000,
        pager:false
    });
}

function initCSSlider(){
	w = $(document).width();
	$el = $('#case-study-slider');
	var items = ($el.data('items')!=null)?$el.data('items'):2;
	cs_slider = $('#case-study-slider').lightSlider({
        item:items
    });
}

function initClientSlider(){
	w = $(document).width();
	$el = $('#client-study-slider');
	cs_slider = $('#client-slider').lightSlider({
        item:4,
        enableDrag: false,
        pause:3000,
        slideMove: 2,
        loop: true,
        pauseOnHover:false,
        controls:false,
        responsive: [
			{
                breakpoint:767.98,
                settings: {
                    item:4,
                  }
            }
        ],
    });
}


function init(){

	$('.row img').each(function(){
		$el = $(this);
		if(!$el.hasClass('not-animated')){
			$el.addClass('animated standby fadeIn');
			$el.attr('data-delay',100);
		}
	})
	$.fn.jqueryCss3AnimationQueue('update');
	
	if($('#intro-slider').length) configureIntroSlider();
	if($('#case-study-slider').length) initCSSlider();
	if($('#client-slider').length) initClientSlider()

	if(jump){
		var $j = $(jump);
		if($j.length){
			scrollToEl($j);
		}
	}

}

function configureIntroSlider(){
	w = $(document).width();
	if(w>slider_break){
		if($('#intro-slider').hasClass('lightSlider')) intro_slider.destroy();
	} else {
		if(!$('#intro-slider').hasClass('lightSlider')) initIntroSlider();
	}	
}

document.addEventListener("DOMContentLoaded",
function() {
	var div, n,
		v = document.getElementsByClassName("youtube-player");
	for (n = 0; n < v.length; n++) {
		div = document.createElement("div");
		div.setAttribute("data-id", v[n].dataset.id);
		div.innerHTML = labnolThumb(v[n].dataset.id);
		div.onclick = labnolIframe;
		v[n].appendChild(div);
	}
});

function labnolThumb(id) {
	var thumb = '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg">',
		play = '<div class="play"></div>';
	return thumb.replace("ID", id) + play;
}

function labnolIframe() {
	var iframe = document.createElement("iframe");
	var embed = "https://www.youtube.com/embed/ID?autoplay=1";
	iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
	iframe.setAttribute("frameborder", "0");
	iframe.setAttribute("allowfullscreen", "1");
	this.parentNode.replaceChild(iframe, this);
}

$(function() {
 	
    $("a[href$='section-contact'],button[data-dest$='section-contact']").on('click',function(e){
    	e.preventDefault();
    	scrollToEl($('#section-contact'));
        if ($(".navbar-collapse").hasClass("show") === true) {
            $(".navbar-toggler").click();
        }
    });
    
	$('form').on('submit',function(e){
		e.preventDefault();
        e.stopPropagation();
		var form = $(this);
		var d = null;
      
        if (form[0].checkValidity() === false) {
			// invalid...
        } else {
			d = form.serialize();
			submitForm(d);
        }
        form.addClass('was-validated');
	})
	
    $(window).resize(function() {
    	if($('#intro-slider').length) configureIntroSlider();	
    })

	$("a[rel*='external']").each(function(){
		$(this).attr({
			target:"_blank"
		});
	});

	init();

});

