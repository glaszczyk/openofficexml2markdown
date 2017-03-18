// Read XML files form server via XMLHttpRequest
// For tests purposes three different sources urlOne, urlTwo, urlThee defined
const xhr = new XMLHttpRequest(),
	urlOne = 'http://blog.grzegorzlaszczyk.pl/tests/content-one-para.xml',
	urlTwo = 'http://blog.grzegorzlaszczyk.pl/tests/content-para-char.xml',
	urlThree = 'http://blog.grzegorzlaszczyk.pl/tests/content-styled-unstyled.xml';

// change url here
xhr.open( 'GET', urlOne, true );
xhr.send( null );
xhr.onload = success;
xhr.onerror = error;

function success( event ) {
	if ( xhr.status == 200 ) {
		screenOutput( xhr.responseText );
		logger( children( xhr.responseXML )[ 0 ]);
		traverseDOM( 'office:text' );
	} else {
		logger( xhr.statusText );
	}
}
function error( event ) {
	logger( 'We have an error here' );
}
// return node.childNodes
function children( node ) {
	return Array.from( node.childNodes );
}
// Display content to console
function logger( content ) {
	console.log( content );
}
// Display XML content as part of DOM and replace <p> in index.html
function screenOutput( content ) {
	let container = document.querySelector( '.xml-content' );
	container.outerHTML = content;
}
// Read content from node given
function traverseDOM( tag ) {
	const tagContent = children( document.getElementsByTagName( tag )[ 0 ]);
	logger( tagContent );
	logger( tagContent.map( element => readFromFirst( children( element ))));
}
// Read nodes starting from highest child
function readFromFirst( node ) {
	return node.reduce(( prev, current ) => {
		if ( current.nodeType === 1 ) {
			return ( prev + readFromFirst( children( current )));
		} else if ( current.nodeType === 3 ) {
			logger( current.nodeValue );
			return ( prev + `<${current.parentElement.attributes[ 0 ].nodeValue}>` + current.nodeValue );
		}
	}, '' );
}
