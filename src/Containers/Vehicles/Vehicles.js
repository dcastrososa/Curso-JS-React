import React from 'react';
import { Table, Modal, Button, Popconfirm } from 'antd';
import { Cars } from './../../cars';
import { success } from './../../utility';

const { Column, ColumnGroup } = Table;

class Vehicles extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      showFormNewVehicle: false
    }
    this.delete = this.delete.bind(this);
    this.switchFormNewVehicle = this.switchFormNewVehicle.bind(this);
  }

  componentDidMount() {
    let data = []
    Cars.getCars().forEach( (car, i) => {
      car.key = i;
      data.push((car))
    })
    this.setState({cars: data})
  }

  delete(index) {
    let cars = [...this.state.cars];
    cars.splice(index, 1);
    this.setState({cars: cars});
    success('El vehiculo ha sido eliminado de la lista.')
  }

  switchFormNewVehicle() {
    this.setState({showFormNewVehicle: !this.state.showFormNewVehicle})
  }

  render() {
    return (
      <>
        <Table dataSource={this.state.cars}>
          <ColumnGroup title="Cars">
            <Column
              title="Brand"
              dataIndex="brand"
              key="brand"
            />
            <Column
              title="Year"
              dataIndex="year"
              key="year"
            />
          </ColumnGroup>
          <Column
            title="Action"
            key="action"
            render={(record) => (
              <Popconfirm title="Esta seguro de eliminar este vehiculo de la lista?" okText="Yes" cancelText="No" onConfirm={this.delete.bind(this, record.key)}>
                <Button>Eliminar</Button>
              </Popconfirm>
            )}
          />
        </Table>

        <Button onClick={this.switchFormNewVehicle}>New Vehicle</Button>

        <Modal
        title="Basic Modal"
        visible={this.state.showFormNewVehicle}
        onOk={this.handleOk}
        onCancel={this.switchFormNewVehicle}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </>
    )
  }
}

export default Vehicles;