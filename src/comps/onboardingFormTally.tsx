import Script from 'next/script';
import { useEffect } from 'react';

declare global {
    interface Window {
      Tally: {
        loadEmbeds: () => void;
      };
    }
  }  

const OnboardingForm = () => {

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.Tally !== 'undefined') {
      window.Tally.loadEmbeds();
    }
  }, []);

  return (
    <>
    <div className="p-4 dark:bg-inherit text-foreground">
    <Script src="https://tally.so/widgets/embed.js" strategy="beforeInteractive" />
      <iframe
        data-tally-src="https://tally.so/embed/m6eejA?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="700vw"
        height="100%"
        frameBorder="0"
        title="Onboarding"
        className='dark:bg-inherit'
      ></iframe>
    </div>
      
    </>
  );
};

export default OnboardingForm;
