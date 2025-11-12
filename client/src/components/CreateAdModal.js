import React, { useState, useMemo } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  AutoComplete,
  Button,
  message,
} from "antd";
import debounce from "lodash.debounce";
import api from "../api";

const { TextArea } = Input;

export default function CreateAdModal({ open, onClose, onCreated }) {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const fetchAreas = useMemo(
    () =>
      debounce(async (value) => {
        if (value.length < 3) return;
        try {
          const res = await api.get("/api/areas", { params: { input: value } });
          setOptions(
            res.data.map((item) => ({
              value: item.mainText,
              label: `${item.mainText} - ${item.secondaryText}`,
              item,
            }))
          );
        } catch {
          message.error("Σφάλμα φόρτωσης περιοχών");
        }
      }, 400),
    []
  );

  const handleSelect = (value, option) => {
    setSelectedPlace(option.item);
  };

  const onFinish = async (values) => {
    if (!selectedPlace) return message.error("Πρέπει να επιλέξεις περιοχή");
    setLoading(true);
    try {
      await api.post("/api/ads", {
        ...values,
        place_id: selectedPlace.placeId,
        place_main_text: selectedPlace.mainText,
        place_secondary_text: selectedPlace.secondaryText,
      });
      message.success("Η αγγελία δημιουργήθηκε!");
      onCreated();
      onClose();
    } catch {
      message.error("Αποτυχία δημιουργίας αγγελίας");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      title="Δημιουργία Νέας Αγγελίας"
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      centered
      style={{ padding: 24, borderRadius: 12 }}
      width={500}
    >
      <Form layout="vertical" onFinish={onFinish}>
        {/* Τίτλος */}
        <Form.Item
          name="title"
          label="Τίτλος Αγγελίας"
          rules={[{ required: true, message: "Παρακαλώ εισάγετε τίτλο" }]}
        >
          <Input
            placeholder="π.χ. Διαμέρισμα 96 τ.μ"
            style={{ borderRadius: 8, padding: "8px 12px" }}
          />
        </Form.Item>

        {/* Περιγραφή */}
        <Form.Item
          name="description"
          label="Περιγραφή"
          rules={[{ required: true, message: "Παρακαλώ εισάγετε περιγραφή" }]}
        >
          <TextArea
            rows={4}
            placeholder="Προσθέστε λεπτομέρειες για την αγγελία σας"
            style={{ borderRadius: 8, padding: "8px 12px" }}
          />
        </Form.Item>

        {/* Τιμή */}
        <Form.Item
          name="price"
          label="Τιμή (€)"
          rules={[{ required: true, message: "Παρακαλώ εισάγετε τιμή" }]}
        >
          <InputNumber
            min={0}
            placeholder="π.χ. 100"
            style={{ width: "100%", borderRadius: 8, padding: "8px 12px" }}
          />
        </Form.Item>

        {/* Περιοχή */}
        <Form.Item
          label="Περιοχή"
          name="place"
          rules={[{ required: true, message: "Παρακαλώ επιλέξτε περιοχή" }]}
        >
          <AutoComplete
            options={options}
            onSearch={fetchAreas}
            onSelect={handleSelect}
            placeholder="Πληκτρολόγησε τουλάχιστον 3 χαρακτήρες"
            style={{
              width: "100%",
              minHeight: 50,
              padding: "10px 12px",
              borderRadius: 8,
              fontSize: 16,
            }}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
          style={{ borderRadius: 8, padding: "10px 0", marginTop: 8 }}
        >
          Αποθήκευση Αγγελίας
        </Button>
      </Form>
    </Modal>
  );
}
