import React, { Component } from 'react';
import { DetailsList, SelectionMode } from 'office-ui-fabric-react';

export class Home extends Component {
  static displayName = Home.name;  

  constructor(props) {
    super(props);

    this.state = {
      data: {}
    };

    this.populateItemData = this.populateItemData.bind(this);
  }

  // todo - move to service to track a cached list of items that can be updated by the modal
  async populateItemData() {
    const response = await fetch('item');
    let data = await response.json();

    this.setState({
      data: data
    });
  }

  componentDidMount() {
    this.populateItemData();
  }  

  render () {
    return (
      <div>
        <DetailsList 
          items={this.state.data}
          columns={[
            {
              key: 'col1',
              name: 'Name',
              fieldName: 'name'
            },
            {
              key: 'col2',
              name: 'Value',
              fieldName: 'value',
              data: 'number'
            }
          ]}
          selectionMode={SelectionMode.none}
        />
      </div>
    );
  }
}
