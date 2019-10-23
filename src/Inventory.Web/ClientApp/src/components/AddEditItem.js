import React, { Component } from 'react';
import { PrimaryButton, Stack, TextField } from 'office-ui-fabric-react';
import GenericModal from './GenericModal'

class AddEditItem extends Component {

  constructor(props) {
    super(props);

    this.initialState = {
      name: '',
      value: '',
      nameValid: false,
      valueValid: true,
      formValid: false,
      formErrors: {
        name: '',
        value: ''
      }
    };

    this.state = JSON.parse(JSON.stringify(this.initialState));

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.validateField = this.validateField.bind(this);
  }

  /**
   * Validates the entire form.
   */
  validateForm() {
    this.setState({formValid: this.state.nameValid && this.state.valueValid});
  }

  /**
   * Validates a field in the form.
   * @param {*} fieldName The name of the input.
   * @param {*} value The value provided for the property.
   */
  validateField(fieldName, value) {
    let formErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let valueValid = this.state.valueValid;

    switch (fieldName) {
      case 'name':
        nameValid = value ? true : false;
        formErrors.name = nameValid ? '' : 'Required';
        break;
      case 'value':        
        if (value) {
          if (isNaN(value)) {
            valueValid = false;
            formErrors.value = 'Must be a number';
            break;
          }

          valueValid = value.match(/^\s*-?\d+(\.\d{1,2})?\s*$/);
          formErrors.value = valueValid ? '' : 'Must be only two decimal places';
        } else {
          valueValid = true;
          formErrors.value = '';
        }
        break;
      default:
        break;
    }

    this.setState({
      formErrors: formErrors,
      nameValid: nameValid,
      valueValid: valueValid
    }, this.validateForm);
  }

  /**
   * Handles a change on the input and validates the field.
   * @param {*} e 
   */
  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({[name]: value},
      () => this.validateField(name, value));
  }

  async onSubmit(e) {
    e.preventDefault();

    // Inspect each field in case it was not touched
    let elements = e.target.elements;

    for (let i = 0; i < elements.length; i++) {
      if (elements[i].name) {
        this.validateField(elements[i].name, elements[i].value);
      }
    }

    // Everything was validated successfully, post the data
    if (this.state.formValid) {
      const response = await fetch('item', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.name,
          value: +this.state.value
        })
      });

      const data = await response.json();

      if (data.id) {
        this.setState(this.initialState);
        this.props.onClose();
      }
    }
  }

  render () {
    return (
      <GenericModal
        title="Add Item"
        isOpen={this.props.isOpen}
        onClose={() => { this.setState(this.initialState); this.props.onClose(); }}>
        <form 
          noValidate
          onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col">
              <Stack {...{tokens: { childrenGap: 15 }}}>
                <TextField 
                  label="Name" 
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  required
                  errorMessage={this.state.formErrors.name}
                  validateOnLoad={false}
                  validateOnFocusOut
                  />
                <TextField
                  label="Value"
                  name="value"
                  value={this.state.value}
                  onChange={this.onChange}
                  errorMessage={this.state.formErrors.value}
                  validateOnLoad={false}
                  validateOnFocusOut
                  />
                <Stack.Item align="end">
                  <PrimaryButton 
                    type="submit"
                    text="Save"/>
                </Stack.Item>
              </Stack>
            </div>
          </div>
        </form>
      </GenericModal>
    )
  }
}

export default AddEditItem