$(function() {

	
	// browserhappy for old browsers

	$('.browsehappy').click(function() {
	  $(this).slideUp();
	});


	// mailchimp-form for ajax mailchimp forms

	$('.mailchimp-form').ajaxChimp({
		url: 'http://finnrobertson.us2.list-manage.com/subscribe/post?u=fea39c610b49b69bbfa0c3a29&id=620444afb9'
	});

	
	// fitvids for responsive video embeds

	// Target your .container, .wrapper, .post, etc.
	$("body").fitVids();


	// enquire for js media queries

	enquire.register("screen and (max-width:45em)", {

	    // OPTIONAL
	    // If supplied, triggered when a media query matches.
	    match : function() {
	    	console.log('max width 45em');
	    },      
	                                
	    // OPTIONAL
	    // If supplied, triggered when the media query transitions 
	    // *from a matched state to an unmatched state*.
	    unmatch : function() {
	    	console.log('not max width 45em');
	    },    
	    
	    // OPTIONAL
	    // If supplied, triggered once, when the handler is registered.
	    setup : function() {},    
	                                
	    // OPTIONAL, defaults to false
	    // If set to true, defers execution of the setup function 
	    // until the first time the media query is matched
	    // deferSetup : true,
	                                
	    // OPTIONAL
	    // If supplied, triggered when handler is unregistered. 
	    // Place cleanup code here
	    destroy : function() {}
	      
	});


	// slick slider

	$('.slick-slider').slick({
	  prevArrow : '<div class="slick-prev"><div class="sprite sprite-slider-arrow-left hide-mobile"></div><div class="sprite sprite-slider-arrow-left-mobile show-only-mobile"></div></div>',
	  nextArrow : '<div class="slick-next"><div class="sprite sprite-slider-arrow-right hide-mobile"></div><div class="sprite sprite-slider-arrow-right-mobile show-only-mobile"></div></div>',
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  dots: false,
	  arrows: true
	});


	// js cookie

	// Set cookies

	function setCookie(cookieName) {
	  Cookies.set(cookieName, 'yes', {path: '/'});
	}

	// Check cookies

	function checkCookie(cookieName) {
	  if (Cookies.get(cookieName) === 'yes') {
	    console.log(cookieName + ' Cookie!');
	    return true;
	  } else {
	    console.log('No ' + cookieName + ' Cookie :(');
	      return false;
	  }
	}

	// Removie cookies

	function deleteCookie(cookieName) {
	  Cookies.remove(cookieName);
	}


	// pace

	Pace.on('done', function() {

	});


	// function showSocialModal(delay) {
	//   if ($('.contact-form').length >= 1) { 
	//     console.log('This page has at least one contact form');
	//     var showSocialMediaPopupTimer = setTimeout(function() {
	//       $('[data-modal=social-media-popup]').fadeIn(1000);
	//       setSocialModalCookie();
	//     }, delay);
	//   }
	// }

	// mouse leave document and show social modal

	// $(document.documentElement).on('mouseleave', function(event) {
	//   console.log('mouse has left');
	//   if ( !checkCookie('social_modal_popup_mouseleave') ) {
	//       console.log('mouse has left and there isn\'t a cookie');
	//       showSocialModal(0);
	//       setCookie('social_modal_popup_mouseleave');
	//   } else {

	//     console.log('mouse has left and there is a cookie');
	//     return;
	    
	//   }
	  
	// });


	// modals

	$('[data-close-modal]').on('click', function(event) {
	  event.preventDefault();
	  // $(this).parent('.modal').addClass('hidden');
	  $(this).parents('.modal').fadeOut(1000);
	});

	$('[data-open-modal]').on('click', function(event) {
	  event.preventDefault();
	  var modal_to_open = $(this).data('open-modal');
	  console.log(modal_to_open);
	  // $('[data-modal='+modal_to_open+']').removeClass('hidden');
	  $('[data-modal='+modal_to_open+']').fadeIn(1000);
	});


	// page transitions

	$('a').not('[data-open-modal], [data-accept-drinking-age], .popup, a[href^="mailto:"], a[href^="tel:"], .home-splash-button').on('click', function(event) {
	  deleteCookie('social_modal_popup_mouseleave');
	  console.log($(this).attr('data-open-modal'));
	  if (!$(this).attr('target')) {
	    event.preventDefault();
	    newLocation = $(this).attr("href");
	    console.log('change page!');
	    $('body').removeClass('pace-done');
	    setTimeout(function() {
	      window.location = newLocation;
	    }, 1000);
	  }
	});


	// Nav menu transitions

	$('.main-navigation .menu-item').on('click', function(event) {
	  $('.main-navigation .menu-item').removeClass('current-menu-item');
	  $(this).addClass('current-menu-item');
	});


	// Home Splash button

	$('.home-splash-button').on('click', function(event) {
	  event.preventDefault();
	  $(window).scrollTo($('.home-more-info'), 1500, {offset:-40});
	});


	// share buttons

	var share_button_top = new Share(".share-button-top", {
	  title: "Share Button Multiple Element Test",
	  ui: {
	    flyout: "top center"
	  },
	  networks: {
	    facebook: {
	      app_id: "602752456409826",
	    },
	    googlePlus: {
          enabled: false
        },
        twitter: {
          enabled: false
        },
        pinterest: {
          enabled: false
        },
        reddit: {
          enabled: false // Enable Reddit. [Default: true]
        },
        linkedin: {
          enabled: false // Enable LinkedIn. [Default: true]
        },
        whatsapp: {
          enabled: false // Enable WhatsApp. [Default: true]
        },
        email: {
          enabled: false // Enable Email. [Default: true]
        }
	  }
	});

	var share_button_left = new Share(".share-button-left", {
	  title: "Share Button Multiple Instantiation Test",
	  ui: {
	    flyout: "top left",
	    button_text: "Left"
	  },
	  networks: {
	    facebook: {
	      app_id: "602752456409826",
	    }
	  }
	});

	var share_button_right = new Share(".share-button-bottom", {
	  title: "Share Button Multiple Instantiation Test",
	  ui: {
	    flyout: "bottom right",
	    button_text: "Right"
	  },
	  networks: {
	    facebook: {
	      app_id: "602752456409826",
	    }
	  }
	});


});