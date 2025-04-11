import "./Photos.styles.scss";
import React from "react";
import TrashIcon from "@/assets/Trash.svg?react";
import { SemiRoundButton } from "@/shared/ui/SemiRoundButton/SemiRoundButton";
import { Block } from "@/components/Block/Block";
import { ButtonsWithTitle } from "@/components/ButtonsWithTitle/ButtonsWithTitle";
import { observer } from "mobx-react-lite";
import { usePhotos } from "./usePhotos";

export interface Photos {}
export const Photos: React.FC<Photos> = observer(() => {
  
  const {
    organization,
    photos,
    photoDelete,
    onFileAdded,
    viewPhoto,
    resolveItemClass,
    resolvePhotosClass
  } = usePhotos();

  return organization && <Block>
    <ButtonsWithTitle title="Photos" renderUploadButton={true} onFileAdded={onFileAdded} />
    <div className={resolvePhotosClass(photos)}>
      {!photos?.length ? "No photos in this organization" : photos.map(photo => {
        return <div key={photo.name} className={resolveItemClass(photo.name)}>
          <img src={photo.thumbpath} onClick={() => viewPhoto(photo.filepath)} />
          <div className="photos__trash" onClick={() => photoDelete(photo.name)}>
            <SemiRoundButton icon={<TrashIcon stroke="white" width={16} height={16} />} />
          </div>
        </div>
        })}
    </div>
  </Block>
})