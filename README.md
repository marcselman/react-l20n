# react-l20n-u
Mozilla's L20n localization framework for React

## Getting Started:

### Install it from [npm](http://www.npmjs.org):
`npm i react-l20n-u`

### Use it in your React App:

```js
import L20n from 'react-l20n-u';

// Load an ftl file with localization string
L20n.load('en', require('./locales/en-US.ftl'))
// Or load localization string inline
L20n.load('fr', `
product-name	= React L20n
messages		= {$count} messages
login-input		= Predefined value
	[html/placeholder]		example@email.com
	[html/aria-label]		Login input value
	[html/title]			Type your login email
`)

// Use L20n.get to retrieve localized strings by key
<div>
	<h1>Product name: { L20n.get('product-name') }</h1>
	<h2>Message count: { L20n.get('messages', { count: 2 }) }</h2>
</div>

// Or use the L20n.Component React component to render HTML elements
<div>
	<L20n.Element id="login-input" renderAs="input" />
</div>
```

## Options

### defaultLocale (string)
The default language used to retrieve localized strings.
Sample: `L20n.defaultLocale = 'nl'`

### fallbackToDefault (bool)
Determines whether to use the default locale if the requested locale could not be found
Sample: `L20n.fallbackToDefault = true`