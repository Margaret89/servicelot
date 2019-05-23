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

			$('input[data-required="true"]').each(function(e){
				showErrorField($(this));
			});

			$('textarea[data-required="true"]').each(function(e){
				showErrorField($(this));
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


	// //---------- Маска для телефона -------------
	// $.mask.definitions['~'] = "[+-]";
	// $("#phone").mask("(999) 999-9999");

	// // Вызов функции подгрузки изображений
	// loadBigImg();
	// loadBigBacground();

	// // Вызов функции прижатия футера к низу экрана
	// footerBind('.js-main','.js-header,.js-footer');
	// $(window).on('resize',function(){footerBind('.js-main','.js-header,.js-footer')});
});

// // Загрузка больших изображений
// function loadBigImg() {
// 	var $imgDefer = $('[data-src]');

// 	$imgDefer.each(function(indx, element){
// 		var urlImgBig = $(this).attr("data-src");
// 		$(this).attr("src", urlImgBig);
// 	});
// }

// function loadBigBacground() {
// 	var $imgDefer = $('[data-background]');

// 	$imgDefer.each(function(indx, element){
// 		var urlBackgroundBig = $(this).attr("data-background");
// 		$(this).css("background-image", "url("+ urlBackgroundBig +")");
// 	});
// }