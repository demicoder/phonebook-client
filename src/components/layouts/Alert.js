import React, { useContext } from 'react';
import { AlertContext } from '../../context/alert/alertContext';
import './scss/Alert.scss';

const Alerts = () => {
  const { alerts } = useContext(AlertContext);

  return (
    alerts.length > 0 &&
    alerts.map((alertItem) => (
      <div key={alertItem.id} className={`alert alert__${alertItem.type}`}>
        {alertItem.msg}
      </div>
    ))
  );
};

export default Alerts;
