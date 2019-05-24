$(document).ready(function () {
	// Стилизация выпадающего списка
	$('.js-select').chosen({
		disable_search: true,
	});

	// Валидация полей
	$('.js-valid-form').each(function(){
		var $btnSubmit = $(this).find('input[type=submit]');

		$btnSubmit.click(function(event){
			var flag=false;
			var $curForm = $(this).parents('.js-valid-form');
			var inputR = $(this).find('input[data-required="true"]');
			var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,6}\.)?[a-z]{2,6}$/i;

			$curForm.find('input[data-required="true"]').each(function(e){
				showErrorField($(this));
			});

			$curForm.find('textarea[data-required="true"]').each(function(e){
				showErrorField($(this));
			});

			$curForm.find('input[type="email"]').each(function(e){
				var $emailField = $(this);

				console.log($emailField.data('required'));

				if ($emailField.val() != '') {
					if($emailField.val().search(pattern) == 0){
						$emailField.removeClass('errorfield');
					}else{
						$emailField.addClass('errorfield');
						flag='true';
					}
				}
			});


			function showErrorField(field) {
				var valField = field.val();

				if (valField == '') {
					field.addClass('errorfield');
					flag='true';
				} else {
					field.removeClass('errorfield');
				}

				if(flag){
					event.preventDefault();
				}
			}

			if ($('.js-select').length) {
				$curForm.find('.js-select').each(function(){
					var attr = $(this).attr('required');
					var selectVal = $(this).val();
					var $chosenField = $(this).next('.chosen-container').find('.chosen-single');

					if (typeof attr !== typeof undefined && attr !== false && selectVal=='') {
						$chosenField.addClass('errorfield');
					}else{
						$chosenField.removeClass('errorfield');
					}
				});
			}
		});
	});

	// Yandex карта
	if ($('#map').length) {
		// Иницилизация карты
		ymaps.ready(init);

		function init(){
			var myMap;

			myMap = new ymaps.Map("map", {
				center: [53.26, 34.34],
				zoom: 16,
				controls: []
			});

			var myPlacemark = new ymaps.Placemark([53.260278, 34.339222] , {},
				{ iconLayout: 'default#image',
				iconImageOffset: [0, -60] 
				});

				myMap.geoObjects.add(myPlacemark);
		}
	}

	// Кнопка загрузки файла
	$('.js-input-file').change(function(){
		var f_name = [];

		for (var i = 0; i < $(this).get(0).files.length; ++i) {

			f_name.push(" " + $(this).get(0).files[i].name);

		}

		$(".js-name-file").html(f_name);
		$(".js-name-file").attr("title", f_name)
	});

	// Слайдер карточки товаров
	 $('.js-product-slide-img').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: false,
		vertical: true,
		focusOnSelect: true,
		asNavFor: '.js-product-slide-thumb',
		responsive: [
			{
				breakpoint: 768,
				settings: {
					vertical: false,
				}
			},
		]
	});

	$('.js-product-slide-thumb').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: '.js-product-slide-img',
		dots: false,
		arrows: true,
		vertical: true,
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					vertical: false,
				}
			},
			{
				breakpoint: 520,
				settings: {
					vertical: false,
					slidesToShow: 4,
				}
			},
			{
				breakpoint: 420,
				settings: {
					vertical: false,
					slidesToShow: 3,
				}
			},
		]
	});


	//---------- Маска для телефона -------------
	$.mask.definitions['~'] = "[+-]";
	$(".js-phone").mask("+7 (999) 999-99-99");

	// Ввод имени с загловной русскими буквами
	$('.js-name').keyup(function(){
		this.value = this.value[0].toUpperCase() + this.value.slice(1);
		this.value = this.value.replace(/[^а-яА-ЯёЁ0-9 -]/ig,'');
	});
});