import {getSongShareLinkWithSong} from '@/lib/actions/shareLink';
import {redirect} from 'next/navigation';
import LargeMediaItem from '@/lib/components/player/LargeMediaItem';
import React from 'react';
import SharedBanner from '@/lib/components/SharedBanner';
import {SharedPlayerPlay} from '@/lib/components/player/SharedPlayerPlay';

const Shared = async (
  { params }: { params: { shareId: string } }
) => {
  const songShared = await getSongShareLinkWithSong(params.shareId);
  
  if (!songShared) return redirect('/');

  // TODO : make all like buttons disappear (or disappear only if no user)
  // TODO : fix the loop issue (loop mode is not activated on the audio object when we force skip while loop is on)

  return (
    <div className='flex flex-col mt-5'>
      <SharedBanner originDate={songShared.createdAt} durationInHours={24} />
      <LargeMediaItem song={songShared.song} hideLikeButton={true}/>
      <SharedPlayerPlay songShared={songShared} />
    </div>
  );
}

export default Shared;
