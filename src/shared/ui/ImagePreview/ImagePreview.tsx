import React from "react";

export interface ImagePreview {
  src: string;
  size?: number;
}
export const ImagePreview: React.FC<ImagePreview> = ({src, size = 80}) => {
  return <img style={{maxWidth: `${size}vw`, maxHeight: `${size}vh`}} src={src} />
}