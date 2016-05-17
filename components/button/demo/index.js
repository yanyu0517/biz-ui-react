import 'jquery';

import React from 'react';
import ReactDom from 'react-dom';
import Button from '../button.jsx';

ReactDom.render(<Button />, document.getElementById('button-container'));

$('#normal').click(function(){
	ReactDom.render(<Button />, document.getElementById('button-container'));
})

$('#disabled').click(function(){
	ReactDom.render(<Button theme="biz-button-disable"/>, document.getElementById('button-container'));
})

$('#dark').click(function(){
	ReactDom.render(<Button theme="biz-button-dark"/>, document.getElementById('button-container'));
})

$('#click').click(function(){
	ReactDom.render(<Button handleClick={ (e) => {let disable = "abc";alert(disable);}}/>, document.getElementById('button-container'));
})

$('#changeText').blur(function(e){
	ReactDom.render(<Button text={$.trim($(e.target).val())} />, document.getElementById('button-container'));
})