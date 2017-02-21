import 'babel-polyfill'
import express from 'express';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const app = express();

app.get('/', function (req, res) {
	let Html = require('./html').default;
	let componentHTML = renderToStaticMarkup(<Html />);
	res.end(`<!DOCTYPE html>${componentHTML}`);
});
app.use(express.static('builds'));

export default app;