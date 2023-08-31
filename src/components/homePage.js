import React from 'react'
import "../style/homePage.css"
import Navbar from './navbar'
import BottomBar from './bottomNavigation'
import instagram from "../img/instagram.png"
import facebook from "../img/facebook.png"
import twitter from "../img/twitter.png"
import logo from "../img/logo.jpg"
import time from "../img/time.png"
import address from "../img/address.png"
import phone from "../img/phone.png"

function HomePage() {
  return (
    <>
    <Navbar />
        <div className='generalDiv'>
            <div className='ortalama'>
                <div className='informations'>
                    <div className='nameAndImg'>
                        <img className='homepageLogo' src={logo}></img>
                        <h1 className='homepageTitle'>Roz Cafe</h1>
                    </div>
                    <div className='phoneAndAddress'>
                        <h3 className='time'>
                            <img className='minimalPhotos' src={time}></img>
                            08:30-00:00</h3>
                        <h4 className='homepagePhone'>
                            <img className='minimalPhotos' src={phone}></img>
                            03245158974</h4>
                        <h5 className='homepageAddress'>
                            <img className='minimalPhotos' src={address}></img>
                            Akdeniz Mah. Erdemoğlu Blv. No:34/11 Erdemli/Mersin</h5>
                    </div>
                    <div className='socialMedia'>
                        <a href='#' target='_blank'>
                            <img className='socialImg' src={instagram}></img>
                        </a>
                        <a href='#' target='_blank'>
                            <img className='socialImg' src={facebook}></img>
                        </a>
                        <a href='#' target='_blank'>
                            <img className='socialImg' src={twitter}></img>
                        </a>
                    </div>
                </div>
            </div>

        </div>
    <BottomBar/>
    </>

  )
}

export default HomePage
