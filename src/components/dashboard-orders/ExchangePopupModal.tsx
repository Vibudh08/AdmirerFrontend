import React, { useEffect, useState } from "react";
import { Modal, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { exchange, exchangeStatus } from "../api/api-end-points";
import axios from "axios";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
const { TextArea } = Input;

interface ExchangePopupModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (comment: string, images: File[]) => void;
  productId: string;
  orderId: string | undefined;
  onSuccess: () => void;
}

const ExchangePopupModal: React.FC<ExchangePopupModalProps> = ({
  visible,
  onClose,
  onSubmit,
  productId,
  orderId,
  onSuccess
}) => {
  const [comment, setComment] = useState("");
  const [fileList, setFileList] = useState<any[]>([]);
  const [status, setStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  


  const handleUploadChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setLoading(true); 
        const res = await axios.post(exchangeStatus, {
          orderid: orderId,
          productid: productId,
        });
  
        setStatus(res.data.status);
      } catch (err) {
        console.error(err);
      } finally {
          setLoading(false);
      }
    };
  
    if (visible) {
      fetchStatus();
    }
  }, [visible, orderId, productId]);
  

  const handleSubmit = async () => {
    const images = fileList.map((file) => file.originFileObj);

    if (!comment) {
      message.error("Please enter a comment.");
      return;
    }

    if (images.length === 0) {
      message.error("Please upload at least one photo.");
      return;
    }

    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("orderid", orderId ?? "");
    formData.append("productid", productId);

    images.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    try {
      const response = await axios.post(exchange, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      });
      const status = response.data.status;
      // console.log(status);
      setComment("");
      toast.success("Exchange request submitted successfully.")
      setFileList([]);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };
  if (!visible || status === null) {
    return null; // ⛔ prevent even 1-frame flash
  }
  
  return (
    <Modal
      title="Exchange Request"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      {loading ? (
        <div className="flex justify-center" >
          <span><Loader className="text-[#7b48a5]"/></span>
        </div>
      ) : status === 1 ? (
        <div>Your request has already been submitted. Please wait for confirmation.</div>
      ) : status === 2 ? (
        <div>Your request has been rejected.</div>
      ) : status === 3 ? (
        <div>Your request has been approved.</div>
      ) : (
        <div className="!space-y-4 mt-3 mb-1">
          <TextArea
            rows={4}
            placeholder="Write your reason for exchange..."
            className="!mb-3 hover:!border-[#7b48a5]"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Upload
            multiple
            listType="picture"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false}
            accept=".jpg,.jpeg,.png"
          >
            <Button
              className="hover:!border-[#7b48a5] hover:!text-[#7b48a5]"
              icon={<UploadOutlined />}
            >
              Upload Photos
            </Button>
          </Upload>
          <Button
            className="bg-[#7b48a5] text-white py-5 hover:!border-purple-800 hover:!text-white hover:!bg-purple-800"
            block
            onClick={handleSubmit}
          >
            Submit Request
          </Button>
        </div>
      )}
    </Modal>
  );
  
  
};

export default ExchangePopupModal;