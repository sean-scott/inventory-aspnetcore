import React, { Component } from 'react';
import { Modal, IconButton } from 'office-ui-fabric-react';

import styles from './styles';

class GenericModal extends Component {
  constructor(props) {
    super(props);

    this.close = this.close.bind(this);
  }

  close() {
    this.props.onClose();
  }

  render() {
    if (!this.props.isOpen) {
      return null;
    }
    return (
      <Modal
        isOpen={this.props.isOpen}
        onDismiss={this.close}>
        <div className="container" style={styles.modal}>
          <div className="row">
            <div className="col">
              <h3>{this.props.title}</h3>
            </div>
            <div className="col" style={styles.closeButton}>
              <IconButton 
                iconProps={{iconName: 'ChromeClose'}}
                onClick={this.close}/>
            </div>
          </div>
          {this.props.children}
        </div>
      </Modal>
    )
  }
}

export default GenericModal