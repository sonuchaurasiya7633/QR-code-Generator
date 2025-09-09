import { Button, Form, Input, Modal, QRCode } from "antd";
import { Download, Sun, Moon } from "lucide-react";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const App = () => {
  const [form] = Form.useForm();
  const divRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [qr, setQr] = useState({
    value: "https://sonu-portfolio.onrender.com/",
    icon: "",
    bgColor: "white",
    color: "black",
  });

  // Download QR
  const downloadNow = () => {
    const div = divRef.current;
    const canvas = div.querySelector("canvas");
    const base64String = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = base64String;
    a.download = "qrcode.png";
    a.click();
    a.remove();

    // Reset form & icon after download
    form.resetFields();
    setIcon("");
  };

  // Generate QR
  const generateQR = (values) => {
    values.bgColor = values.bgColor || "white";
    values.color = values.color || "black";
    values.icon = icon;

    setQr((prev) => ({
      ...prev,
      value: values.url,
      bgColor: values.BgColor || prev.bgColor,
      color: values.color || prev.color,
      icon: icon,
    }));

    // Reset form & icon after generate
    form.resetFields();
    setIcon("");
    setOpen(false);
  };

  // Choose logo file
  const chooseFile = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setIcon(url);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
    form.resetFields();
    setIcon("");
  };

  return (
    <div
      className={`relative min-h-screen flex flex-col justify-center items-center px-4 overflow-hidden transition-colors duration-500 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Background Neon Glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl bg-purple-500/40 animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl bg-pink-500/40 animate-pulse"></div>

      {/* Dark/Light Toggle */}
      <div className="absolute top-6 right-6">
        <Button
          type="default"
          onClick={() => setDarkMode(!darkMode)}
          className="!rounded-full !shadow-lg !p-2 !w-12 !h-12 flex items-center justify-center"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700" />
          )}
        </Button>
      </div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-lg text-center mb-12"
      >
        ⚡ SaaS QR Generator
      </motion.h1>

      {/* QR Code Box */}
      <motion.div
        ref={divRef}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`mb-12 p-6 rounded-3xl ${
          darkMode ? "bg-white/10 border-gray-700" : "bg-white/80 border-gray-200"
        } backdrop-blur-lg border shadow-[0_0_40px_rgba(168,85,247,0.6)] hover:scale-105 transition-transform`}
      >
        <QRCode value={qr.value} size={250} icon={qr.icon} bgColor={qr.bgColor} color={qr.color} />
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="flex flex-col sm:flex-row gap-4 w-full max-w-sm justify-center"
      >
        <Button
          size="large"
          type="primary"
          className="!bg-gradient-to-r !from-pink-500 !to-purple-600 !border-none hover:!scale-110 shadow-lg font-semibold tracking-wide w-full sm:w-auto"
          onClick={() => setOpen(true)}
        >
          🎨 Generate New QR
        </Button>
        <Button
          size="large"
          type="primary"
          className="!bg-gradient-to-r !from-green-400 !to-emerald-600 !border-none hover:!scale-110 shadow-lg font-semibold tracking-wide w-full sm:w-auto flex items-center justify-center gap-2"
          icon={<Download className="w-5 h-5" />}
          onClick={downloadNow}
        >
          ⬇ Download
        </Button>
      </motion.div>

      {/* Modal */}
      <Modal open={open} footer={null} onCancel={handleClose} className="rounded-2xl">
        <h1 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
          ✨ Customize Your QR Code
        </h1>
        <Form onFinish={generateQR} form={form} layout="vertical">
          <Form.Item
            label="🔗 URL"
            rules={[{ required: true, type: "url", message: "Please enter a valid URL" }]}
            name="url"
          >
            <Input size="large" placeholder="https://domain.com" />
          </Form.Item>

          <Form.Item label="🎨 Background Color" name="BgColor">
            <Input type="color" size="large" />
          </Form.Item>

          <Form.Item label="🎨 Foreground Color" name="color">
            <Input type="color" size="large" />
          </Form.Item>

          <Form.Item label="🖼️ Logo" name="logo">
            <Input type="file" size="large" accept="image/*" onChange={chooseFile} />
          </Form.Item>

          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="w-full !bg-gradient-to-r !from-blue-500 !to-cyan-500 hover:!scale-105 shadow-lg font-semibold tracking-wide"
            >
              🚀 Generate
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
