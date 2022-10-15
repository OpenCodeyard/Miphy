import "./musicchat.scss";
import React from "react";
import play from "./play.png";
import next from "./next.png";
import stop from "./stop.png";
import prev from "./prev.png";
//gets the data from the action object and reducers defined earlier


class CardProfile extends React.Component {
  state = {
    index: 3,
    currentTime: '0:00',
    musicList: [{name:'Autumn Sky', author: 'NaturesEye', img: 'https://unsplash.com/photos/JhxGkGgd3Sw/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MjF8fGF1dHVtbnx8MHx8fHwxNjM1NTc4MzIz&force=true', audio:'https://cdn.pixabay.com/download/audio/2021/08/23/audio_dfbee010eb.mp3?filename=autumn-sky-meditation-7618.mp3', duration: '16:14'}, 
      {name:'Gentle Piano', author: 'NaturesEye', img: 'https://unsplash.com/photos/sTxnxL4O2AA/download?force=true', audio:'https://cdn.pixabay.com/download/audio/2021/10/21/audio_8b8b6deb1f.mp3?filename=gentle-piano-meditation-9692.mp3', duration: '15:20'},
      {name:'Soft Meditation', author: 'TattoedPreacher', img: 'https://unsplash.com/photos/0tTA6cewPr8/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTI2fHxtZWRpdGF0aW9ufGVufDB8fHx8MTYzNTU3NzY4OQ&force=true', audio:'https://cdn.pixabay.com/download/audio/2021/04/07/audio_287a1d6490.mp3?filename=soft-meditation-3788.mp3', duration: '6:15'},
      {name:'Rain Forest', author: 'NaturesEye', img: 'https://unsplash.com/photos/efm0EirfOBQ/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Nnx8cmFpbiUyMGZvcmVzdHx8MHx8fHwxNjM1NTc3NDEz&force=true', audio:'https://cdn.pixabay.com/download/audio/2020/12/30/audio_31b7f16d46.mp3?filename=rain-forest-sleep-yoga-meditation-relaxation-2044.mp3', duration: '10:04'},
      {name:'OM Namah Shivay', author: 'Fexplorer', img: 'https://unsplash.com/photos/Lajz1oXLhdo/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTF8fG9tfHwwfHx8fDE2MzU1NzczMTY&force=true', audio:'https://cdn.pixabay.com/download/audio/2021/10/02/audio_bceb145761.mp3?filename=om-namah-shivaya-108-times-chanting-432-hz-8940.mp3', duration: '5:05'},
      {name:'Ambient Music', author: 'TattoedPreacher', img: 'https://unsplash.com/photos/vHnVtLK8rCc/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8bWVkaXRhdGlvbnx8MHx8fHwxNjM1NTc2OTA2&force=true', audio:'https://cdn.pixabay.com/download/audio/2021/04/07/audio_c1c44e146d.mp3?filename=pleasing-meditation-3786.mp3', duration: '6:04'},
      {name:'Relaxing Music', author: 'Relaxing Time', img: 'https://unsplash.com/photos/mi7W_V4slxg/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8OXx8cmVsYXh8ZW58MHx8fHwxNjY1Nzc3NzE0&force=true', audio: 'https://cdn.pixabay.com/download/audio/2022/09/06/audio_eacbcf15ac.mp3?filename=relaxing-music-119247.mp3', duration: '22:04'},
      {name:'Endless by PrabajithK', author: 'MildRelaxation', img: 'https://unsplash.com/photos/m5oFzzrcKwc/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTd8fG1lbW9yeXxlbnwwfHx8fDE2NjU4MjYwMzU&force=true', audio: 'https://cdn.pixabay.com/download/audio/2022/09/03/audio_7e44a45464.mp3?filename=endless-by-prabajithk-118998.mp3', duration: '10:40'}],
    pause: false,
  };


 componentDidMount() {
   this.playerRef.addEventListener("timeupdate", this.timeUpdate, false);
   this.playerRef.addEventListener("ended", this.nextSong, false);
   this.timelineRef.addEventListener("click", this.changeCurrentTime, false);
   this.timelineRef.addEventListener("mousemove", this.hoverTimeLine, false);
   this.timelineRef.addEventListener("mouseout", this.resetTimeLine, false);
 }

  componentWillUnmount() {
    this.playerRef.removeEventListener("timeupdate", this.timeUpdate);
    this.playerRef.removeEventListener("ended", this.nextSong);
    this.timelineRef.removeEventListener("click", this.changeCurrentTime);
    this.timelineRef.removeEventListener("mousemove", this.hoverTimeLine);
    this.timelineRef.removeEventListener("mouseout", this.resetTimeLine);
  }

changeCurrentTime = (e) => {
  const duration = this.playerRef.duration;
  
  const playheadWidth = this.timelineRef.offsetWidth;
  const offsetWidht = this.timelineRef.offsetLeft;
  const userClickWidht = e.clientX - offsetWidht;
 
  const userClickWidhtInPercent = (userClickWidht*100)/playheadWidth;

  this.playheadRef.style.width = userClickWidhtInPercent + "%";
  this.playerRef.currentTime = (duration * userClickWidhtInPercent)/100;
}

hoverTimeLine = (e) => {
  const duration = this.playerRef.duration;
  
  const playheadWidth = this.timelineRef.offsetWidth
  
  const offsetWidht = this.timelineRef.offsetLeft;
  const userClickWidht = e.clientX - offsetWidht;
  const userClickWidhtInPercent = (userClickWidht*100)/playheadWidth;

  if(userClickWidhtInPercent <= 100){
    this.hoverPlayheadRef.style.width = userClickWidhtInPercent + "%";
  }
  
  const time = (duration * userClickWidhtInPercent)/100;
  
  if( (time >=0) && (time <= duration)){
    this.hoverPlayheadRef.dataset.content = this.formatTime(time);
  }
}

resetTimeLine = () => {
  this.hoverPlayheadRef.style.width = 0;
}

timeUpdate = () => {
  const duration = this.playerRef.duration;
  const timelineWidth = this.timelineRef.offsetWidth - this.playheadRef.offsetWidth;
  const playPercent = 100 * (this.playerRef.currentTime / duration);
	this.playheadRef.style.width = playPercent + "%";
  const currentTime = this.formatTime(parseInt(this.playerRef.currentTime));  
  this.setState({ 
    currentTime 
  });
}

formatTime = (currentTime) =>{
  const minutes = Math.floor(currentTime / 60);
  let seconds = Math.floor(currentTime % 60);

  seconds = (seconds >= 10) ? seconds : "0" + seconds % 60;
  
  const formatTime = minutes + ":" +  seconds
 
  return formatTime;
  }

  updatePlayer = () =>{
    const { musicList, index } = this.state;
    const currentSong = musicList[index];
    const audio = new Audio(currentSong.audio);
    this.playerRef.load();
  }
  
  nextSong = () => {
    const { musicList, index, pause } = this.state;
  
    this.setState({ 
      index: (index + 1) % musicList.length
    });
    this.updatePlayer();
    if(pause){
      this.playerRef.play();
    }
  };

  prevSong = () => {
    const { musicList, index, pause } = this.state;  
    
    this.setState({ 
      index: (index + musicList.length - 1) % musicList.length
    });
    this.updatePlayer();
    if(pause){
      this.playerRef.play();
    }
  };
   

  playOrPause = () =>{
    const { musicList, index, pause } = this.state;
    const currentSong = musicList[index];
    const audio = new Audio(currentSong.audio);
    if( !this.state.pause ){
      this.playerRef.play();
    }else{
      this.playerRef.pause();
    }
    this.setState({
      pause: !pause
    })
  }
  
  clickAudio = (key) =>{
    const { pause } = this.state;
    
    this.setState({
      index: key
    });
    
    this.updatePlayer();
    if(pause){
      this.playerRef.play();
    }
  }

  
  render() {
    const { musicList, index, currentTime, pause } = this.state;
    const currentSong = musicList[index];
    return (
      <div className="card">
        <div className="current-song">
          <audio ref={ref => this.playerRef = ref}>
            <source src={ currentSong.audio } type="audio/ogg"/>
              Your browser does not support the audio element.
          </audio>
          <div className="img-wrap">
            <img src={ currentSong.img }/>
           </div>
          <span className="song-name">{ currentSong.name }</span>
          <span className="song-autor">{ currentSong.author }</span>
          
          <div className="time">
            <div className="current-time">{ currentTime }</div>
            <div className="end-time">{ currentSong.duration }</div>
          </div>
          
          <div ref={ref => this.timelineRef = ref} id="timeline">
            <div ref={ref => this.playheadRef = ref} id="playhead"></div>
            <div ref={ref => this.hoverPlayheadRef = ref} class="hover-playhead" data-content="0:00"></div>
          </div>
          
          <div className="controls">
            <button onClick={this.prevSong} className="prev prev-next current-btn"><img src={prev} height={50} width={50} /></button>
            
            <button onClick={this.playOrPause} className="play current-btn">
              {
                (!pause) ? <img src={play} height={55} width={55} />
                :<img src={stop} height={55} width={55} />            }
            </button>
            <button onClick={this.nextSong} className="next prev-next current-btn"><img src={next} height={45} width={45} /></button>
          </div>
          
        </div>
        <div className="play-list" >
          {musicList.map( (music, key=0) =>
                         <div key={key} 
                           onClick={()=>this.clickAudio(key)}
                           className={"track " + 
                             (index === key && !pause ?'current-audio':'') + 
                             (index === key && pause ?'play-now':'')} >
                           
                           <img className="track-img" src={music.img}/>
                           <div className="track-discr" >
                             <span className="track-name" >{music.name}</span>
                             <span className="track-author" >{music.author}</span>
                           </div>
                           <span className="track-duration" >
                             {(index === key)
                               ?currentTime
                               :music.duration
                             }
                           </span>
                         </div>
                        )}
        </div>
      </div>
    )
  }
}

function chat(){
  return(
    <div>
      <CardProfile/>
    </div>
  )
}
export default chat;