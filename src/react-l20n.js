// react-l20n.js
// version: 0.0.11
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

		// By dependency l20n@4.0.0-beta.1; ctx.format() may return other types than
        // the object expected, so no parameters message, errors can be extracted.
        // This will intercept the attempt by checking if only a string was passed,
        // returning it the usual way.
        if (!template)
            return undefined;
		else if (props === null && typeof template === "string")
		    return this.stripFromBlacklistedChars(template);

        var [ message, errors ] = ctx.format(template, props);

		if (errors.length > 0) {
			return undefined;
		}

		return this.stripFromBlacklistedChars(message);
	}
	/*
	    Since there are now two call, I made it a member function.
	 */
    stripFromBlacklistedChars(message)
    {
        const blacklistedCharCodes = [8296, 8297]; // What are these chars? Cannot print them

        blacklistedCharCodes.forEach(charCode => {
            message = message.replace(String.fromCharCode(charCode), '')
        });

        return message;
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