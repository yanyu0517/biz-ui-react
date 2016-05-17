import React from 'react';
import classNames from 'classnames';

import './button.css';

// const Button = (props) => {let a = '';return <div>{props.children}</div>};

const Button = (props) => {
	let {theme, text, handleClick} = props;
	// let handleClick = e => {
	// 	if(handleClick) {
	// 		props.handleClick(e);
	// 	}
	// };
	let klass = classNames('biz-button', theme);
	return (
		<button
	 		type="button"
	 		className={klass}
	 		onClick={ e => handleClick(e)}>
	 		{text}
	 	</button>);
}

Button.propTypes = {
	text: React.PropTypes.string,
	handleClick: React.PropTypes.func,
	theme: React.PropTypes.string
}

Button.defaultProps = {
	text: '确定',
	handleClick() {},
	theme: ''
}

export default Button;

