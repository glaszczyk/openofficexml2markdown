//Odczytujemy pliki XML z serwera przez XMLHttpRequest
//Dla testów przygotowane są trzy pliki, przypisane do urlOne, urlTwo, urlThee
const xhr = new XMLHttpRequest(),
	urlOne = 'http://blog.grzegorzlaszczyk.pl/tests/content-one-para.xml',
	urlTwo = 'http://blog.grzegorzlaszczyk.pl/tests/content-para-char.xml',
	urlThree = 'http://blog.grzegorzlaszczyk.pl/tests/content-styled-unstyled.xml';

//zmieniamy zmienne odpowiadające za url poszczególnych plików
xhr.open( 'GET', urlOne, true );
xhr.send( null );
xhr.onload = success;
xhr.onerror = error;

function success( event ) {
	if ( xhr.status == 200 ) {
		screenOutput( xhr.responseText );
		consoleOutput( xhr.responseXML.childNodes[ 0 ]);
	} else {
		console.log( xhr.statusText );
	}
}
function error( event ) {
	console.log( 'We have an error here' );
}
//Wyświetlamy zawartość pliku XML na ekran
function screenOutput( content ) {
	let container = document.querySelector( '.xml-content' );
	container.outerHTML = content;
}
//Wyświetlamy zawartość pliku XML do konsoli
function consoleOutput( content ) {
	console.log( content );
}


