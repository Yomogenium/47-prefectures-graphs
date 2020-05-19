
	/* APIからデータ取得 */
	function PullApiData(apiurl){
		return new Promise(function(resolve, reject){
			const apikey = 'Rdj12wQTJR5qA5QihOp1lfMvgvPlrOAcbpsXBzRZ';
			
			/* リクエストの設定 */
			let request = new XMLHttpRequest();
			request.open("GET", apiurl);
			request.setRequestHeader('X-API-KEY', apikey);

			/* 成功時 */
			request.addEventListener('load', function(){
				const result = JSON.parse(this.response);
				resolve(result);
			}, false);

			request.addEventListener('error', function(){
				reject(0); /* Request error. */
			}, false);

			request.addEventListener('timeout', function(){
				reject(1); /* Request timeout. */
			}, false);

			request.send();
		});
	}

	function CheckButton(data){
		return (
			<label className='pref_cell'>
				<input type='checkbox' name={data.prefCode} checked={data.check} />{data.prefName}
			</label>
		);
	}


	// ヘッダー
	class HeaderComponent extends React.Component {
		constructor(props){
			super(props);
			this.state = {
				title: document.querySelector('title').innerHTML,
			}
		}
		render (){
			return <h1>{this.state.title}</h1>;
		}
	}

	// 本体部分生成
	class ContentAreaComponent extends React.Component {
		constructor(props){
			super(props);
			this.state = {
				checked_pref: [1, 40, 31, 2],
			}
		}

		render() {
			return (
				<div className="contents">
					<h2>都道府県</h2>
					<PrefList />
					<Graph pref={this.state.checked_pref} />
				</div>
			);
		}
	}

	class PrefList extends React.Component {
		constructor(props){
			super(props);
			this.state = {
				waitmode: 0,
				prefdata: false,
				errormessage: '',
			}
		}

		async componentDidMount() {
			this.setState({ waitmode: 0 });
			try {
				let data = await PullApiData('https://opendata.resas-portal.go.jp/api/v1/prefectures');
				this.setState({
					waitmode: 1,
					prefdata: data,
				});
			}catch(e) {
				this.setState({
					waitmode: 2,
					errormessage: 'error',
				});
			}
		}

		render() {
			if(this.state.waitmode === 0) {
				return <p className="loading">Please wait...</p>;

			}else if(this.state.waitmode === 1) {
				let list = this.state.prefdata.result;
				console.log(list);

				return 1;

			}else if(this.state.waitmode === 2) {
				return <p className="error">{this.state.errormessage}</p>;
			}
		}
	}

	class Graph extends React.Component {
		constructor(props){
			super(props);
			this.state = {
				prefs: this.props.pref,
			}
		}

		render() {
			if(this.state.prefs.length === 0){
				console.log('arima sen');
				return 'arima sen';
			}else{
				console.log('arima su');
				return 'arima su';
			}
		}
	}



