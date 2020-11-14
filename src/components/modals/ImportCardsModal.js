import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, Modal, TextArea, } from "semantic-ui-react";

class ImportCardsModal extends Component {
  state = { text: "" };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onClose = () => {
    this.props.onClose();
    this.setState(state => ({ text: "" }));
  };

  onSubmit = () => {
    const { text } = this.state;
    if (text) {
      this.props.onSubmit(text);
    }
    this.setState(state => ({ text: "" }));
    this.props.onClose();
  };

  render() {
    const { text } = this.state;
    const { open } = this.props;

    return (
      <Modal open={open} onClose={this.onClose} size="tiny" className="position-relative">
        <Modal.Header>
          <div className="d-flex justify-content-between">
            <div>Import Cards</div>
          </div>
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field required>
              <label htmlFor="text">Content</label>
              <TextArea
                value={text}
                onChange={this.onChange}
                name="text"
                autoFocus
                autoHeight
                rows={4}
                placeholder="Cat,die Katze"
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.onClose}>Cancel</Button>
          <Button onClick={this.onSubmit} primary>
            Import
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

ImportCardsModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ImportCardsModal;
