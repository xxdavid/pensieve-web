import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, Modal, TextArea, Label, Input } from "semantic-ui-react";

import './AddCardModal.css';

class AddItemModal extends Component {
  state = { front: "", back: "", notes: "", numCards: 0 };

  frontSideTextArea = React.createRef();

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onClose = () => {
    this.props.onClose();
    this.setState(state => ({ front: "", back: "", notes: "", numCards: 0 }));
  };

  onSubmit = () => {
    const { front, back, notes } = this.state;
    this.props.onSubmit({ front, back, notes });
    this.setState(state => ({ front: "", back: "", notes: "", numCards: state.numCards + 1 }));
    this.frontSideTextArea.current.focus();
  };

  onKeyDown = (e) => {
    if (e.key === 'Enter' && e.metaKey) {
      this.onSubmit();
    }
  }

  render() {
    const { front, back, notes, numCards } = this.state;
    const { open } = this.props;

    return (
      <Modal open={open} onClose={this.onClose} size="tiny" className="position-relative">
        <Modal.Header>
          <div className="d-flex justify-content-between">
            <div>Create Cards</div>
            {numCards > 0 && <Label>+{numCards} cards</Label>}
          </div>
        </Modal.Header>
        <Modal.Content>
          <Form onKeyDown={this.onKeyDown}>
            <Form.Field required>
              <label htmlFor="front">Front</label>
              <TextArea
                value={front}
                onChange={this.onChange}
                ref={this.frontSideTextArea}
                name="front"
                autoFocus
                autoHeight
                rows={2}
                placeholder="Add to the card front..."
                className="card-textarea-front"
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="back">Back</label>
              <TextArea
                onChange={this.onChange}
                value={back}
                name="back"
                autoHeight
                rows={4}
                placeholder="Add to the card back..."
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="notes">Notes</label>
              <Input
                onChange={this.onChange}
                value={notes}
                name="notes"
                placeholder="Additional notes..."
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.onClose}>Cancel</Button>
          <Button onClick={this.onSubmit} primary>
            Create Card
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

AddItemModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddItemModal;
