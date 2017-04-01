(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.xmlTraverse = global.xmlTraverse || {})));
}(this, (function (exports) { 'use strict';

// return node.childNodes
function children( node ) {
	return Array.from( node.childNodes );
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
//Define XML DOM Traverse module
const XMLDomTraverse = {
	// Read content from node given
	traverse( content ) {
		const contentToRead = children( content );
		console.log( contentToRead.map( element => readFromFirst( children( element ))));
	}
};

// Recursive read childNodes and return tagName node when found
function extract( content, tagName ) {
	const childs = children( content );
	return childs.reduce(( prev, current ) => {
		return ( current.nodeName === tagName ) ? current : extract( current, tagName );
	}, '' );
}

class Content {
	constructor( content, tagName ) {
		this.content = extract( content, tagName );
	}
}

exports.XMLDomTraverse = XMLDomTraverse;
exports.Content = Content;

Object.defineProperty(exports, '__esModule', { value: true });

})));
