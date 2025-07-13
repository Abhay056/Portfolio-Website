import React, { useEffect } from 'react';
import './SplashScreen.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const splash = document.querySelector('.splash-screen');
      if (splash) splash.classList.add('fade-out');
      setTimeout(onFinish, 600);
    }, 3400); 
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-screen fade-in">
      <DotLottieReact
        src="https://lottie.host/271769c1-bc1d-4079-ab51-f8b2972c630c/SzLvmIuVod.lottie"
        loop
        autoplay
        style={{ width: 220, height: 220 }}
      />
    </div>
  );
};  

export default SplashScreen;
