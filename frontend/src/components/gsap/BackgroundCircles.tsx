import clsx from 'clsx';
import Circle from '../other/Circle';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';

const BackgroundCircles = () => {
  //test
  const scrollTrigger = {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
  }
  useScrollAnimations({
    animations: {
      ".circle1-gsap": {
        x: "-80vh",
        y: "90vh",
        scale: 0.5,
        scrollTrigger: {
          ...scrollTrigger,
          scrub: 2
        }
      },
      ".circle2-gsap": {
        x: "-40vh",
        y: "20vh",
        scrollTrigger: {
          ...scrollTrigger,
          scrub: 4
        }
      },
    },
  });

  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => {
        const gsapClassName = `circle${index + 1}-gsap`;
        return (
          <Circle key={index} className={clsx(gsapClassName, {
            "w-100 top-40 -right-45": index === 0,
            "w-70 top-0": index === 1,
          })} />
        )
      })}
    </>
  );
};

export default BackgroundCircles;