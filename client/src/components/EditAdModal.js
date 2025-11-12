import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Button, message } from "antd";
import api from "../api";

export default function EditAdModal({ open, onClose, ad, onUpdated }) {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await api.put(`/api/ads/${ad.id}`, values);
      message.success("Η αγγελία ενημερώθηκε!");
      onUpdated();
      onClose();
    } catch {
      message.error("Αποτυχία ενημέρωσης");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Επεξεργασία Αγγελίας"
      destroyOnHidden
    >
      <Form layout="vertical" initialValues={ad} onFinish={onFinish}>
        <Form.Item name="title" label="Τίτλος">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Περιγραφή">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="price" label="Τιμή">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Αποθήκευση
        </Button>
      </Form>
    </Modal>
  );
}
