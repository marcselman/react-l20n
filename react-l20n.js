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
	get(key, props, locale = this.defaultLocale)
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
		var [ message, errors2 ] = ctx.format(template, props);

		return message
			.replace(String.fromCharCode(8296), '')
			.replace(String.fromCharCode(8297), '');
	}
}

export default new L20n()