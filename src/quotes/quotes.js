import "./quotes.scss";
import React,{Component} from 'react';

class quotes extends Component {
    constructor(props){
        super(props);

        this.state={
            headerText:'Welcome to Miphy !!',
            writer: 'A place where you connect with your soul'
            
        }
    }
    componentDidMount(){
      let array = ["Whenever you find yourself doubting how far you can go, just remember how far you have come.","It’s hard to beat a person who never gives up.", "If one suffers we all suffer. Togetherness is strength. Courage.",
       "If opportunity doesn’t knock, build a door.","Don’t limit your challenges. Challenge your limits.","In the middle of every difficulty lies opportunity."
      ,"Start where you are. Use what you have. Do what you can.","Good. Better. Best. Never let it rest. ‘Til your good is better and your better is best."],
          intervalDurationMs = 30000,
          currentIndex = 0,
          maxNumTimes = -1,
          numTimesRan = 0;
          let warray = ["Anonymous","Babe Ruth", "Jean-Bertrand Aristide", "Kurt Cobain","Anonymous","Albert Einstein","Arthur Ashe","St. Jerome."];
          
      let interval = setInterval(function() {
          if (maxNumTimes !== 0) {
              this.setState({
                  headerText: array[currentIndex],
                  writer: warray[currentIndex]
              });
              currentIndex++;
              if (currentIndex > array.length-1) {
                  if (maxNumTimes === -1) {
                      currentIndex = 0;
                  } else {
                      numTimesRan++;
                      if (numTimesRan === maxNumTimes) {
                          clearInterval(interval);
                      } else {
                          currentIndex = 0;
                      }
                  }
              }
          } else {
              clearInterval(interval);
          }
      }.bind(this), intervalDurationMs);
    }
    render(){
        return(
          <div className="incoming">
          <p>"{this.state.headerText}"</p>
          <div className="name">~{this.state.writer}</div>
        </div>
        )
    }
}

export default quotes;