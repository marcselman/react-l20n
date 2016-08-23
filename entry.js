import React from 'react'
import L20n from './react-l20n'
import Label from './components/label'

L20n.defaultLocale = 'nl'
L20n.fallbackToDefault = true;

L20n.load('nl', require('./locales/nl-NL.ftl'))
L20n.load('en', require('./locales/en-US.ftl'))
L20n.load('fr', `
product-name	= MarktfeedFR
hello			= Bonjoir, World!
`)

export default class Entry extends React.Component
{
	switchLocale() {
		L20n.defaultLocale = 'fr'
		this.forceUpdate()
	}
	render() {
		return (
			<div>
				<L20n.Element id="login-input" renderAs="p">
					{ L20n.get('product-name') }
				</L20n.Element>
				<h1>App { L20n.get('product-name') }</h1>
				<h2>{ L20n.get('people', { count: 1 }, 'fr') }</h2>
				<Label />
				<button onClick={ () => this.switchLocale() }>Switch</button>

				<L20n.Element id="login-input" renderAs="input" />
			</div>
		)
	}
};