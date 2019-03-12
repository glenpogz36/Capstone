import React, { Component } from "react";
import firebase from "../../Config/firebase";
import { setColors } from "../../Actions";
import { connect } from "react-redux";
import { Popup } from "semantic-ui-react";
import {
  Sidebar,
  Divider,
  Menu,
  Button,
  Modal,
  Icon,
  Label,
  Segment
} from "semantic-ui-react";
import { CompactPicker } from "react-color";

class ColorPanel extends Component {
  state = {
    modal: false,
    primary: "",
    secondary: "",
    user: this.props.currentUser,
    usersRef: firebase.database().ref("users"),
    userColors: []
  };

  componentDidMount() {
    if (this.state.user) {
      this.addListener(this.state.user.uid);
    }
  }

  componentWillUnmount(){
    this.removeListener()
  }

  removeListener = () => {
    this.state.usersRef.child(`${this.state.user.uid}/colors`).off()
  }

  addListener = userId => {
    let userColors = [];
    this.state.usersRef.child(`${userId}/colors`).on("child_added", snap => {
      userColors.unshift(snap.val());
      this.setState({ userColors });
    });
  };

  openModal = () => {
    this.setState({ modal: true });
  };
  closeModal = () => {
    this.setState({ modal: false });
  };

  handleChangePrimary = color => {
    this.setState({ primary: color.hex });
  };

  handleChangeSecondary = color => {
    this.setState({ secondary: color.hex });
  };

  handleSaveColor = () => {
    if (this.state.primary && this.state.secondary) {
      this.saveColors(this.state.primary, this.state.secondary);
    }
  };

  saveColors = (primary, secondary) => {
    this.state.usersRef
      .child(`${this.state.user.uid}/colors`)
      .push()
      .update({
        primary,
        secondary
      })
      .then(() => {
        console.log("colors added");
        this.closeModal();
      })
      .catch(err => console.log(err));
  };

  displayUserColors = colors =>
    colors.length > 0 &&
    colors.map((color, i) => (
      <React.Fragment key={i}>
        <Divider />

        <Popup
          trigger={
            <div
              className="color__container"
              onClick={() =>
                this.props.setColors(color.primary, color.secondary)
              }
            >
              <div
                className="color__square"
                style={{ background: color.primary }}
              >
                <div
                  className="color__overlay"
                  style={{ background: color.secondary }}
                />
              </div>
            </div>
          }
          content={"Set Color"}
        />
      </React.Fragment>
    ));

  render() {
    const { modal, primary, secondary, userColors } = this.state;
    return (
      <Sidebar
        as={Menu}
        icon="labeled"
        inverted
        vertical
        visible
        width="very thin"
      >
        <Divider />
        <Button icon="add" size="small" color="blue" onClick={this.openModal} />
        {this.displayUserColors(userColors)}
        {/* Color Picker Modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Choose App Color</Modal.Header>
          <Modal.Content>
            <Segment inverted>
              <Label content="Primary Color" />
              <CompactPicker
                color={primary}
                onChange={this.handleChangePrimary}
              />
            </Segment>
            <Segment inverted>
              <Label content="Secondary Color" />
              <CompactPicker
                color={secondary}
                onChange={this.handleChangeSecondary}
              />
            </Segment>
          </Modal.Content>

          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSaveColor}>
              <Icon name="checkmark" /> Save Colors
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </Sidebar>
    );
  }
}

export default connect(
  null,
  { setColors }
)(ColorPanel);
