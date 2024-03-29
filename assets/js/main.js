"use strict"

/*Gallerey */
$('.modules-images.slider-one a').simpleLightbox();
$('.modules-images.slider-two a').simpleLightbox();
$('.modules-images.slider-three a').simpleLightbox();
$('.modules-images.slider-four a').simpleLightbox();
$('.lvl-gallery a').simpleLightbox();
$('.home-gallery a').simpleLightbox();
$('.modules-addon__gallerey a').simpleLightbox();
$('.project-photo').simpleLightbox();
$('.facade-item__img').simpleLightbox();
$('.plane-item__img').simpleLightbox();


/*Phone mask*/
$.fn.setCursorPosition = function (pos) {
	if ($(this).get(0).setSelectionRange) {
		$(this).get(0).setSelectionRange(pos, pos);
	} else if ($(this).get(0).createTextRange) {
		var range = $(this).get(0).createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
};
$(".phone-mask").click(function () {
	$(this).setCursorPosition(3);
}).mask("+7(999) 999-9999");




/*Input file */
$('#review-file').on('change', function (e) {
	$(this).prev('span').html(e.target.files[0].name);
});


/*Menu */
$(window).bind('scroll', function () {
	if ($(window).scrollTop() > 500) {
		$('.menu-icon').addClass('show');
	}
	else {
		$('.menu-icon').removeClass('show');
	}
});
$('.menu-icon').on('click', function () {
	$('.submenu').addClass('show');
});

$('.submenu .close-menu').on('click', function () {
	$('.submenu').removeClass('show');
});
$('.submenu ul li a').on('click', function () {
	$('.submenu').removeClass('show');
});

/*Forms */
$("#formOne").submit(function (e) {
	e.preventDefault();
	var form_data = $(this).serialize();
	$.ajax({
		type: "POST",
		url: "send.php",
		data: form_data,
		success: function () {
			$('form[name=formOne]').trigger('reset');
			$('#formModal').modal('toggle');
			$('#tnxModal').modal('show');
		}
	});
});

$("#formTwo").submit(function (e) {
	e.preventDefault();
	var form_data = $(this).serialize();
	$.ajax({
		type: "POST",
		url: "send.php",
		data: form_data,
		success: function () {
			$('form[name=formTwo]').trigger('reset');
			$('#tnxModal').modal('show');
		}
	});
});
// $("#formThree").submit(function (e) {
//     e.preventDefault();
//     var form_data = $(this).serialize();
//     $.ajax({
//         type: "POST",
//         url: "send.php",
//         data: form_data,
//         success: function () {
//             $('form[name=formThree]').trigger('reset');           
//             $('#tnxModal').modal('show');
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('formThree');
	form.addEventListener('submit', formSend);
	async function formSend(e) {
		e.preventDefault();
		let formData = new FormData(form);
		formData.append('image', formImage.files[0]);

		//Отправка формы
		form.classList.add('_sending');
		let response = await fetch('upload.php', {
			method: 'POST',
			body: formData
		});
		if (response.ok) {
			let result = await response.json();
			//alert(result.message);
			$('#tnxModal').modal('show');
			form.reset();
			$('#review-file').prev('span').html('Выберите файл');

			form.classList.remove('_sending');
		}
		else {
			alert("Ошибка");
			form.classList.remove('_sending');
		}

	}

	const formImage = document.getElementById('review-file');
	formImage.addEventListener('change', () => {
		uploadFile(formImage.files[0]);
	});
	function uploadFile(file) {
		if (!['image/jpeg', 'image/png'].includes(file.type)) {
			alert('Разрешены только изображения');
			formImage.value = "";
			$('#review-file').prev('span').html('Выберите файл');
			return;
		}
		if (file.size > 2 * 1024 * 1024) {
			alert('Файл должен быть менее 2 МБ');
			formImage.value = "";
			$('#review-file').prev('span').html('Выберите файл');
			return;
		}
	}
});


// amount
$('.down').on("click", function () {
	let $input = $(this).parent().find('input');
	let count = parseInt($input.val()) - 1;
	count = count < 1 ? 1 : count;
	$input.val(count);
	$input.change();
	return false;
});
$('.up').on("click", function () {
	let $input = $(this).parent().find('input');
	$input.val(parseInt($input.val()) + 1);
	$input.change();
	return false;
});

$('.btn-filter').on('click', function (e) {
	e.preventDefault();
	$('.sidebar-catalog').fadeToggle();
});


$('.sidebar__close').on('click', function () {
	$('.sidebar-catalog').fadeOut();
});

// sliders
$('.planes-slider').slick({
	slidesToShow: 1,
	variableWidth: true,
	appendArrows: '.planes-slider__nav',
	prevArrow: '<button type="button" class="slick-prev"><svg class="svg-icon"><use xlink:href="assets/img/sprite.svg#arrow-left"></use></svg></button>',
	nextArrow: '<button type="button" class="slick-next"><svg class="svg-icon"><use xlink:href="assets/img/sprite.svg#arrow-right"></use></svg></button>',
});

$('.facades-slider').slick({
	slidesToShow: 1,
	variableWidth: true,
	appendArrows: '.facades-slider__nav',
	prevArrow: '<button type="button" class="slick-prev"><svg class="svg-icon"><use xlink:href="assets/img/sprite.svg#arrow-left"></use></svg></button>',
	nextArrow: '<button type="button" class="slick-next"><svg class="svg-icon"><use xlink:href="assets/img/sprite.svg#arrow-right"></use></svg></button>',
});

$('.about-gallery-slider').slick({
	slidesToShow: 1,
	variableWidth: true,
	appendArrows: '.about-gallery-slider__nav',
	prevArrow: '<button type="button" class="slick-prev"><svg class="svg-icon"><use xlink:href="assets/img/sprite.svg#arrow-left"></use></svg></button>',
	nextArrow: '<button type="button" class="slick-next"><svg class="svg-icon"><use xlink:href="assets/img/sprite.svg#arrow-right"></use></svg></button>',
});

$('.btn-toggle-portfolio').on('click', function (e) {
	e.preventDefault();
	$(this).parents('.page-portfolio').find('.portfolio-col:hidden').slice(0, 4).fadeIn();
	var onBlock = $(this).parents('.page-portfolio').find('.portfolio-col:hidden').length;
	if (onBlock <= 0) {
		$(this).hide();
	}
});