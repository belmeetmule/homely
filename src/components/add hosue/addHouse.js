import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './addHouse.scss';
import { MdDescription } from 'react-icons/md';
import { BsFillHouseDoorFill } from 'react-icons/bs';
import { FaCity } from 'react-icons/fa';
import { BiCodeCurly } from 'react-icons/bi';
import { AiFillDollarCircle } from 'react-icons/ai';
import { IoCaretBackOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { createHouse } from '../../Redux/Reducers/addHouseSlice';

const AddHouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHouseAdded, setIsHouseAdded] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    image: '',
    appartment_fee: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createHouse(formData));
    setFormData({
      name: '',
      city: '',
      image: '',
      appartment_fee: '',
      description: '',
    });
    setIsHouseAdded(true);
  };

  useEffect(() => {
    if (isHouseAdded) {
      setTimeout(() => {
        navigate('/');
        setIsHouseAdded(false);
      }, 100);
    }
  }, [isHouseAdded, navigate]);

  return (
    <section className="add_house_sec">
      <h2>Add a House</h2>
      <form onSubmit={handleSubmit}>
        <h4>Enter House Details</h4>
        <div className="form-group">
          <span className="icon"><BsFillHouseDoorFill /></span>
          <input
            type="text"
            name="name"
            className="form-control"
            id="Email1"
            placeholder="House Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <span className="icon"><FaCity /></span>
          <input
            type="text"
            className="form-control"
            name="city"
            id="password"
            placeholder="City"
            onChange={handleChange}
            value={formData.city}
            required
          />
        </div>

        <div className="form-group">
          <span className="icon"><BiCodeCurly /></span>
          <input
            type="text"
            className="form-control"
            name="image"
            id="image"
            placeholder="Image URL"
            onChange={handleChange}
            value={formData.image}
            required
          />
        </div>

        <div className="form-group">
          <span className="icon"><AiFillDollarCircle /></span>
          <input
            type="text"
            className="form-control"
            name="appartment_fee"
            id="appartment_fee"
            placeholder="Visit Fee"
            onChange={handleChange}
            value={formData.appartment_fee}
            required
          />
        </div>

        <div className="form-group">
          <span className="icon"><MdDescription /></span>
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        </div>
        <button type="submit" className="add-btn">Add House</button>
        <Link to="/">
          <button type="button" aria-label="Go back"><IoCaretBackOutline /></button>
        </Link>
      </form>
    </section>
  );
};

export default AddHouse;
