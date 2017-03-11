'use strict';
const fs = require( 'fs' ),
	jsdom = require( 'jsdom' ),
	util = require( 'util' ),
	urlOne = '../../TestSamples/OnePara/content-one-para.xml',
	urlTwo = '../../TestSamples/ParaCharStylesAndDefault/content-para-char.xml',
	urlThree = '../../TestSamples/StyledAndUnstyledText/content-styled-unstyled.xml';

//fs.rename('OnePara.odt', 'OnePara.zip');

function nodeInfo( element ) {
	console.log( `nodeName >> ${element.nodeName}` );
	console.log( `nodeValue >> ${element.nodeValue}` );
	console.log( `nodeAttributes >> ${ element.attributes }` );
	console.log( `nodeType >> ${element.nodeType}` );
	console.log( `nodeChildren >> ${element.childNodes}` );
	console.log( `innerHTML >> ${element.innerHTML}` );
}

function children( node ) {
	const childs = Array.from( node.childNodes );
	if ( childs.length > 0 ) {
		childs.map( child => children( child ));
	} else {
		if ( node.nodeType === 3 ) {
			return nodeInfo( node );
		}
	}

}

jsdom.env({
	file: urlOne,
	parsingMode: 'xml',
	done( error, window ) {
		if ( error ) {
			console.log( error );
		}
		const nodeWindow = window,
			myXML = Array.from( nodeWindow.document.getElementsByTagName( 'office:text' ));
		console.log( myXML[ 0 ].innerHTML );
		myXML.map( node => children( node ));
	}
});
