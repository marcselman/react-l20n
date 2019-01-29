# react-l20n-u
Mozilla's L20n localization framework for React
Universal (isomorphic) works in Node (server) and Webpack (client).

The l20n module dependancy uses default parameter value so using Node v6+ is recommended.
If you see an error like `SyntaxError: Unexpected token =` try updating to Node v6+. 

## Getting Started:

### Install it from [npm](http://www.npmjs.org):
`npm i react-l20n-u`

### Use it in your React App:

```js
import L20n, { L20nElement } from 'react-l20n-u';

// Load an ftl file with localization string
L20n.load('en', require('./locales/en-US.ftl'))
// Or load localization string inline
L20n.load('fr', `
product-name	= React L20n
messages		= {$count} messages
login-input		= Default value
	[html/placeholder]		example@email.com
	[html/aria-label]		Login input value
	[html/title]			Type your login email
`)

// Use L20n.get to retrieve localized strings by key
<div>
	<h1>Product name: { L20n.get('product-name') }</h1>
	<h2>Message count: { L20n.get('messages', { count: 2 }) }</h2>
</div>

// Or use the L20nElement React component to render HTML elements
<div>
	<L20nElement id="login-input" renderAs="input" />
</div>
```

## Universal (isomorphic) support

```js
// To load (require) ftl files with webpack use [raw-loader](https://github.com/webpack/raw-loader)
loaders: [
	{
		test: /\.ftl?$/,
		loader: 'raw-loader',
		exclude: /node_modules/
	}
]

// To load (require) ftl files in node add the ftl extension
require.extensions['.ftl'] = function(module, filename) {
	var content = fs.readFileSync(filename, 'utf8');
	module.exports = content;
};
```

## Methods

### load(locale, ftl)
Load localized text strings from an ftl string.
User require to load from an ftl file (see Universal support above). 

### get(key, props, locale)
Get a localized text by key.
The returned value is a React Fragment element.
HTML tags in your text will be rendered as HTML.
Optionally pass some properties or an explicit locale.
If no locale is given the default will be used. 

### getRaw(key, props, locale)
Get a localized text by key.
The returned value is a string.
HTML tags in your text will be rendered as text.
Optionally pass some properties or an explicit locale.
If no locale is given the default will be used. 

## Options

### defaultLocale (string)
The default language used to retrieve localized strings.
Sample: `L20n.defaultLocale = 'nl'`

### fallbackToDefault (bool)
Determines whether to use the default locale if the requested locale could not be found
Sample: `L20n.fallbackToDefault = true`