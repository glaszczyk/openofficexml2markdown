// Read XML files form server via XMLHttpRequest
// For tests purposes three different sources urlOne, urlTwo, urlThee defined
const xhr = new XMLHttpRequest(),
	urlOne = 'http://blog.grzegorzlaszczyk.pl/tests/content-one-para.xml',
	urlTwo = 'http://blog.grzegorzlaszczyk.pl/tests/content-para-char.xml',
	urlThree = 'http://blog.grzegorzlaszczyk.pl/tests/content-styled-unstyled.xml',
	urlFour = 'http://blog.grzegorzlaszczyk.pl/tests/content-paras-lists.xml';

// change url here
xhr.open( 'GET', urlFour, true );
xhr.send( null );
xhr.onload = success;
xhr.onerror = error;

function success( event ) {
	if ( xhr.status == 200 ) {
		screenOutput( xhr.responseText );
		console.log( children( xhr.responseXML )[ 0 ]);
		const response = xhr.responseXML,
			content = getContent( response, 'office:text' );
		traverseDOM( content );
	} else {
		console.log( xhr.statusText );
	}
}
function error( event ) {
	console.log( 'We have an error here' );
}
// get content from node tag
function getContent( content, tagName ) {
	const childs = children( content ),
		element = childs.reduce(( prev, current ) => {
			return ( current.nodeName === tagName ) ? current : getContent( current, tagName );
		}, '' );
	return element;
}
// return node.childNodes
function children( node ) {
	return Array.from( node.childNodes );
}
// Display XML content as part of DOM and replace <p> in index.html
function screenOutput( content ) {
	let container = document.querySelector( '.xml-content' );
	container.outerHTML = content;
}
// Read content from node given
function traverseDOM( content ) {
	const contentToRead = children( content );
	console.log( contentToRead.map( element => readFromFirst( children( element ))));
}
// Read nodes starting from highest child
function readFromFirst( node ) {
	return node.reduce(( prev, current ) => {
		if ( current.nodeType === 1 ) {
			return ( prev + readFromFirst( children( current )));
		} else if ( current.nodeType === 3 ) {
			//console.log( current.nodeValue );
			if ( current.parentElement.attributes.length === 0 ) {
				return ( prev + `<${current.parentElement.nodeName}>` + current.nodeValue );
				//użyć funcji addTag( current ) lub alternatywnej – jeśli nie da sie obu przypadków zaimplementować w jednej funkcji
			} else {
				return ( prev + `<${current.parentElement.attributes[ 0 ].nodeValue}>` + current.nodeValue );
				//użyć funcji addTag( current )
			}
		}
	}, '' );
}
// jeśli styl akapitowy to znacznik na początku, jeśli styl znakowy znacznik na początku i końcu
// jakie rodzaje elementów możemy rozróżnić?
// akapitowe: text:h, text:p,
// znakowe: text:span
// style zdefiniowane w OpenOffice są w pliku styles.xml, te zdefiniowane lokalnie są w content.xml. Informacje o przeznaczeniu są w atrybutach style:name, style:family (paragraph, text), style:class (text, index, list, extra). UWAGA! Nie wszystkie zawsze są zdefiniowane.
function addTag( node ) {

}
