import {getSongShareLinkWithSong} from '@/lib/actions/shareLink';
import {redirect} from 'next/navigation';
import LargeMediaItem from '@/lib/components/player/LargeMediaItem';
import React from 'react';
import SharedBanner from '@/lib/components/SharedBanner';
import MinimalistControl from '@/lib/components/shared-player/MinimalistControl';
import SharedPlayer from '@/lib/components/shared-player/SharedPlayer';

const Shared = async (
  { params }: { params: { shareId: string } }
) => {
  const songShared = await getSongShareLinkWithSong(params.shareId);
  if (!songShared) return redirect('/');

  return (
    <div className='flex flex-col mt-5'>
      <SharedBanner originDate={songShared.createdAt} durationInHours={24} />
      <LargeMediaItem song={songShared.song} hideLikeButton={true}/>
      <MinimalistControl
        song={songShared.song}
        source='shared song'
        className='mx-auto w-[90vw] 2xs:w-[70vw] xs:w-[60vw] sm:w-[385px]'
      />
      <SharedPlayer sharedSong={songShared.song} />
    </div>
  );
}

export default Shared;
