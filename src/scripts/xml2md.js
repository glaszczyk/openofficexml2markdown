'use strict';
const fs = require( 'fs' ),
	jsdom = require( 'jsdom' ),
	util = require( 'util' ),
	urlOne = '../../TestSamples/OnePara/content-one-para.xml',
	urlTwo = '../../TestSamples/ParaCharStylesAndDefault/content-para-char.xml',
	urlThree = '../../TestSamples/StyledAndUnstyledText/content-styled-unstyled.xml',
	urlFour = '../../TestSamples/ParasAndLists/content-paras-lists.xml';

//fs.rename('OnePara.odt', 'OnePara.zip');
/*
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
*/
jsdom.env({
	file: urlFour,
	parsingMode: 'xml',
	done( error, window ) {
		if ( error ) {
			console.log( error );
		}
		const nodeWindow = window,
			response = nodeWindow.document,
			content = getContent( response, 'office:text' );
		traverseDOM( content );
	}
});
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
			} else {
				return ( prev + `<${current.parentElement.attributes[ 0 ].nodeValue}>` + current.nodeValue );
			}
		}
	}, '' );
}
