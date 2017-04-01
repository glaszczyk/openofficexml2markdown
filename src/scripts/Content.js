'use strict';
import { children } from './helpers';
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

export default Content;
