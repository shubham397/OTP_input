// OtpInput.tsx
import React, { useRef, useState } from "react";
import "./otpInput.css";

const OtpInput: React.FC = () => {
  const length = 4;
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputs = useRef<HTMLInputElement[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData
      .getData("Text")
      .slice(0, length)
      .split("");
    const newOtp = [...otp];
    pastedData.forEach((digit, idx) => {
      if (/^[0-9]$/.test(digit)) {
        newOtp[idx] = digit;
      }
    });
    setOtp(newOtp);
    const nextInput =
      pastedData.length < length ? pastedData.length : length - 1;
    inputs.current[nextInput].focus();
  };

  return (
    <div className="otp-container">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          ref={(el) => (inputs.current[index] = el!)}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="otp-box"
        />
      ))}
    </div>
  );
};

export default OtpInput;
