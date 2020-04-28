import React from 'react';
import ReactDOM from 'react-dom';
import Contest from './Contest' ;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
        
//       </header>
//     </div>
//   );
// }

class App extends React.Component{

    constructor(){
      super()
      this.state = {
        contest:true,
        problems: false,
        users: false,
        loading: true,
        character: "",
        contest_category: "all"
      }
      this.handleContest = this.handleContest.bind(this)
      this.handleProblems = this.handleProblems.bind(this)
      this.handleUsers = this.handleUsers.bind(this)
      this.handleContestAll = this.handleContestAll.bind(this)
      this.handleDiv1 = this.handleDiv1.bind(this)
      this.handleDiv2 = this.handleDiv2.bind(this)
      this.handleDiv3 = this.handleDiv3.bind(this)
      this.handleEducational = this.handleEducational.bind(this)
      this.handleOthers = this.handleOthers.bind(this)
    }

    componentDidMount(){
      fetch("https://codeforces.com/api/contest.list")
      .then(response => response.json())
      .then(data => {
        this.setState({
          loading: false,
          character: data
        })
      })
    }

    handleContest() {
      this.setState({contest:true,problems:false,users:false, loading:false})
      console.log(this.state.contest + " " + this.state.problems + " " + this.state.users)
    }

    handleProblems(){
      this.setState({contest:false,problems:true,users:false,  loading:false})
      console.log(this.state.contest + " " + this.state.problems + " " + this.state.users)
    }

    handleUsers(){
      this.setState({contest:false,problems:false,users:true,  loading:false})
      console.log(this.state.contest + " " + this.state.problems + " " + this.state.users)
    }

    handleContestAll(){
      this.setState({
        contest_category:"all"})
    }

    handleDiv1(){
      this.setState({
        contest_category:"Div. 1"})

    }

    handleDiv2(){
      this.setState({
        contest_category:"Div. 2"})
    }

    handleDiv3(){
      this.setState({
        contest_category:"Div. 3"})
    }

    handleEducational(){
      this.setState({
        contest_category:"Educational Codeforces Round"})
    }

    handleOthers(){
      this.setState({
        contest_category:"others"})
    }

    render() {
      const text = this.state.loading ? "loading..." : ""

      //let contest_list_json = this.state.character.result

      //console.log(contest_list_json[0].id)
      const contest_list = this.state.loading ? "" : 
      this.state.character.result.map(item => item.phase=== "FINISHED" && (this.state.contest_category === "all" || 
      (this.state.contest_category==="others" && item.name.includes("Div. 1") === false && item.name.includes("Div. 2")===false && item.name.includes("Div. 3")===false && item.name.includes("Educational Codeforces Round")===false) || 
      item.name.includes(this.state.contest_category))
      ?
      <Contest 
      key={item.id} 
      item={item} 
      contest_category={this.state.contest_category}
      /> : null)

      return(
          <div>
            <div className="sidenav">
            <a href="#contests" onClick={this.handleContest}>Contests</a>
            <a href="#problems" onClick={this.handleProblems}>Problems</a>
            <a href="#users" onClick={this.handleUsers}>Users</a>
            </div>


            <div className="main">
              <div>{text}</div>
              {this.state.contest === true ? 
              <div>
              <ul>
                <li><a href="#all" onClick={this.handleContestAll}>ALL</a></li>
                <li><a href="#div1" onClick={this.handleDiv1}>Div.1</a></li>
                <li><a href="#div2" onClick={this.handleDiv2}>Div.2</a></li>
                <li><a href="#div3" onClick={this.handleDiv3}>Div.3</a></li>
                <li><a href="#educational" onClick={this.handleEducational}>Educational Round</a></li>
                <li><a href="#others" onClick={this.handleOthers}>Others</a></li>
              </ul>
              <div style={{paddingTop:50}}>{contest_list}</div>
              </div>
              : 
              null}
            </div>
          </div>
      )
    }

}

export default App;
