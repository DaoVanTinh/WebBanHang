import { useState } from "react";
import axios from "axios";
import React from "react";
import { Loginbanner, Logo } from "../../assets/index.js";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, phone, address } = form;

    if (!username || !email || !password || !phone || !address) {
      return setError("Vui lòng điền đầy đủ thông tin!");
    }
    if (password.length < 6) {
      return setError("Mật khẩu phải ít nhất 6 ký tự!");
    }
    if (username.length < 5) {
      return setError("Username phải ít nhất 5 ký tự!");
    }
    if (username.length > 15) {
      return setError("Username chỉ được tối đa 15 ký tự!");
    }
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Đăng ký thành công!");
      navigate("/login");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Lỗi server!");
    }
  };

  return (
    <div className="h-screen flex">
      <div className="w-1/2 bg-gray-100 flex items-center justify-center relative">
        <img
          src={Loginbanner}
          alt="banner"
          className="w-full h-full object-contain"
        />
        <div className="absolute top-8 left-1/2 -translate-x-1/2">
          <button className="cursor-pointer" onClick={() => navigate("/")}>
            <img src={Logo} alt="Logo" />
          </button>
        </div>
      </div>
      <div className="w-1/2 flex items-start justify-end bg-white">
        <form
          onSubmit={handleSubmit}
          className="mt-[220px] mr-[160px] ml-[100px]"
        >
          <div className="mb-8">
            <h2 className="font-poppins font-medium text-[40px] leading-[44px] tracking-[-0.4px] text-black mb-6">
              Đăng ký
            </h2>
            <div className="flex">
              <p className="text-[#6C7275] mr-1">Bạn đã có tài khoản?</p>
              <span
                className="text-[#38CB89] cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </span>
            </div>
          </div>
          <input
            type="text"
            placeholder="Tên tài khoản"
            className="w-full p-2 mb-3 border rounded"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-3 border rounded"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full p-2 mb-3 border rounded"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            className="w-full p-2 mb-3 border rounded"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            type="text"
            placeholder="Địa chỉ"
            className="w-full p-2 mb-3 border rounded"
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <button className="w-full bg-[#141718] text-white p-2 rounded hover:bg-[#232628] cursor-pointer">
            Đăng ký
          </button>
          {error && (
            <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
