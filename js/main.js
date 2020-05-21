
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
		return <p className="loading">お待ちください...</p>;
	}

	function ErrorDOM(props){
		return <p className="error">{props.message}</p>;
	}

	function ConvertToDOMList(props){
		const result = props.prefs.map(value =>
									<li key={value.prefCode}>
										<label>
											<input type='checkbox' name={value.prefCode} onChange={props.handle} />
											{value.prefName}
										</label>
									</li>);
		return <ul className='preflist'>{result}</ul>;
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
		}

		render() {
			return (
				<div className="contents">
					<h2>都道府県</h2>
					<PrefList />
				</div>
			);
		}
	}

	// 都道府県リストの管理
	class PrefList extends React.Component {
		constructor(props){
			super(props);
			this.state = {
				wait: 0,
				list_data: [],
				check_n: null,
				check_b: false,
			};
			this.handleClick = this.handleClick.bind(this);
		}

		handleClick(event) {
			this.setState({
						check_n: event.target.getAttribute('name'),
						check_b: event.target.checked,
			});
		}

		async componentDidMount() {
			this.setState({ wait: 1 });
			try {
				const data = await PullApiData('https://opendata.resas-portal.go.jp/api/v1/prefectures');
				this.setState({
					list_data: data.result,
					wait: 2,
				});
			}catch(e) {
				this.setState({
					wait: 3,
				});
			}
		}

		render() {
			if(this.state.wait === 0) {
				return null;
			}
			if(this.state.wait === 1) {
				return <LoadDOM />;

			}else if(this.state.wait === 2) {

				return (
						<section>
							<ConvertToDOMList prefs={this.state.list_data} handle={this.handleClick} />
							<Graph prefs={this.state.list_data} number={this.state.check_n} check={this.state.check_b} />
						</section>
				);

			}else if(this.state.wait === 3) {
				return <ErrorDOM message='エラーが発生しました。' />;
			}
		}
	}

	class Graph extends React.Component {
		constructor(props){
			super(props);
			this.state = {
				wait: 0,
				gotdata: [],
			};
		}

		// highchart格納用のデータリスト
		initForHighcharts() {
			return {
				title: {text: '人口数の変遷 2010-2016'},
				subtitle: {text: 'Source: https://opendata.resas-portal.go.jp/'},
				yAxis: {title: {align: 'high', rotation: 0, y: -30, offset: 0, text: '人口数'}},
				xAxis: {title: {text: '年度', align: 'high', x: 40}},
				legend: {layout: '', align: 'right', verticalAlign: 'middle'},
				plotOptions: {series: {label: {connectorAllowed: false }, pointStart: 2010}},
				series: [], // ここに各県の人口データが入ります
				responsive: {
						rules: [{
							condition: {maxWidth: 500},
							chartOptions: {legend: {layout: 'horizontal', align: 'center', verticalAlign: 'bottom'}}
							}]
						},
			};
		}


/*
		Check(number, check) {

			const current = this.state.gotdata;


			if(check && Object.keys(current).indexOf(number) === -1){
				console.log('add');
			}else if(!check && Object.keys(current).indexOf(number) !== -1){
				console.log('delete');


				this.setState({
					gotdata: this.state.gotdata,
				});


			}
		}

*/


		async addData(num, preflist) {
			if(num){

				num = Number(num);

				// API
				const apiurl = 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear';
				const fromAPI = PullApiData(apiurl + '?prefCode=' + num); 

				// 都道府県名
				const targetpref = preflist.find(value => value.prefCode == num);

				// ※総人口のみ抽出
				let population_data = await fromAPI;
				population_data = population_data.result.data.find(value => value.label == '総人口');

				let obj = {
					code: num,
					name: targetpref.prefName,
					popdata: population_data,
				};

				this.state.gotdata.push(obj);
				console.log(this.state.gotdata);

			}
		}




		pullData () {}


		render() {

			console.log(this.props.check);

			this.addData(this.props.number, this.props.prefs);


			// console.log(this.props.prefs);


			var sss = this.initForHighcharts();


			return <div id='grapharea'>this.props.check</div>;
		}
	}



	class GGGG extends React.Component {
		constructor(props){
			super(props);
			this.state = {
				wait: 0,



				senddata: 0,
	
				selected_pref: this.props.pref,
				populationdata: [],
			}
		}

/*
		updatePrefList(object){

			// let asyncdata;
			// const api_url = 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear';


			let a;
			this.setState({ preflist: object.result });
		}



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



