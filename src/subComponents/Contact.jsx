import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiFacebookBoxLine } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubContact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Message sent successfully!', { position: 'top-right' });
    } catch (err) {
      toast.error('Failed to send message. Please try again.', { position: 'top-right' });
    } finally {
      setLoading(false);
      setForm({ name: '', email: '', message: '' });
    }
  };

  return (
    <>
      <section id="contact_Mini">
        <div className="super_container">
          <div className="container_1">
            <h3>Let's connect</h3>
            <div>
              <p>Phone</p>
              <span>+91 000 000 0000</span>
            </div>
            <div>
              <p>Email</p>
              <span>rs@gmail.com</span>
            </div>
            <div>
              <p>Address</p>
              <span>House No.123 Sector A-1</span>
            </div>
            <ul>
              <Link to={"/facebook"} target="_blank"><RiFacebookBoxLine/></Link>
              <Link to={"/facebook"} target="_blank"><RiFacebookBoxLine/></Link>
              <Link to={"/facebook"} target="_blank"><RiFacebookBoxLine/></Link>
            </ul>
          </div>
          <div className="container_2">
            <h3>We'd love to hear from you</h3>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <textarea
                name="message"
                rows="4"
                placeholder="Your Message..."
                value={form.message}
                onChange={handleChange}
                required
              />
              <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'SEND'}</button>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default SubContact;