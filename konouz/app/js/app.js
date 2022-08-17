import $ from 'jquery'
import * as bootstrap from 'bootstrap'
import Swiper, { EffectFade, Navigation, Autoplay, Pagination } from 'swiper'
import lightGallery from 'lightgallery'
import lgVideo from 'lightgallery/plugins/video/lg-video.min.js'
import Choices from 'choices.js'
import videojs from 'video.js'

// App js
document.addEventListener('DOMContentLoaded', () => {
	// bootstrap init utilities
	document.querySelectorAll('[data-bs-toggle="tooltip"]')
	.forEach(function (tooltip) {
		new bootstrap.Tooltip(tooltip)
	});
	document.querySelectorAll('[data-bs-toggle="popover"]')
	.forEach(function (popover) {
		new bootstrap.Popover(popover)
	});
	document.querySelectorAll('.toast')
	.forEach(function (toastNode) {
		var toast = new bootstrap.Toast(toastNode, {
			autohide: false
		})
		toast.show()
	});
	// sticky header
	var header = document.querySelector(".header");
	if (header) {
		window.onscroll = function() {myFunction()};
		window.onload = function() {myFunction()};
		var sticky = header.offsetTop;
		function myFunction() {
			if (window.pageYOffset > sticky) {
				header.classList.add("sticky");
			} else {
				header.classList.remove("sticky");
			}
		} 
	}
	// main menu sidebar toggle
	$(".header__hamburger").click(function(){
		$("body").toggleClass("menu-open"); return false;
	});
	$(document).click( function(event){
		if( $(event.target).closest(".header__menus").length )
			return;
		$('body').removeClass('menu-open');
		event.stopPropagation();
	});
	// user sidebar toggle
	$(".header-loginza__user").click(function(){
		$("body").toggleClass("user-sidebar-open"); return false;
	});
	$(document).click( function(event){
		if( $(event.target).closest(".header-loginza__user-sidebar").length )
			return;
		$('body').removeClass('user-sidebar-open');
		event.stopPropagation();
	});
	// user-sidebar-menu toggle sub menu
	$(".user-sidebar-menu__item.hus-sub-list .user-sidebar-menu__link").unbind('click').click(function(){
		$(this).toggleClass("open");
		$(this).parent().children(".user-sidebar-menu__sub-list").slideToggle('fast');
		return false;
	});
	// js-choice
	const jsChoice = document.querySelectorAll('.js-choice');
	for ( var i = 0; i < jsChoice.length; i++ ) {
		const choices = new Choices(jsChoice[i], {
			shouldSort: false,
			searchEnabled: false,
			allowHTML: true,
			placeholder: true,
			placeholderValue: null,
		});
	}
	// js-choice img
	const jsChoiceImg = document.querySelectorAll('.js-choice-img');
	for ( var i = 0; i < jsChoiceImg.length; i++ ) {
		const choices = new Choices(jsChoiceImg[i], {
			shouldSort: false,
			searchEnabled: false,
			allowHTML: true,
			placeholder: true,
			placeholderValue: null,
			callbackOnCreateTemplates: function(strToEl) {
				var classNames = this.config.classNames;
				var itemSelectText = this.config.itemSelectText;
				return {
					item: function({ classNames }, data) {
						return strToEl(
							'\
					<div\
						class="' +
								String(classNames.item) +
								' ' +
								String(
									data.highlighted
										? classNames.highlightedState
										: classNames.itemSelectable
								) +
								'"\
						data-item\
						data-id="' +
								String(data.id) +
								'"\
						data-value="' +
								String(data.value) +
								'"\
						' +
								String(data.active ? 'aria-selected="true"' : '') +
								'\
						' +
								String(data.disabled ? 'aria-disabled="true"' : '') +
								'\
						>\
						<img class="img" src="' + String(data.value) + '" />' +
								String(data.label) +
								'\
					</div>\
				'
						);
					},
					choice: function({ classNames }, data) {
						return strToEl(
							'\
					<div\
						class="choices__item_img ' +
								String(classNames.item) +
								' ' +
								String(classNames.itemChoice) +
								' ' +
								String(
									data.disabled
										? classNames.itemDisabled
										: classNames.itemSelectable
								) +
								'"\
						data-select-text="' +
								String(itemSelectText) +
								'"\
						data-choice \
						' +
								String(
									data.disabled
										? 'data-choice-disabled aria-disabled="true"'
										: 'data-choice-selectable'
								) +
								'\
						data-id="' +
								String(data.id) +
								'"\
						data-value="' +
								String(data.value) +
								'"\
						' +
								String(
									data.groupId > 0 ? 'role="treeitem"' : 'role="option"'
								) +
								'\
						>\
						<img class="img" src="' + String(data.value) + '" />' +
								String(data.label) +
								'\
					</div>\
				'
						);
					},
				};
			},
		});
	}
	// movieSlider
	const movieSlider = new Swiper('.movieSlider', {
		modules: [Autoplay, EffectFade],
		speed: 1000,
		effect: "fade",
		fadeEffect: {
			crossFade: true
		},
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
	});
	// movieCarousel
	const movieCarouselList = ()=>{
		let movieCarouselLists = document.querySelectorAll('.movieCarousel')
		let swiperPrev = document.querySelectorAll('.movie-carousel__nav_prev')
		let swiperNext = document.querySelectorAll('.movie-carousel__nav_next')
		let swiperPagination = document.querySelectorAll('.movie-carousel__pagination')
		movieCarouselLists.forEach((slider, index)=>{
			let sliderLength = slider.children[0].children.length
			let result = (sliderLength > 1) ? true : false
			const movieCarousel = new Swiper(slider, {
				modules: [Navigation, Pagination],
				slidesPerView: 6,
				spaceBetween: 12,
				watchSlidesProgress: true,
				navigation: {
					nextEl: swiperNext[index],
					prevEl: swiperPrev[index]
				},
				pagination: {
					el: swiperPagination[index],
					clickable: true
				},
				breakpoints: {
					0: {
						slidesPerView: 1,
						spaceBetween: 15,
					},
					576: {
						slidesPerView: 2,
						spaceBetween: 15,
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 15,
					},
					992: {
						slidesPerView: 4
					},
					1300: {
						slidesPerView: 5
					},
					1600: {
						slidesPerView: 6
					}
				}
			});
		})
	}
	window.addEventListener('load', movieCarouselList)
	
	// actorCarousel
	const actorCarousel = new Swiper('.actorCarousel', {
		modules: [Navigation],
		slidesPerView: 6,
		spaceBetween: 12,
		watchSlidesProgress: true,
		navigation: {
			nextEl: '.actor-carousel__nav_next',
			prevEl: '.actor-carousel__nav_prev'
		},
		breakpoints: {
			0: {
				slidesPerView: 2,
				spaceBetween: 15,
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 15,
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 15,
			},
			992: {
				slidesPerView: 4
			},
			1300: {
				slidesPerView: 5
			},
			1600: {
				slidesPerView: 6
			}
		}
	});
	// lightGallery images
	var lgimg = document.querySelectorAll( '.lg-image-gallery');
	for ( var i = 0; i < lgimg.length; i++ ) {
		lightGallery( lgimg[i], {
			selector: 'a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".gif"]',
			download: false
		});
	}
	// lightGallery videos
	var lgvid = document.querySelectorAll( '.lg-video-gallery');
	for ( var i = 0; i < lgvid.length; i++ ) {
		lightGallery( lgvid[i], {
			plugins: [lgVideo],
			selector: 'a',
			download: false
		});
	}
	// movie info player modal
	var videoModal = videojs('videoModal-1');
	var movieModal = document.getElementById('movieInfoModal-1');
	movieModal.addEventListener('show.bs.modal', function () {
		videoModal.play();
	});
	movieModal.addEventListener('hidden.bs.modal', function () {
		videoModal.pause();
	});
	// movie info player movieCard
	var movieCardVideo = videojs('movieCardVideo-1');
	var movieCardMoreInfo = document.getElementById('movieCardMoreInfo-1');
	movieCardMoreInfo.addEventListener('mouseleave', function () {
		movieCardVideo.pause();
	});
	// end app js
});