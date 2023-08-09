var dt = new DataTransfer();
$('.file_task').on('change', function(){
	let $files_list = $(this).closest('.input-file').next();
	$files_list.empty();
	for(var i = 0; i < this.files.length; i++){
		let new_file_input = '<div class="input-file-list-item">' +
			'<span class="input-file-list-name"><svg viewBox="0 0 800 800"><path d="M577.8,341H477V176.2c0-14.1-11.7-25.8-25.8-25.8H350.4c-14.9,0-26.6,11.7-26.6,25.8V341H223.1 	c-13.3,0-18,8.6-7.8,18.8l167.2,166.4c4.7,4.7,10.9,7,18,7c7,0,14.1-2.3,18.8-7l166.4-166.4C595,349.6,591.8,341,577.8,341z 	 M119.9,459v178.1c0,7.8,3.9,12.5,12.5,12.5h534.4c8.6,0,13.3-4.7,13.3-12.5V459c0-7.8-6.3-13.3-13.3-13.3H616 	c-7,0-13.3,6.3-13.3,13.3v113.3H196.5V459c0-7.8-5.5-13.3-12.5-13.3h-51.6C125.4,445.7,119.9,452,119.9,459z"/></svg>' + this.files.item(i).name + '</span>' +
			'<div onclick="removeFilesItem(this);" class="input-file-list-remove">удалить</div>' +
			'</div>';
		$files_list.append(new_file_input);
		dt.items.add(this.files.item(i));
	};
	this.files = dt.files;
});

var dtt = new DataTransfer();
$(document).on('change','.file_image', function(){
	let $files_list = $(this).closest('.input-file').next();
	$files_list.empty();
	for(var i = 0; i < this.files.length; i++){
		let file = this.files.item(i);
		dtt.items.add(file);    
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = function(){
			let new_file_input = '<div class="input-file-list-item">' +
				'<img class="input-file-list-img" src="' + reader.result + '">' +
				'<span class="input-file-list-name">' + file.name + '</span>' +
				'<div onclick="removeFilesItem(this); return false;" class="input-file-list-remove">x</div>' +
			'</div>';
			$files_list.append(new_file_input); 
		}
	};
	this.files = dtt.files;
});

function removeFilesItem(target){
	let name = $(target).prev().text();
	let input = $(target).closest('.input-file-row').find('input[type=file]');
	let list = $(target).closest('.input-file-list');	
	$(target).closest('.input-file-list-item').remove();	
	for(let i = 0; i < dt.items.length; i++){
		if(name === dt.items[i].getAsFile().name){
			dt.items.remove(i);
		}
	}
	if ($(list).is(':empty')){
		$(list).text('Ничего пока не загружено')
	}
	//input[0].files = dt.files;  
}

$(document).on('change','.achiv_check', function(){
	var achiv_input = $(this).closest('.content__form-row-small').find('.achiv_input');
	if ($(this).is(':checked')) {
		$(achiv_input).prop('disabled',false);
	} else {
		$(achiv_input).prop('disabled',true);
	}
})

$('#b3').on('change', function(){
	if ($(this).is(':checked')) {
		$('.content__form-row_banner').show();
	} else {
		$('.content__form-row_banner').hide();
	}
})

$(document).on('click','.content__form-download',function(){
	$('.content__form-row_block-achive').removeClass('content__form-row_block-achive').clone().appendTo('.content__form-row-clone').addClass('content__form-row_block-achive');
	$(".content__form-row-clone *[id]").each((i, e) => {
		let id = $(e).attr("id");
		$(e).attr("id", id+1);
	  });
	 $(".content__form-row-clone *[for]").each((i, e) => {
		let id = $(e).attr("for");
		$(e).attr("for", id+1);
	  });
	$('.content__form-row-clone').prepend('<div class="content__form-row-close content__form-row-clone-close" title="Удалить блок">✖</div>').removeClass('content__form-row-clone').addClass('content__form-row-clone-p').after('<div class="content__form-row-clone"></div>');
})

$(document).on('click','.content__form-row-clone-close', function(){
	$(this).parent().prev().addClass('content__form-row_block-achive');
	$(this).parent().hide(500).remove();
})

$(document).on('click','.content__form-row-form-close', function(){
	$('.content__form-row_form').hide(100);
	$('.content__form-row_hidden').show().css('display','flex');
})

$('.content__form-add-task').on('click',function(){
	$('.content__form-add-success,.content__form-add-error').css('display','none');
	$('.content__form-add-loader').css('display','inline-block');
	setTimeout(function() { 
		$('.content__form-add-loader').css('display','none'); 
		$('.content__form-add-success').css('display','inline-block');
		$('.content__form-add-task').hide().css('display','none');
		$('.content__form-add-else').show().css('display','flex');
		}, 3000);
})

$(document).on('click','.content__form-add-new-task', function(){
	$(this).closest('.content__form-row_hidden').css('display','none');
	$('.content__form-row_thx').hide().css('display','none');
	$('.content__form-row_form').show().css('display','flex');
})

$(document).on('click','.button_added', function(){
	$('.content__form-row_form').hide().css('display','none');
	$('.content__form-row_thx').show().css('display','flex');
	return false;
})