import React from "react";
import "./Meal.css";
import meal from "../../img/meal.mp4";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";


function Meal() {
    const [playVideo, setPlayVideo] = React.useState(false);
    const vidRef = React.useRef();
  return (
    <>
      {/* <div className="meal">
        <div className="meal__info containers">
          <h1>Pizza of the Day</h1>
          <h3>Truffle alfredo sauce topped with 24 carat gold dust</h3>
          <button className="bt">Order Now</button>
        </div>
      </div> */}
      {/* VIDEO PLAY SECTION */}
      <div className="app__video">
        <video
          ref={vidRef}
          src={meal}
          type="video/mp4"
          loop
          controls={false}
          muted
        />
        <div className="app__video-overlay flex__center">
          <div
            className="app__video-overlay_circle flex__center"
            onClick={() => {
              setPlayVideo(!playVideo);
              if (playVideo) {
                vidRef.current.pause();
              } else {
                vidRef.current.play();
              }
            }}
          >
            {playVideo ? (
              <BsPauseFill color="#fff" fontSize={30} />
            ) : (
              <BsFillPlayFill color="#fff" fontSize={30} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Meal;
