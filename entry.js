import React from 'react'
import L20n, { L20nElement } from './src/react-l20n'
import Label from './components/label'

L20n.defaultLocale = 'nl'
L20n.fallbackToDefault = true;

L20n.load('nl', require('./locales/nl-NL.ftl'))
//L20n.load('en', require('./locales/en-US.ftl'))
L20n.load('fr', `
product-name	= MarktfeedFR
hello			= Bonjoir, World!
`)

export default class Entry extends React.Component
{
	switchLocale() {
		console.info(this.element.value)
		L20n.defaultLocale = 'fr'
		this.forceUpdate()
	}
	render() {
		return (
			<div>
				<h1>App { L20n.get('product-name') }</h1>
				<h2>{ L20n.get('people', { count: 2 }, 'fr') }</h2>
				<button ref="ja" onClick={ () => this.switchLocale() }>Switch</button>
				<span>{ L20n.get('long-desc') }</span>
				<div>{ L20n.get('hello') }</div>

				<L20nElement onChange={ () => this.forceUpdate() } id="login-input" elementRef={ (e) => { this.element = e } } renderAs="input" />
			</div>
		)
	}
};