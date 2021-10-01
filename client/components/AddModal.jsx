import React, { Component } from 'react';
import InventoryAddForm from "./InventoryAddForm.jsx";
import CatalogAddForm from './CatalogAddForm.jsx';
import { Button } from '@material-ui/core';

class AddModal extends Component {

    constructor(props) {
      super(props);
      
      this.state = {
        showModal: false,
      }
      
      this.showModal = this.showModal.bind(this);
    }
    
    showModal(event) {
      event.preventDefault();
      
      this.state.showModal ? (this.setState({showModal: false,})) : (this.setState({showModal: true,}))
    }

    render() {
      let addForm;
      let buttonName;
      if (this.props.table === 'inventory') {
        addForm = <InventoryAddForm getData = {this.props.getData} closeModal = {this.showModal}/>
        buttonName = 'Add Item'
      }
      else if (this.props.table === 'catalog') {
        addForm = <CatalogAddForm getData={this.props.getData} closeModal = {this.showModal} data={this.props.data}/>
        buttonName = "Add Product"
      }
      
      return(
          <div className="modalButton">
            <Button variant="outlined" color="secondary" size="small" onClick={this.showModal}>{buttonName}</Button>
        {
          this.state.showModal
            ? (
              <div className = "modal">
                <div className = "modalContent">
                  <div className = "modalBody">
                    {addForm}
                    <div className="exitButton">
                    <Button onClick={this.showModal} variant="outlined" color="secondary" size="small">Exit</Button>
                    </div>
                  </div>
                </div>
              </div>
            )
            : (
              null
            )
        }
        </div>
        )
    }
  }

export default AddModal;