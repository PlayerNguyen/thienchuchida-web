import React, { useState, useRef, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import ResourceService from "../../../services/ResourceService";
import toastHelper from "../../../helpers/toastHelper";

export default function ResourceUploadSingleModal({
  visible,
  onClose,
  onDone,
}) {
  const [previewFile, setPreviewFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%",
    // aspect: 9 / 16,
    width: 99.9,
    height: 99.99,
    x: 0,
    y: 0,
  });

  const imgRef = useRef(null);

  const handlePreUpload = (e) => {
    if (e.target.files.length > 0) {
      const reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        setPreviewFile(reader.result);
      });

      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("crop", JSON.stringify(generateCropProperty(crop)));

    ResourceService.uploadSingleResource(data)
      .then((response) => {
        const { message, data } = response.data;
        // Send message
        toastHelper.success(message);
        // Set done
        onDone(data);
        // Close
        onClose();
      })
      .finally((_) => setUploading(false));
  };

  const onLoad = (img) => {
    imgRef.current = img;
  };

  const handleOnCrop = (_crop, percentCrop) => {
    // setPersistCrop({ x, y, width, height });
    setCrop(percentCrop);
  };

  useEffect(
    () => crop && imgRef && file && console.log(generateCropProperty(crop)),
    [crop, file]
  );

  const generateCropProperty = (crop) => {
    const image = imgRef.current;
    if (image === null) {
      return null;
    }
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;

    const x = crop.x * scaleX * pixelRatio;
    const y = crop.y * scaleY * pixelRatio;

    const width = crop.width * scaleX;
    const height = crop.height * scaleY;
    return {
      x: x < 0 ? 0 : x,
      y: y < 0 ? 0 : y,
      width: width < 0 ? 0 : width,
      height: height < 0 ? 0 : height,
    };
  };

  return (
    <div>
      <Modal show={visible} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tải ảnh mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form encType="multipart/form-data">
            <Form.Group className="mb-2">
              <Form.Label>Chọn ảnh để tải lên</Form.Label>
              <Form.Control type="file" onChange={handlePreUpload} />
            </Form.Group>

            {previewFile && (
              <Form.Group className="mb-2">
                <Form.Label>Chỉnh sửa ảnh </Form.Label>
                <div>
                  <ReactCrop
                    src={previewFile}
                    crop={crop}
                    imageStyle={{ maxWidth: "100%" }}
                    ruleOfThirds
                    onChange={handleOnCrop}
                    onImageLoaded={onLoad}
                    onComplete={(crop) => setCrop(crop)}
                  />
                </div>
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={`danger`} onClick={onClose}>
            Huỷ
          </Button>
          <Button onClick={handleUpload} disabled={uploading}>
            {uploading ? `Đang tải lên...` : `Tải lên`}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
