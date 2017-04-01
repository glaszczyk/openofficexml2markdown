'use strict';
import { children } from './helpers';

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

export default XMLDomTraverse;
