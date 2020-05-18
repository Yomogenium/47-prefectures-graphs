
	document.body.appendChild(document.createElement('header'));

	const main = document.createElement('main');
	main.className = 'content';
	document.body.appendChild(main);


	// header
	const header = ReactDOM.render(
		<HeaderComponent />,
		document.querySelector('header')
	);

	// ContentArea
	var ssss = ReactDOM.render(
		<ContentAreaComponent />,
		document.querySelector('main')
	);

	console.log(ssss);
