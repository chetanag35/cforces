import React from 'react';
import ReactDOM from 'react-dom';
import Contest from './Contest' ;
import RatingChanges from './RatingChanges'
import ProblemsList from './ProblemList'

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
        contest:false,
        problems: false,
        users: false,
        loading: true,
        character: "",
        contest_category: "all",
        user1:"",
        user1_data:"",
        user1_contest:null,
        user2:"",
        user2_data:"",
        user2_contest:"",
        problem_tags:"2-sat",
        problems_result:""
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
      this.handleUser1 = this.handleUser1.bind(this)
      this.handleChangeInput = this.handleChangeInput.bind(this)
      this.handleUser2 = this.handleUser2.bind(this)
      this.getContestList1 = this.getContestList1.bind(this)
      this.getContestList2 = this.getContestList2.bind(this)
      this.handleTags = this.handleTags.bind(this)
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

    handleUser1(){
      this.setState({loading:true})

      Promise.all([
        fetch("https://codeforces.com/api/user.info?handles=" + this.state.user1).then(value => value.json()),
        fetch("https://codeforces.com/api/user.rating?handle=" + this.state.user1).then(value => value.json())
      ]).then((data)=>{
        this.setState({
          user1_contest:data[1],
          user1_data:data[0],
          loading:false
        })
    })
    }

    handleUser2(){
      this.setState({loading:true})

      Promise.all([
        fetch("https://codeforces.com/api/user.info?handles=" + this.state.user2).then(response => response.json()),
        fetch("https://codeforces.com/api/user.rating?handle=" + this.state.user2).then(response => response.json())
      ]).then((data) =>{
        this.setState({
          user2_contest:data[1],
          user2_data:data[0],
          loading:false
        })
      })
    }


    handleChangeInput(event) {
      const {name, value, type, checked} = event.target
      type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
  }

  handleTags(){

      this.setState({loading:true})

      fetch("https://codeforces.com/api/problemset.problems?tags=" + this.state.problem_tags)
      .then(response => response.json())
      .then(data =>{
        this.setState({
          loading:false,
          problems_result:data
        })
      }
      )
  }

    getContestList1(){
  
      return (
        this.state.user1_contest.result.map(item =>
          <RatingChanges 
          key={item.contestId} 
          item={item}
          />)
      )
    }

    getContestList2(){

      return (
        this.state.user2_contest.result.map(item =>
          <RatingChanges 
          key={item.contestId} 
          item={item}
          />)
      )

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

  
      //const user1_contest_list = (this.state.loading === false && this.state.user1_contest)? 
      // this.state.user1_contest.result.map(item =>
      //    <RatingChanges 
      //    key={item.contestId} 
      //    item={item}
      //    />):null
    

      return(
          <div>
            <div className="sidenav">
            <a href="#contests" onClick={this.handleContest}>Contests</a>
            <a href="#problems" onClick={this.handleProblems}>Problems</a>
            <a href="#users" onClick={this.handleUsers}>Users</a>
            </div>


            <div className="main">
              <div>{text}</div>
              {this.state.contest === true && this.state.loading === false? 
              <div>
              <ul style={{position:"fixed",verticalAlign:"middle"}}>
                <li><a href="#all" onClick={this.handleContestAll}>ALL</a></li>
                <li><a href="#div1" onClick={this.handleDiv1}>Div.1</a></li>
                <li><a href="#div2" onClick={this.handleDiv2}>Div.2</a></li>
                <li><a href="#div3" onClick={this.handleDiv3}>Div.3</a></li>
                <li><a href="#educational" onClick={this.handleEducational}>Educational Round</a></li>
                <li><a href="#others" onClick={this.handleOthers}>Others</a></li>
              </ul>
              <div style={{paddingTop:50}}>{contest_list}</div>
              </div>
              : (this.state.users === true && this.state.loading === false ?
                <div className="main">
                  <div>{text}</div>
            
              
            <div >
              <div>
              <h2>  Search users: </h2>
              <input type="text" name="user1" placeholder="Enter User1 handle" value={this.state.user1} onChange={this.handleChangeInput}></input>
              <button className="button" onClick={this.handleUser1}>Search User</button>
              {this.state.user1_data === ""? null:
              (this.state.user1_data.result? <div>
            <p>
              handle:
              {this.state.user1_data.result[0].handle}
            </p>
            <p>Name : {this.state.user1_data.result[0].firstName + " " + 
            this.state.user1_data.result[0].lastName}</p>
            <p>
              Country:
              {this.state.user1_data.result[0].country}
            </p>
            <p>
              City:
              {this.state.user1_data.result[0].city}
            </p>
            <p>
              Rating:
              {this.state.user1_data.result[0].rating + "(" + this.state.user1_data.result[0].rank + ")"} 
            </p>
            <p>
              Max Rating:
              {this.state.user1_data.result[0].maxRating + "(" + this.state.user1_data.result[0].maxRank + ")"}
            </p>
            <p>
              Friends:
              {this.state.user1_data.result[0].friendOfCount}
            </p>
            <p>
                Rating Changes:
                {this.getContestList1()}
            </p> 
            </div>: (<h1 style={{float:"right"}}>Invalid Usernames
              </h1>) )}
            </div>
            </div>

            
              
            <div>
              <div>
              <h2>  Search users: </h2>
              <input type="text" name="user2" placeholder="Enter User 2 handle" value={this.state.user2} onChange={this.handleChangeInput}></input>
              <button className="button" onClick={this.handleUser2}>Search User</button>
              {this.state.user2_data === ""? null:
              <div>
            <p>
              handle:
              {this.state.user2_data.result[0].handle}
            </p>
            <p>Name : {this.state.user2_data.result[0].firstName + " " + 
            this.state.user2_data.result[0].lastName}</p>
            <p>
              Country:
              {this.state.user2_data.result[0].country}
            </p>
            <p>
              City:
              {this.state.user2_data.result[0].city}
            </p>
            <p>
              Rating:
              {this.state.user2_data.result[0].rating + "(" + this.state.user2_data.result[0].rank + ")"} 
            </p>
            <p>
              Max Rating:
              {this.state.user2_data.result[0].maxRating + "(" + this.state.user2_data.result[0].maxRank + ")"}
            </p>
            <p>
              Friends:
              {this.state.user2_data.result[0].friendOfCount}
            </p>
            <p>
              Rating Changes:
              {this.getContestList2()}
            </p>
            </div>}
            </div>
            </div>




            </div>
            : this.state.loading? <div>{text}</div> :(this.state.problems === true && this.state.loading === false?
              <div className ="main">
                <label>Select problem tags:</label>
              <select
                value={this.state.problem_tags}
                onChange={this.handleChangeInput}
                name="problem_tags"
                style ={{padding:"5px",margin:"5px"}}
              >
                <option value="2-sat">2-sat</option>
                <option value="binary search">binary search</option>
                <option value="bitmasks">bitmasks</option>
                <option value="brute force">brute force</option>
                <option value="chinese remainder theorem">chinese remainder theorem</option>
                <option value="combinatorics">combinatorics</option>
                <option value="constructive algorithms">constructive algorithms</option>
                <option value="data structures">data structures</option>
                <option value="dfs and similar">dfs and similar</option>
                <option value="divide and conquer">divide and conquer</option>
                <option value="dp">dp</option>
                <option value="dsu">dsu</option>
                <option value="expression parsing">expression parsing</option>
                <option value="ffft">ffft</option>
                <option value="flows">flows</option>
                <option value="games">games</option>
                <option value="geometry">geometry</option>
                <option value="graph matching">graph matching</option>
                <option value="graphs">graphs</option>
                <option value="greedy">greedy</option>
                <option value="hashing">hashing</option>
                <option value="implementation">implementation</option>
                <option value="interactive">interactive</option>
                <option value="math">math</option>
                <option value="matrices">matrices</option>
                <option value="meet-in-the-middle">meet-in-the-middle</option>
                <option value="number theory">number theory</option>
                <option value="probabilities">probabilities</option>
                <option value="schedules">schedules</option>
                <option value="shortest paths">shortest paths</option>
                <option value="sortings">sortings</option>
                <option value="string suffix structures">string suffix structures</option>
                <option value="strings">strings</option>
                <option value="ternary search">ternary search</option>
                <option value="trees">trees</option>
                <option value="two pointers">two pointers</option>
              </select>

              <button className="button" onClick={this.handleTags}>Search Problems</button>
              <div>

              {this.state.problems_result.status ? 
              
              this.state.problems_result.result.problems.map(item => (
              <ProblemsList 
                key={item.contestId,item.index}
                item = {item}
              /> ))
              
              :null}

              </div>

                </div>
              :null))}
          
          </div>
        </div>
      )
    }

}

export default App;
