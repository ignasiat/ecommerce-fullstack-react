import React from 'react';
import { Link } from 'react-router-dom';
import constants from '../../constants';
import './footer.scss';

export default function Footer() {
  return (
    <nav>
      <Link to="/">{constants.SHOP}</Link>
      <Link to="/products">{constants.PRODUCT_DETAIL}</Link>
    </nav>
  );
}
