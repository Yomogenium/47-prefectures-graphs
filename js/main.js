
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

	function LoadDOM(){
		return <p className="loading">Please wait...</p>;
	}

	// エラー
	function ErrorDOM(props){
		return <p className="error">{props.message}</p>;
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
					


				checked_list: [],
				apidata: [],
				graph: [],
				population_data: [
					// {name: 'Installation', data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]}

				],
				preflist: [
					// {code: 0, name: 'Installation', data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]}
				],
			}
		}

		async componentDidMount() {}



		updatePrefList(object){

			// let asyncdata;
			// const api_url = 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear';


			let a;
			this.setState({ preflist: object.result });
		}

		updatePoplations(number, check) {
			if(check && this.state.checked_list.indexOf(number) === -1){
				this.state.checked_list.push(number);
			}else if(!check){
				this.state.checked_list = this.state.checked_list.filter(function(v) {return v != number});
			}
		}

		render() {
			return (
				<div className="contents">
					<h2>都道府県</h2>
					<PrefList waitmode='0' updatePrefs={this.updatePrefList.bind(this)} updatePops={this.updatePoplations.bind(this)} />
					<Graph waitmode='0' />

				</div>
			);
		}
	}

	// 

	class PrefList extends React.Component {
		constructor(props){
			super(props);
			this.state = {
				waitmode: 0,
				parantdata: null,
			};
			this.handleClick = this.handleClick.bind(this);
		}
		
		handleClick(event) {
			this.props.updatePops(event.target.getAttribute('name'), event.target.checked);
		}

		update(data) {
			console.log(data);
		}

		async componentDidMount() {
			this.setState({ waitmode: 1 });
			try {
				let data = await PullApiData('https://opendata.resas-portal.go.jp/api/v1/prefectures');
				this.props.updatePrefs(data);
				this.setState({
					parantdata: data.result,
					waitmode: 2,
				});

			}catch(e) {
				this.setState({
					waitmode: 3,
				});
			}
		}

		render() {
			if(this.state.waitmode === 0) {
				return null;
			}
			if(this.state.waitmode === 1) {
				return <LoadDOM />;

			}else if(this.state.waitmode === 2) {

				let list = this.state.parantdata;
				list = list.map(data => 
						<li key={data.prefCode}>
							<label>
								<input type='checkbox' name={data.prefCode} onChange={this.handleClick} />
								{data.prefName}
							</label>
						</li>
				);

				return <ul className='preflist'>{list}</ul>;

			}else if(this.state.waitmode === 3) {
				return <ErrorDOM message='error' />;
			}
		}
	}

	class Graph extends React.Component {
		constructor(props){
			super(props);
			this.state = {
				waitmode: 0,
				errormessage: '',
				selected_pref: this.props.pref,
				populationdata: [],
			}
		}



/*
		componentWillReceiveProps() {}
*/


/*
		async componentDidMount() {

			if(this.state.selected_pref){
				this.setState({ waitmode: 1 });
				const api_url = 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear';
				const selecteds = this.state.selected_pref;

				console.log(selecteds);

				let resultlist;

				let waitpoint = {};


				try {
					for(let value of selecteds){
						console.log(await PullApiData(api_url + '?prefCode=' + value));

						// resultlist.push();
					}
					console.log(resultlist);

				

									this.setState({
					waitmode: 1,
					prefdata: data,
				});




				}catch(e) {
					this.setState({
						waitmode: 3,
						errormessage: 'error',
					});
				}
			}
		}
*/

		render() {
			if(this.state.waitmode === 0){
				return null;
			}else if(this.state.waitmode === 1){
				return <LoadDOM />;

			}else if(this.state.waitmode === 2){
				return (<div className="graph_container"><div id="graph">graph!</div></div>);
			}else if(this.state.waitmode === 3){
				return <ErrorDOM message={this.state.errormessage} />;
			}
		}
	}



