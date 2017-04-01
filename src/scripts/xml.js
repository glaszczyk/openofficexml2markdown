'use strict';
const fs = require( 'fs' ),
	jsdom = require( 'jsdom' ),
	domTraverse = require( './bundle.js' ),
	dom = domTraverse.XMLDomTraverse,
	Content = domTraverse.Content,
	urlOne = '../../TestSamples/OnePara/content-one-para.xml',
	urlTwo = '../../TestSamples/ParaCharStylesAndDefault/content-para-char.xml',
	urlThree = '../../TestSamples/StyledAndUnstyledText/content-styled-unstyled.xml',
	urlFour = '../../TestSamples/ParasAndLists/content-paras-lists.xml';

jsdom.env({
	file: urlFour,
	parsingMode: 'xml',
	done( error, window ) {
		if ( error ) {
			console.log( error );
		}
		const nodeWindow = window,
			response = nodeWindow.document,
			text = new Content( response, 'office:text' );
		dom.traverse( text.content );
	}
});
