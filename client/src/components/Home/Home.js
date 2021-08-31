import React from "react";
import "./Home.scss";

export default function Home() {
  return (
    <div className="home-wrapper">
      {/* Header here */}

      <div className="home-content">
        {/* Left block */}
        <div className="home-item-outer">
          {/* Title */}
          <div>
            <h1>Truyện mới</h1>
          </div>
          {/* Item list */}
          <div className="home-items">
            <div className="home-item">
              <div className="home-item-thumbnail">
                <img
                  src="https://dummyimage.com/200x300/f5f5f5/000&text=Sample+image"
                  alt="Thumbnail"
                />
              </div>
              <div className='home-item-info-box'>
                
              </div>
            </div>


            <div className="home-item">
              <div className="home-item-thumbnail">
                <img
                  src="https://dummyimage.com/200x300/f5f5f5/000&text=Sample+image"
                  alt="Thumbnail"
                />
              </div>
              <div className='home-item-info-box'>
                
              </div>
            </div>

            <div className="home-item">
              <div className="home-item-thumbnail">
                <img
                  src="https://dummyimage.com/200x300/f5f5f5/000&text=Sample+image"
                  alt="Thumbnail"
                />
              </div>
              <div className='home-item-info-box'>
                
              </div>
            </div>
          </div>
        </div>

        {/* Aside */}
        <div className="home-aside">
          <div>
            <h1>Thông báo</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
