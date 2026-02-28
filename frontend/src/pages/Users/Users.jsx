import React from "react";
import { useState } from "react";
import axios from "axios";
import { base_uri } from "../../utils/global.js";

const Users = () => {
  
  const [name, setName] = useState("");
  const [currentu, setCurrentu] = useState([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handlecreateuser = async () => {
    const user = { name, email, phone };
    try {
      const res = await axios.post(`${base_uri}/create`, user, {
        withCredentials: true,
      });
      if (res.data.status) {
        alert(res.data.message);
        setCurrentu();
      }
    } catch (err) {
      alert(err.mesaage);
    }
  };

  const handlegetuser = async () => {
    const user = { name, email, phone, action };
    try {
      const res = await axios.get(`${base_uri}/get`, user);
      if (res.data.status) {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.mesaage);
    }
  };

  const handleupdateuser = async (id) => {
    const user = { name, email, phone, action };
    try {
      const res = await axios.get(`${base_uri}/update${id}`, user);
      if (res.data.status) {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.mesaage);
    }
  };

  const handledeleteuser = async (id) => {
    const user = { name, email, phone, action };
    try {
      const res = await axios.get(`${base_uri}/delete${id}`);
      if (res.data.status) {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.mesaage);
    }
  };

  const handlemultidelteuser = async (id) => {
    const user = { name, email, phone, action };
    try {
      const res = await axios.get(`${base_uri}/multiple-delete${id}`, user);
      if (res.data.status) {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.mesaage);
    }
  };

  return (
    <div>
     
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="enter name"
        />
      </div>
      <div class="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          class="email"
          id="email"
          placeholder="Enter your Email"
        />
      </div>
      <div class="mb-3">
        <label htmlFor="tel" className="form-label">
          Phone
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="tel"
          id="tel"
          placeholder="enter your phone no"
        />
      </div>
      <div>
        <button onClick={handlecreateuser}>create user</button>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>

              <th scope="col">NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {currentu.map((users, i) => (
                <div>
                  <th scope="row">{i + 1}</th>
                  <td>{users.name}</td>
                  <td>{users.email}</td>
                  <td>{users.phone}</td>
                  <td>
                    <button
                      onClick={() => handleupdateuser(users._id)}
                      className="btn btn-success"
                    >
                      edit
                    </button>
                    <button
                      onClick={() => handledeleteuser(users._id)}
                      className="btn btn-danger"
                    >
                      delete
                    </button>
                  </td>
                </div>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
