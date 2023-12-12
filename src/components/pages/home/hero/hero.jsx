import React from 'react';
import Button from 'components/shared/button';
import illustration from './images/hero-illustration.png';
const TITLE = 'Kubernetes Community Days Munich';

const DESCRIPTION =
  'The Kubernetes & Cloud Native community will gather at the smartvillage Bogenhausen in Munich, Germany. Join us for a two-day technical event loaded with exciting talks and networking opportunities. KCD Munich is aimed at developers, platform people, and other IT professionals with an interest in cloud native technologies. This community event is supported by the CNCF.';

const Hero = () => {
  /*
  const cloudsBack = {
    animationData: cloudsAnimation, // Your back animation JSON
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const { View: View, play: playBack } = useLottie(cloudsBack);

  useEffect(() => {
    playBack();
  }, [playBack]);

  */

  return (
    <section className="safe-paddings overflow-hidden bg-opacity-10 pt-28 md:pt-24">
      <div className="container flex flex-row gap-4 md:flex-col md:items-center md:text-center">
        <div className="flex flex-col md:items-center md:text-center">
          <span className="w-fit rounded-3xl bg-yellow px-4 py-2 text-sm font-bold leading-none text-black">
            JULY 1th - 2th, 2024
          </span>
          <h1 className="mt-3 min-w-[38rem] max-w-[570px] text-8xl font-bold leading-denser text-primary-1 lg:max-w-[500px] md:min-w-min sm:text-7xl">
            {TITLE}
          </h1>
          <p className="mt-5 max-w-[500px] text-lg leading-normal text-primary-1 lg:max-w-[500px]">
            {DESCRIPTION}
          </p>
          <Button className="mt-7 w-fit text-white" to="" theme="blue" size="lg" target="_blank">
            Tickets will be available soon
          </Button>
        </div>
        <img
          className="h-[40rem] scale-125 object-contain md:h-96"
          src={illustration}
          loading="eager"
          alt="Illustration"
        />
      </div>
    </section>
  );
};

export default Hero;
