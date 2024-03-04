'use client'

import {useCallback, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {NumberBox} from '@/lib/components/timer/NumberBox';
import {twMerge} from 'tailwind-merge';

interface TimeLeftProps {
  originDate: Date;
  durationInHours: number;
}

export function TimeLeft({
  originDate,
  durationInHours
}: TimeLeftProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const router = useRouter();
  
  const updateTimeLeft = useCallback(() => {
    // getTime() returns milliseconds that we convert in seconds, and add 24 hours to the creation date.
    const endEpoch = originDate.getTime()/1000 + durationInHours*3600;
    const secondsLeft = Math.trunc(endEpoch - (new Date().getTime()/1000));
    if (secondsLeft <= 0) {
      router.refresh();
    }

    setTimeLeft(secondsLeft)
  }, [durationInHours, originDate, router]);

  useEffect(() => {
    const interval = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [updateTimeLeft]);

  let hoursFlip = false;
  let minutesFlip = false;
  let secondsFlip = true;

  let hours = Math.floor(timeLeft / 3600);
  let minutes = Math.floor((timeLeft % 3600) / 60);
  let seconds = timeLeft % 60;

  if(seconds == 0){
    if( minutes !=0) seconds=59;
    secondsFlip = false;
    minutesFlip = true;
  }

  if (minutes == 0 ){
    if( hours !=0) minutes=59;
    minutesFlip = false;
    hoursFlip = true;
  }

  if( hours == 0){
    hoursFlip = false;
  }

  // Prevents having different string lengths
  if(hours <10) hours= +("0"+hours);
  if(minutes <10) minutes= +("0"+minutes);
  if(seconds < 10) seconds= +("0"+seconds);

  return (
    <div className="gap-2 mt-1 flex items-center justify-between rounded-xl">
      <NumberBox num={hours} unit="Hours" flip={hoursFlip}/>
      <NumberBox num={minutes} unit="Minutes" flip={minutesFlip}/>
      <NumberBox num={seconds} unit="Seconds" flip={secondsFlip}/>
    </div>
  )
}

export default TimeLeft;
