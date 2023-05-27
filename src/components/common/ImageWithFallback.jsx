import useBaseUrl from '@docusaurus/useBaseUrl';
import React, { useState } from 'react';

export const ImageWithFallback = ({ fallbackSrc, src, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const onError = () => setImgSrc(fallbackSrc);

  return <img src={useBaseUrl(imgSrc ? imgSrc : fallbackSrc)} onError={onError} {...props} />;
};
