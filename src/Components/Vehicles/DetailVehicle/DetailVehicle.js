import React from 'react';
import {Row} from 'antd';

const DetailVehicle = props => {
  const {vehicle} = props;
  return (
    <Row>
      <p><strong>Marca:</strong> <span>{vehicle.brand}</span></p>
      <p><strong>Año:</strong> <span>{vehicle.year}</span></p>
      <p><strong>Origen:</strong> <span>{vehicle.madein}</span></p>
      <p><strong>Velocidad máxima:</strong> <span>{vehicle.maxspeed}</span></p>
      <p><strong>Estado:</strong> <span>{vehicle.status === 1 ? 'Activo' : 'Inactivo'}</span></p>
      <p><strong>Descripcion:</strong> <span>{vehicle.description}</span></p>
      <p><strong>Colores disponibles:</strong> <span>{vehicle.colors}</span></p>
      <p><strong>Cantidad de puertas:</strong> <span>{vehicle.ports}</span></p>
    </Row>
  )
}

export default DetailVehicle;