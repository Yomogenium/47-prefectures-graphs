
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

	// ヘッダー
	class HeaderComponent extends React.Component {
		constructor(props){
			super(props);
			this.startname = document.querySelector('title').innerHTML;
		}
		render (){
			return <h1>{this.startname}</h1>;
		}
	}

	// <ul className="preflist"></ul>

	// 本体部分生成
	class ContentAreaComponent extends React.Component {
		constructor(props){
			super(props);
			this.status = {
				checked_prefs_list: [],
			};
		}

		render() {
		/*
			if(this.status.checked_prefs_list){
				// aaa
			}
			*/

			return <div>zzz...</div>;
		}
	}



	




/*

	assb2();
*/


	async function assb2(){
		var ab = 13;
		var ass = await PullApiData('https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=' + ab );
		console.log(ass);
	}






/*

class CommentBox extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="commentBox">
        {this.props.hello}! I am a {this.props.name}.
      </div>
    );
  }
}

ReactDOM.render(
  <CommentBox hello="Hello, world" name="CommentBox" />,
  document.querySelector('main')
)

*/