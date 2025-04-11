import React from "react";
import { useParams } from "react-router";
import { Store } from "@/app/store/Store";
import { API } from "@/app/api";
import { enqueueSnackbar } from "notistack";
import { generateNumberString } from "@/shared/utils/generateNumberString";
import { revokeCreatedObjectURL } from "@/shared/utils/revokeCreatedObjectURL";
import { isImageFile } from "@/shared/utils/isImageFile";
import { ImagePreview } from "@/shared/ui/ImagePreview/ImagePreview";

export const usePhotos = () => {
  const [pending, setPending] = React.useState<Set<String>>(new Set([]));
  const params = useParams();
  const id = String(params.id);
  const organization = Store.Organization.organizations[id];
  const photos = organization?.photos;
  const resolveItemClass = (name: string) => pending.has(name) ? "photos__item photos__item--pending" : "photos__item";
  const resolvePhotosClass = (photos: any[] | undefined) => photos?.length ? "photos" : "photos photos--empty";
  const removePending = (name: string) => setPending(set => (set.delete(name) && new Set(set)) || set);
  const photoDelete = async (name: string) => {
    setPending(set => new Set(set).add(name));
    try {
      const response = await API.Image.delete(Number(id), name);
      if (response.status === 404) return enqueueSnackbar("Photo not found", {variant: "error"});
      removePending(name);
      Store.Organization.photoDelete(id, name);
      enqueueSnackbar("Photo deleted", {variant: "success"});
    }
    catch(error) {
      enqueueSnackbar("Cannot delete photo", {variant: "error"});
    }
  }
  const photoAdd = async (file: File) => {
    let thumbnailURL;
    try {
      const formData = new FormData();
      formData.append("file", file);
      thumbnailURL = URL.createObjectURL(file);
      const thumbnail = {name: generateNumberString(), filepath: thumbnailURL, thumbpath: thumbnailURL};
      setPending(set => new Set(set).add(thumbnail.name));
      Store.Organization.photoAdd(id, thumbnail);
      const response = await API.Image.add(Number(id), formData);
      revokeCreatedObjectURL(thumbnailURL);
      removePending(thumbnail.name);
      Store.Organization.photoDelete(id, thumbnail.name);
      if ("error" in response) return enqueueSnackbar(response.error, {variant: "error"});
      Store.Organization.photoAdd(id, response);
      enqueueSnackbar("Photo added", {variant: "success"});
    }
    catch(error) {
      revokeCreatedObjectURL(thumbnailURL as string);
      enqueueSnackbar("Cannot add photo", {variant: "error"});
    }
  }
  const onFileAdded = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files) {
      const file = files[0];
      if (isImageFile(file)) photoAdd(file);
      else enqueueSnackbar("Only jpg/png files supported", {variant: "error"});
    }
  }
  const viewPhoto = (photo: string) => {
    Store.Dialogbox.setContent(() => <ImagePreview src={photo} />);
    Store.Dialogbox.open();
  }

  return {
    organization,
    photos,
    photoDelete,
    photoAdd,
    onFileAdded,
    viewPhoto,
    resolveItemClass,
    resolvePhotosClass
  }
}