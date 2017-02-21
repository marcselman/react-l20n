import React from 'react'
import { renderToString } from 'react-dom/server';
//import Entry from './entry'

export default () => (
	<html>
	<head>
		<meta httpEquiv="Content-type" content="text/html; charset=utf-8"/>
		<link href="/styles.css" rel="stylesheet" />
		<title>test</title>
	</head>
	<body>
		<div id="app" />
		<script type="application/javascript" src="/bundle.js"></script>
	</body>
	</html>
);