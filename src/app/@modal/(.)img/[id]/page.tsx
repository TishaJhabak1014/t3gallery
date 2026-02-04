import { Modal } from "./modal";
import { FullPageImageView } from "../../../component/full-page-image-view";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: photoId } = await params;

  return (
    <Modal>
      <FullPageImageView photoId={photoId} />
    </Modal>
  );
}
