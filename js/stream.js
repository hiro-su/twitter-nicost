$(function(){
	$('#start').click(function(){
		tweetStream();
		});

function tweetStream(){
	var ajax = $.ajaxSettings.xhr();
	ajax.open('post', 'stream.php', true);
	$('#tweet').html('Loadig...');
	ajax.send(null);

	ajax.onreadystatechange = function(){
		if(ajax.readyState == 2){
			$('#tweet').html('');
		}else if(ajax.readyState == 3){
			var data = ajax.responseText;
			var lines = data.split('\r\n');
			var line = lines[lines.length-2];

			if(line){
				//横スクロール
				var tweet = $('<li id="item">'+line+'</li>').prependTo('#tweet');
				var offset = tweet.offset({top:setPosition('#tweet'), left:$(window).width()});
				var animation = offset.hide().fadeIn('slow').animate({left:-$(window).width()}, {
				duration: 20000,
				easing: 'linear',
				queue: false,
				});

				//リスト表示
				$('<div id="list_item">'+line+'</div>').prependTo('#list').hide().fadeIn('slow');
			}
		}else if(ajax.readyState == 4){
			$('#tweet').prepend('接続が切れました。リロードしてください。').css('color', 'red');
		}
	}
}

function setPosition(id){
	var max = $(window).height();
	var itemHeight = $(id).height();
	var bottom = max - itemHeight;

	return bottom - bottom * Math.random();
}
});
