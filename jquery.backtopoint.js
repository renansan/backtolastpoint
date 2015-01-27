/*
 *	jQuery - Back to Point
 *
 *	Copyright (c) Renan San
 *	http://www.github.com/renansan
 *
 *	Plugin website:
 *	http://www.github.com/renansan/backtopoint
 *
 *	Licensed under the MIT license.
 *	http://en.wikipedia.org/wiki/MIT_License
 */

$(function() {
	// Armazenam a posição atual e a última posição, respectivamente
	var position = $(this).scrollTop(),
		lastPosition;

	// Quando a página é rolada, atualiza a atual e a última posição da tela
	$(document).on("scroll", function() {
		lastPosition = position;
		position = $(this).scrollTop();
	});

	// Quando o botão BtP é clicado, a página rola até o ponto anterior
	$(".backtopoint").click(function(event) {
		event.preventDefault();
		alert("position "+position + "\nlastPosition "+lastPosition);
		$('html, body').animate({
			scrollTop: lastPosition
		}, 400);
	});

	// Se houver uma div com a id x
	if ($("div#btp-data").length > 0) {
		
		// Gera o HTML que exibe os dados do BtP
		$html = '<h2>Dados</h2>';
		$html += '<ul>';
		$html += '<li class="position">Posição atual: <span class="data-value"></span></li>';
		$html += '<li class="last-position">Última posição: <span class="data-value"></span></li>';
		$html += '</ul>';

		// Insere o HTML gerado na div x
		$("div#btp-data").prepend($html);

		// Quando a página é rolada, atualiza a atual e a última posição no arquivo data
		$(document).on("scroll", function() {
			$("#btp-data .position .data-value").text(position);
			$("#btp-data .last-position .data-value").text(lastPosition);
		});
	};
});