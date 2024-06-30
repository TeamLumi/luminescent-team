import useBaseUrl from '@docusaurus/useBaseUrl';
import React, { useState, useEffect } from 'react';

export const ImageWithFallback = ({ fallbackSrc, src, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const onError = () => setImgSrc(fallbackSrc);

  return <img key={imgSrc} src={useBaseUrl(imgSrc ? imgSrc : fallbackSrc)} onError={onError} {...props} />;
};
