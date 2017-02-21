// react-l20n.js
// version: 0.0.12
// author: Marc Selman
// license: MIT

import React from 'react'
import 'l20n'

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
			ctx = new Intl.MessageContext(locale);
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
				return `Locale '${locale}' missing`
			}
		}

		var template = ctx.messages.get(key);
		if (template != undefined && typeof template === 'object') {
			template = ctx.format(template, props);
		}

		if (template == undefined || typeof template === 'undefined') {
			if (this.fallbackToDefault && ctx.lang != this.defaultLocale) {
				return this.getRaw(key, props, this.defaultLocale);
			}
			return undefined;
		}
		else if (typeof template === 'string') return template;
		else {
			var [ message, errors ] = formatted;

			if (errors.length > 0) {
				console.log(errors);
				return undefined;
			}

			return message
		}
	}
	get(key, props, locale = this.defaultLocale)
	{
		var message = this.getRaw(key, props, locale)
		return <span dangerouslySetInnerHTML={ { __html: message } } />
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
			var template = ctx.messages.get(this.props.id);
			if (template && template.traits) {
				var attributes = template.traits.filter(t => t.key.ns == 'html').map(t => [t.key.name, t.val]);
				attributes.forEach(a => {
					this.attrs[a[0]] = a[1];
				})
			}
		}

		return (
			<this.props.renderAs ref={this.props.elementRef} {...this.attrs}>{ this.props.children }</this.props.renderAs>
		)
	}
}

L20nElement.propTypes = {
	id: React.PropTypes.string.isRequired,
	renderAs: React.PropTypes.string.isRequired,
	locale: React.PropTypes.string
};

var l20n = new L20n

export default l20n