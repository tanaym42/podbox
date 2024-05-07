"use client";
import styles from "./page.module.css";
import Image from 'next/image';

import launchOutsideImg from '../../../../public/launchOutside.svg'
import toolTipIcon from '../../../../public/infoTooltip.svg'
import clockIcon from '../../../../public/icon-clock.svg'
import calendarIcon from '../../../../public/icon-calendar.svg'
import downloadIcon from '../../../../public/download-icon.svg'
import expandIcon from '../../../../public/icon-expand.svg'
import questionIcon from '../../../../public/icon-questionMark.svg'

const goMediaKraken = () => {
  window.open(
    "https://noeldemartin.github.io/media-kraken/login", "_blank");
}


const singleapp = () => {
// html content to show on the page after we've run everything above this 
  return (
    <div className={styles.main}>
        {/* Check if webId is null */}
      <div className={styles.leftPane}>
        <div className={styles.appTitle}>
          <h2>Media Kraken</h2>
          <Image src={launchOutsideImg} alt="" height="30" onClick={goMediaKraken} />
        </div>
        <div className={styles.appBody}>
          <h3> By Noel De Martin </h3>

          <p>Keep track of your movies and make your own collection. This app accesses movie databases to allow you to track, mark as watched, and create collections of your choice with movies from all over the world.</p>
          <br />

        </div>
        <div className={styles.accessControl}>
          <h2>Access Controls</h2>
          <div className={styles.mainToggle}>
            <p>Allow Media Kraken to access my Pod.</p>
            <label className={styles.switch}>
              <input type="checkbox"  />
              <span class={styles.slider}></span>
            </label>
            <div className={styles.tooltip}>
              <Image src={toolTipIcon} alt="" height="15" />
              <span className={styles.tooltiptext}>By revoking this access, Media Kraken will not be able to access or control any data on your Pod. </span>
            </div>
          </div>

          <br />

          
          <div className={styles.controlOptions}>
            <h4>Control Options</h4>
            <div className={styles.controlToggle}>
              <p> Read </p>
              <label className={styles.switch}>
                <input type="checkbox" />
                <span class={styles.slider}></span>
              </label>
              <div className={styles.tooltip}>
                <Image src={toolTipIcon} alt="" height="15" />
                <span className={styles.tooltiptext}>By revoking this access, Media Kraken will not be able to read any data on your Pod.</span>
              </div>
            </div>
            
            <div className={styles.controlToggle}>
              <p> Write </p>
              <label className={styles.switch}>
                <input type="checkbox" />
                <span class={styles.slider}></span>
              </label>
              <div className={styles.tooltip}>
                <Image src={toolTipIcon} alt="" height="15" />
                <span className={styles.tooltiptext}>By revoking this access, Media Kraken will not be able to write any data on your Pod.</span>
              </div>
            </div>

            <div className={styles.controlToggle}>
              <p> Append </p>
              <label className={styles.switch}>
                <input type="checkbox" />
                <span class={styles.slider}></span>
              </label>
              <div className={styles.tooltip}>
                <Image src={toolTipIcon} alt="" height="15" />
                <span className={styles.tooltiptext}>By revoking this access, Media Kraken will not be able to append any data to your Pod.</span>
              </div>
            </div>

            <div className={styles.controlToggle}>
              <p>Control</p>
              <label className={styles.switch}>
                <input type="checkbox" />
                <span class={styles.slider}></span>
              </label>
              <div className={styles.tooltip}>
                <Image src={toolTipIcon} alt="" height="15" />
                <span className={styles.tooltiptext}>By revoking this access, Media Kraken will not be able to control any data on your Pod.</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>


      <div className={styles.rightPane}>
        <div className={styles.thumbnailContainer}>
        <img src="https://noeldemartin.github.io/media-kraken/img/icons/android-chrome-512x512.png" alt="The Media Kraken Logo"></img>

        </div>
        <div className={styles.accessInfo}>
          <div className={styles.modifiedText}>
            <Image src={clockIcon} alt="" height="15" />
            <p>Last modified: 05/06/24</p>
          </div>
          <div className={styles.modifiedText}>
            <Image src={calendarIcon} alt="" height="15" />
            <p>First access: 02/14/24</p>
          </div>
          

        </div>
        <div className={styles.dataButtons}>

          <div className={styles.downloadButton}>
            <Image src={downloadIcon} alt="" height="20" />
            Download
          </div>
          
          <div className={styles.relatedButton}>
            <Image src={expandIcon} alt="" height="20" />
            View Related Data
          </div>

        </div>
        <div className={styles.infoPane}>
          <Image src={questionIcon} alt="" height="50" />
          <div className={styles.linkPane}>
            <p><a href="main-pages/faqs">What can I do with my data?</a></p>

            <p><a href="main-pages/faqs">How do I revoke access to my pod?</a></p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default singleapp;