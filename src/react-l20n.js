// react-l20n.js
// version: 0.0.1
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
		if (this.fallbackToDefault && !template && ctx.lang != this.defaultLocale) {
			return this.getRaw(key, props, this.defaultLocale);
		}

		var [ message, errors2 ] = ctx.format(template, props);

		return message
			.replace(String.fromCharCode(8296), '')
			.replace(String.fromCharCode(8297), '')			
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
	get Element()
	{
		class Element extends React.Component
		{
			constructor(props)
			{
				super(props)

				this.attrs = Object.assign({}, props);
				delete this.attrs['id']
				delete this.attrs['renderAs']
				delete this.attrs['locale']

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
			}

			render()
			{
				return (
					<this.props.renderAs {...this.attrs}>{ this.props.children }</this.props.renderAs>
				)
			}
		}

		Element.propTypes = {
			id: React.PropTypes.string.isRequired,
			renderAs: React.PropTypes.string.isRequired,
			locale: React.PropTypes.string
		};

		return Element;
	}
}

var l20n = new L20n

export default l20n