
	document.body.appendChild(document.createElement('header'));
	document.body.appendChild(document.createElement('main'));

	// header
	const header = ReactDOM.render(
		<HeaderComponent />,
		document.querySelector('header')
	);

	// ContentArea
	ReactDOM.render(
		<ContentAreaComponent />,
		document.querySelector('main')
	);
