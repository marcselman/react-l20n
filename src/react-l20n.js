// react-l20n.js
// version: 0.1.0
// author: Marc Selman
// license: MIT

import React from 'react'
import PropTypes from 'prop-types';
import { FluentBundle, ftl } from 'fluent';
import parse from 'html-react-parser';

const fsiCharacter = new RegExp(String.fromCharCode(8296), 'g')
const psiCharacter = new RegExp(String.fromCharCode(8297), 'g')

class L20n
{
	constructor()
	{
		this.contexts = new Map();
		this.defaultLocale = 'en';
		this.fallbackToDefault = true;
	}
	load(locale, ftl)
	{
		var ctx = this.contexts.get(locale);
		if (!ctx)
		{
			ctx = new FluentBundle(locale);
			this.contexts.set(locale, ctx);
		}

		const errors = ctx.addMessages(ftl);
		if (errors.length)
		{
			console.log(errors);
		}
	}
	getRaw(key, props, locale = this.defaultLocale)
	{
		var ctx = this.contexts.get(locale);
		if (!ctx)
		{
			if (this.fallbackToDefault)
			{
				ctx = this.contexts.get(this.defaultLocale);
			}
			
			if (!ctx)
			{
				return `Locale '${ locale }' missing`
			}
		}

		var template = ctx.getMessage(key);
		if (template != undefined && typeof template === 'object') {
			template = ctx.format(template, props);
		}

		if (template == undefined || typeof template === 'undefined') {
			if (this.fallbackToDefault && !ctx.locales.includes(this.defaultLocale)) {
				return this.getRaw(key, props, this.defaultLocale);
			}
			return undefined;
		}
		else if (typeof template === 'string') {
			return template.replace(fsiCharacter, '').replace(psiCharacter, '');
		}
		else {
			var [ message, errors ] = formatted;

			if (errors.length > 0) {
				console.log(errors);
				return undefined;
			}

			return message.replace(fsiCharacter, '').replace(psiCharacter, '');
		}
	}
	get(key, props, locale = this.defaultLocale)
	{
		var message = this.getRaw(key, props, locale)
		if (typeof(message) != 'string') return undefined
		return <React.Fragment>{ parse(message) }</React.Fragment>
	}
	getContext(locale = this.defaultLocale)
	{
		var ctx = this.contexts.get(locale);
		if (!ctx)
		{
			if (this.fallbackToDefault)
			{
				ctx = this.contexts.get(this.defaultLocale);
			}
			
			if (!ctx)
			{
				return null
			}
		}

		return ctx;
	}
}

export class L20nElement extends React.Component
{
	constructor(props)
	{
		super(props)
	}

	render()
	{
		this.attrs = Object.assign({}, this.props);
		delete this.attrs['id']
		delete this.attrs['renderAs']
		delete this.attrs['locale']
		delete this.attrs['elementRef']

		var value = l20n.getRaw(this.props.id, {}, this.props.locale)
		if (value) {
			this.attrs['defaultValue'] = value
		}

		var ctx = l20n.getContext(this.props.locale);
		if (ctx) {
			var template = ctx.getMessage(this.props.id);
			if (template && template.attrs) {
				Object.entries(template.attrs).forEach(a => {
					this.attrs[a[0]] = a[1];
				})
			}
		}

		return (
			<this.props.renderAs ref={ this.props.elementRef } { ...this.attrs }>{ this.props.children }</this.props.renderAs>
		)
	}
}

L20nElement.propTypes = {
	id: PropTypes.string.isRequired,
	renderAs: PropTypes.string.isRequired,
	locale: PropTypes.string
};

var l20n = new L20n

export default l20n