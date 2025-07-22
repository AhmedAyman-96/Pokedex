declare module 'react-window-infinite-loader' {
  import { ReactNode } from 'react';

  interface InfiniteLoaderProps {
    isItemLoaded: (index: number) => boolean;
    itemCount: number;
    loadMoreItems: (startIndex: number, stopIndex: number) => Promise<void> | void;
    children: (props: {
      onItemsRendered: (props: any) => void;
      ref: any;
    }) => ReactNode;
  }

  const InfiniteLoader: React.FC<InfiniteLoaderProps>;
  export default InfiniteLoader;
} 