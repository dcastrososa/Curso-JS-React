import React from 'react';
import { Table, Modal, Button, Popconfirm, Spin } from 'antd';
import { Cars } from './../../cars';
import { success, error, searchIndexCars } from './../../utility';
import DetailVehicle from './../../Components/Vehicles/DetailVehicle/DetailVehicle';
import NewVehicle from './../../Components/Vehicles/NewVehicle/NewVehicle';

const { Column, ColumnGroup } = Table;

class Vehicles extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cars: [], // vehiculos que se muestran en la lista
      showFormNewVehicle: false, // se muestra el modal de formulario de nuevo vehiculo?
      showDetailVehicle: false, // se muestra el modal de detalle de vehiculo?
      vehicleCurrent: {}, // vehiculo que se mostrar en el "DetailVehicle Component"
      loading: true, // se esta cargando la data?
      deleting: false, // se esta eliminando un registro?
      editing: false // se esta editanto un registro?
    }

    // a cada "vehiculo" le agrega una "key" (es necesario para Table Component segun el enfoque que estoy usando)
    // (no investigue la manera de no tener que hacer esto)
    this.orderCars = this.orderCars.bind(this); 
    this.delete = this.delete.bind(this); // eliminar un vehiculo
    this.switchFormNewVehicle = this.switchFormNewVehicle.bind(this); // muestra u oculta el formulario de nuevo vehiculo
    this.switchDetailVehicle = this.switchDetailVehicle.bind(this); // muestra u oculta el detalle de vehiculo
    this.updateStatus = this.updateStatus.bind(this); // actualiza el estado de un vehiculo (activar o desactivar)
    this.vehicleSaved = this.vehicleSaved.bind(this); // accion al guardar un vehiculo
  }

  componentDidMount() {
    this.orderCars()
  }

  orderCars() {
    let data = []
    Cars.getCars().forEach( (car, i) => {
      car.key = car.id;
      data.push((car))
    })
    this.setState({cars: data, loading: false});
  }

  updateStatus(key, newStatus) {
    let cars = [...this.state.cars]
    const index = searchIndexCars(key, cars);
    cars[index].editing = true;
    this.setState({cars: cars, editing: true})

    setTimeout(() => {
      try {
        cars[index].status = newStatus;
        cars[index].editing = false;
        this.setState({cars: cars, editing: false})
        success(`El vehiculo ha sido ${newStatus === 1 ? 'Activado' : 'Desactivado'}`)
      }catch(err) {
        error('Vaya ;(, algo salio mal')
      }
    }, 5000)
  }

  delete(key) {
    let prevCars = [...this.state.cars];
    const index = searchIndexCars(key, prevCars);
    prevCars[index].deleting = true;
    this.setState({prevCars: prevCars, deleting: true})

    setTimeout(() => {
      try {
        prevCars[index].deleting = true;
        prevCars.splice(index, 1)
        this.setState({cars: prevCars, deleting: false});
        success('El vehiculo ha sido eliminado de la lista.')
      }catch(err) {
        error('Vaya ;(, algo salio mal')
      }
    }, 3000)
  }

  vehicleSaved() {
    this.switchFormNewVehicle();
    this.orderCars();
    success('Se ha agregado un nuevo vehiculo a la lista.')
  }

  switchFormNewVehicle() {
    this.setState({showFormNewVehicle: !this.state.showFormNewVehicle})
  }

  switchDetailVehicle(vehicle) {
    this.setState({showDetailVehicle: !this.state.showDetailVehicle, vehicleCurrent: vehicle})
  }

  render() {
    const {vehicleCurrent, showFormNewVehicle, loading, cars, deleting, editing} = this.state;

    if (loading) {
      return (
        <div className="wrappe">
          <p className="title">Lista de Vehiculos</p>
          <Spin />  
        </div>
      )
    }

    return (
      <div className="wrappe">
        <p className="title">Lista de Vehiculos</p>
        <Table dataSource={cars}>
          <ColumnGroup>
            <Column
              title="Marca"
              dataIndex="brand"
              key="brand"
            />
            <Column
              title="Año"
              dataIndex="year"
              key="year"
            />
            <Column
              title="Origen"
              dataIndex="madein"
              key="madein"
            />
            <Column
              title="Velocidad máxima"
              key="maxspeed"
              render={(record) => (
                (`${record.maxspeed} km`)
              )}
            />
            <Column
              title="Estado"
              key="status"
              render={(record) => (
                (record.status === 1 ? "Activo" : "Inactivo")
              )}
            />
          </ColumnGroup>
          <Column
            render={(record) => (
              // No quiero que se puedan ver los detalles si se esta eliminando o editando
              <Button onClick={this.switchDetailVehicle.bind(this, record)} disabled={record.deleting || record.editing}>Ver detalles</Button>
            )}
          />
          <Column
            render={(record) => (
              (record.status === 0 ? 
                // No quiero que el usuario pueda dar click a este vehiculo si se esta eliminando algun registro
                <Button type="primary" onClick={this.updateStatus.bind(this, record.key, 1)} loading={record.editing} disabled={deleting}>Activar</Button> : 
                <Button type="danger" onClick={this.updateStatus.bind(this, record.key, 0)} loading={record.editing} disabled={deleting}>Desactivar</Button>
              )
            )}
          />
          <Column
            render={(record) => (
              <Popconfirm title="Esta seguro de eliminar este vehiculo de la lista?" okText="Yes" cancelText="No" onConfirm={this.delete.bind(this, record.key)}>
                {/* No quiero que el usuario pueda dar click a este boton si esta eliminado otro registro O si se esta editando alguno */}
                <Button type="danger" loading={record.deleting} disabled={(deleting && !record.deleting) || (editing)}>Eliminar</Button>
              </Popconfirm>
            )}
          />
        </Table>

        <Button type="primary" onClick={this.switchFormNewVehicle} className="btnNewVehicle">Crear Vehiculo</Button>

        <Modal
        title="Nuevo Vehiculo"
        visible={showFormNewVehicle}
        destroyOnClose={true}
        onCancel={this.switchFormNewVehicle}
        footer={[]}
        >
          <NewVehicle onSave={this.vehicleSaved} />
        </Modal>

        <Modal
        title="Detalles"
        visible={this.state.showDetailVehicle}
        onCancel={this.switchDetailVehicle}
        footer={[
          <Button key="submit" type="primary" onClick={this.switchDetailVehicle.bind(this, {})}>Ok</Button>
        ]}>
          <DetailVehicle vehicle={vehicleCurrent} />
        </Modal>
      </div>
    )
  }
}

export default Vehicles;
