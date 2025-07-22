//var existentes
var esfera, esfera2, esfera3, esfera4, viewer, progress, progressElement, vmacess, vmvr, v_esf, v_prog, tooltipSpan, btn_acess, btn_acess_ok, btn_acess_x, modal_acess, audio_acess_inicio, audio_esfera, audio_esfera2, audio_esfera3, audio_esfera4, btn_vr;
// valores das var
btn_acess = document.getElementById("btn-acess");
modal_acess = document.getElementById("modal_acess");
btn_acess_x = document.getElementById("btn_acess_x");
btn_acess_ok = document.getElementById("btn_acess_ok");
audio_acess_inicio = document.getElementById('aud_acess_inicio');

audio_esfera = document.getElementsByClassName('aud_esfera')[0];
audio_esfera2 = document.getElementsByClassName('aud_esfera')[1];
audio_esfera3 = document.getElementsByClassName('aud_esfera')[2];
audio_esfera4 = document.getElementsByClassName('aud_esfera')[3];
audio_esfera5 = document.getElementsByClassName('aud_esfera')[4];

audio_pino1 = document.getElementById('aud_pin1');
audio_pino2 = document.getElementById('aud_pin2');
audio_pino3 = document.getElementById('aud_pin3');
audio_pino4 = document.getElementById('aud_pin4');
audio_pino5 = document.getElementById('aud_pin5');
audio_pino6 = document.getElementById('aud_pin6');

btn_vr = document.getElementById("btn-vr");

// via JAVASCRIPT, tentarei pegar se é dispositivo movel ou desk
if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ){

	$('#btn-vr').prop('disabled', false);
	$('#btn-vr').prop('title', false);
}

// barra de pogresso
progressElement = document.getElementById('progress');
// texto de carregando
progresstxt = $(".txt_load");
// funcoes da barra de progresso
// onEnter = zera a barra e retira a class finish, onProgress = exibi a barra de progresso e quando chegar a 100 coloca a class finish e termina, onOut = após carregar, para o audio de acess, e some devagar o texto de carregando (após sumir, verifica o acessibilidade)
function onEnter ( event ) {
	progresstxt.fadeIn(500);
	progressElement.style.width = 0;
	progressElement.classList.remove( 'finish' );
}

function onOut ( event ) {
	stop_acess();
	$.when(progresstxt.fadeOut(1500)).done(function() {
		comecar_acess();
	});
}

// progresso em andamento
function onProgress ( event ) {
	progress = event.progress.loaded / event.progress.total * 100;
	progressElement.style.width = progress + '%';
	if ( progress === 100 ) {
		progressElement.classList.add( 'finish' );
		if ( progressElement.classList.contains( 'finish' ) ){
			onOut();
		}
	}
}

// primeira esfera
// para usar um video, este é o codigo
// esfera = new PANOLENS.VideoPanorama( 'assets/img/video360.mp4', {autoplay: true});	
esfera = new PANOLENS.ImagePanorama( 'assets/img/corredor.jpg' );
// zera a barra de progresso (onEnter), inicia o progresso (onProgress) e depois termina o progress com onOut
esfera.addEventListener( 'enter', function(){
	v_esf = 1;
	onEnter();
});
esfera.addEventListener( 'progress', onProgress );
esfera.addEventListener( 'load', function(){
	v_prog = null;
});
esfera.addEventListener( 'enter', function(){
	if (v_prog == 1) {
		onOut();
	}
});
esfera.addEventListener( 'load', function(){
	v_prog = 1;
});

	// cria pinos
	pin_img_e1 = new PANOLENS.Infospot( 350, PANOLENS.DataImage.Foto ); //tamanho, imagem do pino
	pin_img_e1.position.set( 4919.98, 125.30, -823.53 ); // posicao do pino, para saber ctrl + click na tela, ver no console
	pin_img_e1.addHoverElement( document.getElementById( 'imagem-1' ), 170 ); //id da div do conteudo, tamanho
	// evento hoverenter e hoverleave, para mostrar um titulo sobre o pino
	pin_img_e1.addEventListener("hoverenter", function(){
		title_pin("Banner divulgação SONY", "entrou"); // funcao, coloca o titulo que deseja e se o mouse entrou ou saiu do pino
		if (vmacess == 1) {
			stop_acess();
			audio_pino1.play();
		}
		if (vmacess !== null) {
			$("#tooltip-span").click();
			$("#tooltip-span").vibrate(); // ao passar por cima vibra
		}
	});
	pin_img_e1.addEventListener("hoverleave", function(){
		title_pin("Banner divulgação SONY", "saiu");
		if (vmacess == 1) {
		audio_pino1.pause();
			audio_pino1.currentTime = 0;
		}
	});
	pin_img_e1.addEventListener("click", function(){
		if (vmacess == 1) {
			stop_acess();
			audio_pino1.play();
		}
		if (vmacess !== null) {
			$("#tooltip-span").click();
			$("#tooltip-span").vibrate("long");
		}
	});

	pin_map_e1 = new PANOLENS.Infospot( 350, PANOLENS.DataImage.Info );
	pin_map_e1.position.set( 393.01, 587.65, 4940.87 );
	pin_map_e1.addHoverElement( document.getElementById( 'mapeamento-1' ), 170 );
	pin_map_e1.addEventListener("hoverenter", function(){
		title_pin("Televisão", "entrou");
		if (vmacess == 1) {
			stop_acess();
			audio_pino2.play();
		}
		if (vmacess !== null) {
			$("#tooltip-span").click();
			$("#tooltip-span").vibrate(); // ao passar por cima vibra
		}
	});
	pin_map_e1.addEventListener("hoverleave", function(){
		title_pin("Televisão", "saiu");
		if (vmacess == 1) {
		audio_pino2.pause();
			audio_pino2.currentTime = 0;
		}
	});
	// ao clicar a vibração será mais forte
	pin_map_e1.addEventListener("click", function(){
		if (vmacess == 1) {
			stop_acess();
			audio_pino2.play();
		}
		if (vmacess != null) {
			$("#tooltip-span").click();
			$("#tooltip-span").vibrate("long");
		}
	});

	pin_inf_e1 = new PANOLENS.Infospot( 350, PANOLENS.DataImage.Info );
	pin_inf_e1.position.set( -4799.92, -107.11, 1362.25 );
	pin_inf_e1.addHoverText( 'Banheiros com acessibilidade.', 60 );
	pin_inf_e1.addEventListener("hoverenter", function(){
		if (vmacess == 1) {
			stop_acess();
			audio_pino3.play();
		}
		title_pin("Banheiro", "entrou");
		if (vmacess != null) {
			$("#tooltip-span").click();
			$("#tooltip-span").vibrate(); // ao passar por cima vibra
		}
	});
	pin_inf_e1.addEventListener("hoverleave", function(){
		title_pin("Banheiro", "saiu");
		if (vmacess == 1) {
		audio_pino3.pause();
			audio_pino3.currentTime = 0;
		}
	});
	pin_inf_e1.addEventListener("click", function(){
		if (vmacess == 1) {
			stop_acess();
			audio_pino3.play();
		}
		if (vmacess != null) {
			$("#tooltip-span").click();
			$("#tooltip-span").vibrate("long");
		}
	});

// segunda esfera
esfera2 = new PANOLENS.ImagePanorama( 'assets/img/sala.jpg' );
esfera2.addEventListener( 'enter', function(){
	v_esf = 2;
	onEnter();
});
esfera2.addEventListener( 'progress', onProgress );
esfera2.addEventListener( 'load', function(){
	v_prog = null;
});
esfera2.addEventListener( 'enter', function(){
	if (v_prog == 1) {
		onOut();
	}
});
esfera2.addEventListener( 'load', function(){
	v_prog = 1;
});

	// cria pinos
	pin_inf_e2 = new PANOLENS.Infospot( 350, PANOLENS.DataImage.Info );
	pin_inf_e2.position.set( 3083.01, -108.78, -3922.91 );
	pin_inf_e2.addHoverText( 'Desenvolvedores ficarão 2 dias desenvolvendo no tema: Cidade inteligente, RV e RA', 100 );
	pin_inf_e2.addEventListener("hoverenter", function(){
		title_pin("O que fazem ?", "entrou");
		if (vmacess == 1) {
			stop_acess();
			audio_pino4.play();
		}
		if (vmacess != null) {
			$("#tooltip-span").click();
			$("#tooltip-span").vibrate(); // ao passar por cima vibra
		}
	});
	pin_inf_e2.addEventListener("hoverleave", function(){
		title_pin("O que fazem ?", "saiu");
		if (vmacess == 1) {
		audio_pino4.pause();
			audio_pino4.currentTime = 0;
		}
	});
	pin_inf_e2.addEventListener("click", function(){
		if (vmacess == 1) {
			stop_acess();
			audio_pino4.play();
		}
		if (vmacess != null) {
			$("#tooltip-span").click();
			$("#tooltip-span").vibrate("long");
		}
	});

// terceira esfera
esfera3 = new PANOLENS.ImagePanorama( 'assets/img/sala2.jpg' );
esfera3.addEventListener( 'enter', function(){
	v_esf = 3;
	onEnter();
});
esfera3.addEventListener( 'progress', onProgress );
esfera3.addEventListener( 'load', function(){
	v_prog = null;
});
esfera3.addEventListener( 'enter', function(){
	if (v_prog == 1) {
		onOut();
	}
});
esfera3.addEventListener( 'load', function(){
	v_prog = 1;
});

// quarta esfera
esfera4 = new PANOLENS.ImagePanorama( 'assets/img/escada.jpg' );
esfera4.addEventListener( 'enter', function(){
	v_esf = 4;
	onEnter();
});
esfera4.addEventListener( 'progress', onProgress );
esfera4.addEventListener( 'load', function(){
	v_prog = null;
});
esfera4.addEventListener( 'enter', function(){
	if (v_prog == 1) {
		onOut();
	}
});
esfera4.addEventListener( 'load', function(){
	v_prog = 1;
});

	pin_map_e4 = new PANOLENS.Infospot( 350, PANOLENS.DataImage.Info );
	pin_map_e4.position.set( 4529.63, 320.14, -2080.78 );
	pin_map_e4.addHoverElement( document.getElementById( 'game_escada-1' ), 170 );
	pin_map_e4.addEventListener("hoverenter", function(){
		if (vmacess == 1) {
			stop_acess();
			audio_pino6.play();
		}
		title_pin("teste", "entrou");
		if (vmacess !== null) {
			$("#tooltip-span").click();
			$("#tooltip-span").vibrate(); // ao passar por cima vibra
		}
	});
	pin_map_e4.addEventListener("hoverleave", function(){
		title_pin("teste", "saiu");
		if (vmacess == 1) {
		audio_pino6.pause();
			audio_pino6.currentTime = 0;
		}
	});
	// ao clicar a vibração será mais forte
	pin_map_e4.addEventListener("click", function(){
		if (vmacess == 1) {
			stop_acess();
			audio_pino6.play();
		}
		if (vmacess != null) {
			$("#tooltip-span").click();
			$("#tooltip-span").vibrate("long");
		}
	});

// quinta esfera
esfera5 = new PANOLENS.ImagePanorama( 'assets/img/aberta.jpg' );
esfera5.addEventListener( 'enter', function(){
	v_esf = 5;
	onEnter();
});
esfera5.addEventListener( 'progress', onProgress );
esfera5.addEventListener( 'load', function(){
	v_prog = null;
});
esfera5.addEventListener( 'enter', function(){
	if (v_prog == 1) {
		onOut();
	}
});
esfera5.addEventListener( 'load', function(){
	v_prog = 1;
});


	// criar pinos
	pin_map_e5 = new PANOLENS.Infospot( 350, PANOLENS.DataImage.Info );
	pin_map_e5.position.set( 2254.95, 654.62, 4402.91 );
	pin_map_e5.addHoverElement( document.getElementById( 'mapeamento-2' ), 170 );
	pin_map_e5.addEventListener("hoverenter", function(){
		title_pin("New York City Center", "entrou");
		if (vmacess == 1) {
			stop_acess();
			audio_pino5.play();
		}
		if (vmacess !== null) {
			$("#tooltip-span").click();
			$("#tooltip-span").vibrate(); // ao passar por cima vibra
		}
	});
	pin_map_e5.addEventListener("hoverleave", function(){
		title_pin("New York City Center", "saiu");
		if (vmacess == 1) {
		audio_pino5.pause();
			audio_pino5.currentTime = 0;
		}
	});
	// ao clicar a vibração será mais forte
	pin_map_e5.addEventListener("click", function(){
		if (vmacess == 1) {
			stop_acess();
			audio_pino5.play();
		}
		if (vmacess != null) {
			$("#tooltip-span").click();
			$("#tooltip-span").vibrate("long");
		}
	});

// add os pinos e as setas dentro da esfera
// esfera 1
esfera.link( esfera2, new THREE.Vector3( -2351.41, 413.39, 4385.76 ), 350, PANOLENS.DataImage.SetaDir, "Hackathon" ); // onclick, localizacao, imagem, titulo para aparecer ao passar o mouse por cima
esfera.link( esfera3, new THREE.Vector3( 4804.36, -113.64, 1344.71 ), 350, PANOLENS.DataImage.SetaEsq, "Maratona Makers(Petrobras)" );
esfera.link( esfera4, new THREE.Vector3( 4991.77, 91.06, 88.75 ), 350, PANOLENS.DataImage.SetaCima, "Escada" );
esfera.link( esfera5, new THREE.Vector3( -4910.53, -340.46, -829.20 ), 350, PANOLENS.DataImage.SetaCima, "Área aberta" );
esfera.add( pin_img_e1 );
esfera.add( pin_map_e1 );
esfera.add( pin_inf_e1 );

// esfera 2
esfera2.link( esfera, new THREE.Vector3( 4337.27, -249.45, 2464.41 ), 350, PANOLENS.DataImage.SetaEsq, "Corredor" );
esfera2.add( pin_inf_e2 );

// esfera 3
esfera3.link( esfera, new THREE.Vector3( 4-4805.47, -597.88, -1204.44 ), 350, PANOLENS.DataImage.SetaCima, "Corredor" );

// esfera4
esfera4.link( esfera, new THREE.Vector3( -571.64, -151.07, -4958.85 ), 350, PANOLENS.DataImage.SetaCima, "Corredor" );
esfera4.add( pin_map_e4 );

// esfera5
esfera5.link( esfera, new THREE.Vector3( -2384.31, 177.83, -4381.24 ), 350, PANOLENS.DataImage.SetaCima, "Corredor" );
esfera5.add( pin_map_e5 );

// inicia a esfera c suas configuracoes
// se for Apple sem ser desk, vai colocar o btn de setting e sumir com o cardboard
if ( navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i)  ) {
	$('#btn-vr').css('display', 'none'); //display none no btn cardboard
	viewer = new PANOLENS.Viewer({
		container: document.body,   // A DOM Element container
		controlBar: true,       // Vsibility of bottom control bar
		controlButtons: ['fullscreen', 'setting', 'video'],     // Buttons array in the control bar. Default to ['fullscreen', 'setting', 'video']
		autoHideControlBar: false,    // Auto hide control bar
		autoHideInfospot: false,     // Auto hide infospots
		horizontalView: false,      // Allow only horizontal camera control
		cameraFov: 80,        // Camera field of view in degree
		reverseDragging: false,     // Reverse orbit control direction
		enableReticle: false,     // Enable reticle for mouseless interaction
		dwellTime: 1200,      // Dwell time for reticle selection in millisecond
		autoReticleSelect: true,    // Auto select a clickable target after dwellTime
		viewIndicator: true,     // Adds an angle view indicator in upper left corner
		indicatorSize: 30,      // Size of View Indicator
		output: 'console'     // Whether and where to output infospot position. Could be 'console' or 'overlay'
	});
}else{
	viewer = new PANOLENS.Viewer({
		container: document.body,
		controlBar: true,
		controlButtons: ['fullscreen', 'video'],
		autoHideControlBar: false,
		autoHideInfospot: false,
		horizontalView: false,
		cameraFov: 80,
		reverseDragging: false,
		enableReticle: false,
		dwellTime: 1200,
		autoReticleSelect: true,
		viewIndicator: true,
		indicatorSize: 30,
		output: 'console'
	});
} // fim se verifica se e apple p/ modo VR

// add as esferas ao viewer
viewer.add( esfera, esfera2, esfera3, esfera4, esfera5);

// acessibilidade
btn_acess.onclick = function() {
	if (vmacess == null) {
		modal_acess.style.display = "block";
		audio_acess_inicio.play();
	}else{
		btn_acess.style.backgroundImage = "url('assets/img/acess_on.png')";
		btn_acess.title = "Clique para ativar acessibilidade";
		stop_acess();
		// limpa a variavel
		vmacess = null;
	}
}

btn_acess_x.onclick = function() {
	modal_acess.style.display = "none";
	audio_acess_inicio.pause();
	audio_acess_inicio.currentTime = 0;
}

btn_acess_ok.onclick = function() {
	// verifica se esta ativado (se for igual a vazio a variavel), se for vazia entra no modo acessibilidade se nao volta ao normal
	if (vmacess == null) {
		modal_acess.style.display = "none";
		audio_acess_inicio.pause();
		audio_acess_inicio.currentTime = 0;
		btn_acess.style.backgroundImage = "url('assets/img/acess_off.png')";
		btn_acess.title = "Clique para desativar acessibilidade";
		// ativado
		vmacess = 1;
		comecar_acess();
	}
}
if( !( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ) ){
	btn_acess.addEventListener("mousemove", function(){
		title_btn(btn_acess.title, "entrou");
	});
	btn_acess.addEventListener("mouseout", function(){
		title_btn(btn_acess.title, "saiu");
	});
}

// play_Acess carrega todos os audios, verifica se o modo acessibilidade esta ativado, se sim entra no swith e verifica qual esfera esta
function play_acess() {
	audio_esfera.load();
	audio_esfera2.load();
	audio_esfera3.load();
	audio_esfera4.load();
	audio_esfera5.load();
	if ( vmacess == 1 ) {
	switch(v_esf) { // verifica qual esfera esta para ativar o audio correto
		case 1:
			audio_esfera.play();
			break;
		case 2:
			audio_esfera2.play();
			break;
		case 3:
			audio_esfera3.play();
			break;
		case 4:
			audio_esfera4.play();
			break;
		case 5:
			audio_esfera5.play();
			break;
	}
	}
}

// comecar_acess da 500 milissegundos e inicia o play_acess
function comecar_acess() {
	setTimeout( function () {
		play_acess();
	},500);
}

// funcao q vai parar todos os audios de acessibilidade, parar e zerar o som
function stop_acess() {
	audio_esfera.pause();
		audio_esfera.currentTime = 0;
	audio_esfera2.pause();
		audio_esfera2.currentTime = 0;
	audio_esfera3.pause();
		audio_esfera3.currentTime = 0;
	audio_esfera4.pause();
		audio_esfera4.currentTime = 0;
	audio_esfera5.pause();
		audio_esfera5.currentTime = 0;
}

// modo vr
btn_vr.onclick = function() {
	// verifica se esta ativado (se for diferente de vazio a variavel), se for vazia entra no modo VR se nao volta ao normal
	if (vmvr != null) {
		// voltar a img normal
		btn_vr.style.backgroundImage = "url('assets/img/vr.png')";
		//muda um pouco o tamanho
		btn_vr.style.width = "44px";
		btn_vr.style.height = "44px";
		btn_vr.style.bottom = "2px";
		btn_vr.style.left = "";
		btn_acess.style.display = "block";
		// control p: normal
		viewer.enableControl( PANOLENS.Controls.ORBIT );
		// mode p: normal
		viewer.enableEffect( PANOLENS.Modes.NORMAL );
		// limpa a variavel
		vmvr = null;
	}else{
		// ao entrar modo vr muda a img
		btn_vr.style.backgroundImage = "url('assets/img/back.png')";
		//muda um pouco o tamanho
		btn_vr.style.width = "30px";
		btn_vr.style.height = "30px";
		btn_vr.style.bottom = "6px";
		btn_vr.style.left = "48%";
		btn_acess.style.display = "none";
		// control p: sensor
		viewer.enableControl( PANOLENS.Controls.DEVICEORIENTATION );
		// mode p: cardboard
		viewer.enableEffect( PANOLENS.Modes.CARDBOARD );
		// ativado
		vmvr = 1;
		//se estiver em modo portrait, avisar para virar o celular
		if (window.matchMedia("(orientation: portrait)").matches) {
			var span_aviso = document.createElement("span");              // Create a span
			span_aviso.classList.add('tag_aviso');                        // Create class to span
			span_aviso.setAttribute("id", "spn_aviso");                   // Create id to span
			var text = document.createTextNode("Vire o seu dispositivo"); // Create a text
			span_aviso.appendChild(text);                                 // Append the text to span
			document.body.appendChild(span_aviso);                        // Append span to <body>
			$("#spn_aviso").fadeOut(2500);                                // desaparece em 2500 milis
			setTimeout(function(){ $("#spn_aviso").remove(); }, 3500);
		}
	} // fim else verificar
} // fim funcao modo vr
// via JAVASCRIPT, tentarei pegar se é dispositivo movel ou desk
if( !( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ) ){
	btn_vr.addEventListener("mousemove", function(){
		title_btn("Ativar modo VR", "entrou");
	});
	btn_vr.addEventListener("mouseout", function(){
		title_btn("Ativar modo VR", "saiu");
	});
}


// funcao title_pin, para colocar o titlo em qual pino esta apontando o mouse
function title_pin(text,in_ou) {
	// declara o tooltip-span, que esta no index, escondido
	tooltipSpan = document.getElementById('tooltip-span');
	tooltipSpan_in_out = $("#tooltip-span");

	if (in_ou == "saiu") {

		tooltipSpan_in_out.fadeOut(50);
		tooltipSpan.innerHTML = null;

	}else if (in_ou == "entrou") {

		tooltipSpan.innerHTML = text;
		tooltipSpan_in_out.fadeIn(50);

		window.onmousemove = function (e) {
			var x = e.clientX,
				y = e.clientY;
			tooltipSpan.style.top = (y + 20) + 'px';
			tooltipSpan.style.left = (x + 20) + 'px';
		};

	}
}
// o mesmo que o title_pin, mas para os botões do rodapé, e como está em baixo, o tooltip aparece a cima
function title_btn(text,in_ou) {
	// declara o tooltip-span, que esta no index, escondido
	tooltipSpan = document.getElementById('tooltip-span');
	tooltipSpan_in_out = $("#tooltip-span");

	if (in_ou == "saiu") {

		tooltipSpan_in_out.fadeOut(50);
		tooltipSpan.innerHTML = null;

	}else if (in_ou == "entrou") {

		tooltipSpan.innerHTML = text;
		tooltipSpan_in_out.fadeIn(50);

		window.onmousemove = function (e) {
			var x = e.clientX,
				y = e.clientY;
			tooltipSpan.style.top = (y - 60) + 'px';
			tooltipSpan.style.left = (x + 5) + 'px';
		};
	}
}