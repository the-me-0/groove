declare module 'use-sound' {
  export default function useSound(sound: any, options?: any): any;
}

declare module '*?worker' {
  const InlineWorker: {
    new(): Worker;
  };

  export default InlineWorker;
}

declare module 'worker-loader!*' {
  const InlineWorker: {
    new(): Worker;
  };

  export default InlineWorker;
}
