import React from 'react'
import L20n from './react-l20n'
import Label from './components/label'

L20n.defaultLocale = 'nl'
L20n.fallbackToDefault = false;

L20n.load('nl', require('./locales/nl-NL.ftl'))
L20n.load('en', require('./locales/en-US.ftl'))

export default class Entry extends React.Component
{
	render() {
		return (
			<div>
				<h1>App { L20n.get('product-name') }</h1>
				<h2>{ L20n.get('people', { count: 1 }, 'fr') }</h2>
				<Label />
			</div>
		)
	}
};