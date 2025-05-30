(function ($) {
	
	"use strict";

	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();
	  var box = $('.header-text').height();
	  var header = $('header').height();

	  if (scroll >= box - header) {
	    $("header").addClass("background-header");
	  } else {
	    $("header").removeClass("background-header");
	  }
	});
	

	$('.filters ul li').click(function(){
	  $('.filters ul li').removeClass('active');
	  $(this).addClass('active');
	  
	  var data = $(this).attr('data-filter');
	  $grid.isotope({
	    filter: data
	  })
	});

	var $grid = $(".grid").isotope({
	  itemSelector: ".all",
	  percentPosition: true,
	  masonry: {
	    columnWidth: ".all"
	  }
	})

	$(".Modern-Slider").slick({
	    autoplay:true,
	    autoplaySpeed:10000,
	    speed:600,
	    slidesToShow:1,
	    slidesToScroll:1,
	    pauseOnHover:false,
	    dots:true,
	    pauseOnDotsHover:true,
	    cssEase:'linear',
	   // fade:true,
	    draggable:false,
	    prevArrow:'<button class="PrevArrow"></button>',
	    nextArrow:'<button class="NextArrow"></button>', 
	  });

	$('.search-icon a').on("click", function(event) {
	    event.preventDefault();
	    $("#search").addClass("open");
	    $('#search > form > input[type="search"]').focus();
	  });

	  $("#search, #search button.close").on("click keyup", function(event) {
	    if (
	      event.target == this ||
	      event.target.className == "close" ||
	      event.keyCode == 27
	    ) {
	      $(this).removeClass("open");
	    }
	  });

	  $("#search-box").submit(function(event) {
	    event.preventDefault();
	    return false;
	  });


	$('.owl-carousel').owlCarousel({
	    loop:true,
	    margin:30,
	    nav:false,
	    pagination:true,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:2
	        },
	        1000:{
	            items:3
	        }
	    }
	})

	// Window Resize Mobile Menu Fix
	mobileNav();


	// Scroll animation init
	window.sr = new scrollReveal();
	

	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Menu elevator animation
	$('a[href*=\\#]:not([href=\\#])').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var width = $(window).width();
				if(width < 991) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);	
				}				
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});

	$(document).ready(function () {
	    $(document).on("scroll", onScroll);
	    
	    //smoothscroll
	    $('a[href^="#"]').on('click', function (e) {
	        e.preventDefault();
	        $(document).off("scroll");
	        
	        $('a').each(function () {
	            $(this).removeClass('active');
	        })
	        $(this).addClass('active');
	      
	        var target = this.hash,
	        menu = target;
	       	var target = $(this.hash);
	        $('html, body').stop().animate({
	            scrollTop: (target.offset().top) - 79
	        }, 500, 'swing', function () {
	            window.location.hash = target;
	            $(document).on("scroll", onScroll);
	        });
	    });
	});

	function onScroll(event){
	    var scrollPos = $(document).scrollTop();
	    $('.nav a').each(function () {
	        var currLink = $(this);
	        var refElement = $(currLink.attr("href"));
	        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	            $('.nav ul li a').removeClass("active");
	            currLink.addClass("active");
	        }
	        else{
	            currLink.removeClass("active");
	        }
	    });
	}


	// Page loading animation
	$(window).on('load', function() {
		if($('.cover').length){
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$("#preloader").animate({
			'opacity': '0'
		}, 600, function(){
			setTimeout(function(){
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});


	// Window Resize Mobile Menu Fix
	$(window).on('resize', function() {
		mobileNav();
	});


	// Window Resize Mobile Menu Fix
	function mobileNav() {
		var width = $(window).width();
		$('.submenu').on('click', function() {
			if(width < 767) {
				$('.submenu ul').removeClass('active');
				$(this).find('ul').toggleClass('active');
			}
		});
	}


})(window.jQuery);













//search
const events = [
  { name: "MUSIC", filter: ".mus" },
  { name: "ART & CULTURE", filter: ".art" },
  { name: "WORKSHOPS", filter: ".ws" },
  { name: "FASHION & BEAUTY", filter: ".fash" },
  { name: "FOOD & DRINK", filter: ".fad" }
];

function toggleSearchDropdown() {
  const dropdown = document.getElementById("searchDropdown");
  if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
  } else {
    dropdown.style.display = "block";
    populateEventList(events.map(e => e.name));
    const input = document.getElementById("searchInput");
    input.value = "";
    input.placeholder = "Search for an event...";
    input.focus();
  }
}

function populateEventList(eventArray) {
  const list = document.getElementById("eventList");
  list.innerHTML = "";
  eventArray.forEach(eventName => {
    const li = document.createElement("li");
    li.textContent = eventName;
    li.onclick = () => {
      goToEvent(eventName);
    };
    list.appendChild(li);
  });
}

function goToEvent(eventName) {
  const dropdown = document.getElementById("searchDropdown");
  dropdown.style.display = "none";

  //go to section events
  window.location.href = "#projects";

  const eventObj = events.find(e => e.name === eventName);
  if (eventObj) {
    const projectsSection = document.getElementById("projects");
    const targetItem = projectsSection.querySelector(eventObj.filter);

    if (targetItem) {

      targetItem.scrollIntoView({ behavior: "smooth", block: "start" });

      // temp
      targetItem.style.transition = "background-color 0.5s ease";
      targetItem.style.backgroundColor = "#9fa2f7"; 
      targetItem.style.color = "#000"; 

      // return after 3s
      setTimeout(() => {
        targetItem.style.backgroundColor = "";
        targetItem.style.color = "";
      }, 3000);
    }
  }
}


const searchInput = document.getElementById("searchInput");
const suggestionsList = document.getElementById("suggestions");

searchInput.addEventListener("input", function () {
  const input = this.value.trim().toLowerCase();
  suggestionsList.innerHTML = "";
  if (input.length > 0) {
    const filteredEvents = events.filter(event => event.name.toLowerCase().includes(input));
    filteredEvents.forEach(event => {
      const li = document.createElement("li");
      li.textContent = event.name;
      li.addEventListener("click", () => {
        goToEvent(event.name);
      });
      suggestionsList.appendChild(li);
    });
  } else {
    suggestionsList.innerHTML = "";
    populateEventList(events.map(e => e.name));
  }
});

document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("searchDropdown");
  const searchIcon = document.querySelector(".search-icon");
  if (!dropdown.contains(event.target) && !searchIcon.contains(event.target)) {
    dropdown.style.display = "none";
  }
});

