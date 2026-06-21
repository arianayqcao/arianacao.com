import { useState, useEffect } from 'react';

const CATERPILLAR_FRAMES = [
  'eyes-left.svg',
  'eyes-right.svg',
  'eyes-left.svg',
  'eyes-up.svg'
];

export default function Caterpillar() {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    // 2. Set up a timer to run every 1000ms (1 second)
    const timer = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % CATERPILLAR_FRAMES.length);
    }, 1000);

    // 3. Clean up the timer if the component unmounts to prevent memory leaks
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-32 h-32 flex items-center justify-center">
      <img 
        src={`/${CATERPILLAR_FRAMES[frameIndex]}`} 
        alt={`Caterpillar looking ${CATERPILLAR_FRAMES[frameIndex].split('-')[1].split('.')[0]}`} 
        className="w-full h-full object-contain"
      />
    </div>
  );
}
