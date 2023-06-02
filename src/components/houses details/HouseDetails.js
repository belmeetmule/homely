import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { IoCaretBackOutline } from 'react-icons/io5';
import { AiOutlineRightCircle, AiOutlineRight } from 'react-icons/ai';
import { fetchHouseById } from '../../Redux/Reducers/houseDetailsSlice';
import icon from '../../images/icon.png';
import './HouseDetails.scss';

const HousesDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const house = useSelector((state) => state.houseDetail.house);

  useEffect(() => {
    dispatch(fetchHouseById(id));
  }, [dispatch, id]);

  return (
    <section className="details-sec">
      {house ? (
        <div className="detail-container">
          <div className="image">
            <img src={house.image} alt={house.name} />
          </div>
          <div className="details">
            <h5 className="name">{house.name}</h5>
            <div className="ulIcon">
              <ul>
                <li className="first">
                  <p>City: </p>
                  <p>{house.city}</p>
                </li>
                <li className="first">
                  <p>House ID: </p>
                  <p>{house.id}</p>
                </li>
                <li className="first">
                  <p>Daily Rent:</p>
                  <p>
                    $
                    {house.appartment_fee}
                  </p>
                </li>
              </ul>
              <div className="iconColor">
                <h4>
                  DISCOVER MORE COLORS
                  <AiOutlineRight />
                </h4>
                <img src={icon} alt="icon" />
              </div>
              <Link to={`/reservation/${id}`}>
                <button type="button" aria-label="Go back" className="reserve-btn">
                  Book Your Visit
                  <AiOutlineRightCircle />
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div> // Display a loading message while waiting for API call to complete
      )}
      <Link to="/">
        <button type="button" aria-label="Go back" className="back-btn"><IoCaretBackOutline /></button>
      </Link>
    </section>
  );
};

HousesDetails.propTypes = {
  id: PropTypes.string.isRequired,
}.isRequired;

export default HousesDetails;
