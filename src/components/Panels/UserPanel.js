import React, { Component } from "react";
import AvatarEditor from "react-avatar-editor";
import { ImageSpinner } from "../Spinner";

//prettier-ignore
import {
  Grid,
  Header,
  Icon,
  Dropdown,
  Image,
  Modal,
  Input,
  Button
} from "semantic-ui-react";
import firebase from "../../Config/firebase";

class UserPanel extends Component {
  state = {
    user: this.props.currentUser,
    modal: false,
    previewImage: "",
    croppedImage: "",
    blob: "",
    uploadedCroppedImage: "",
    storageRef: firebase.storage().ref(),
    userRef: firebase.auth().currentUser,
    usersRef: firebase.database().ref("users"),
    metadata: {
      contentType: "image/jpeg"
    },
    isLoading: false
  };

  openModal = () => {
    this.setState({ modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong> {this.state.user.displayName}</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "avatar",
      text: <span onClick={this.openModal}>Change Avatar</span>
    },
    {
      key: "signout",
      text: <span onClick={this.handleSignOut}>Sign Out</span>
    }
  ];

  handleChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        this.setState({ previewImage: reader.result });
      });
    }
  };

  handleCropImage = () => {
    if (this.avatarEditor) {
      this.avatarEditor.getImageScaledToCanvas().toBlob(blob => {
        let imageUrl = URL.createObjectURL(blob);
        this.setState({
          croppedImage: imageUrl,
          blob
        });
      });
    }
  };

  uploadCroppedImage = () => {
    const { storageRef, userRef, blob, metadata } = this.state;
    this.setState({ isLoading: true });
    storageRef
      .child(`avatars/users/${userRef.uid}`)
      .put(blob, metadata)
      .then(snap => {
        snap.ref.getDownloadURL().then(downloadURL => {
          this.setState({ uploadedCroppedImage: downloadURL }, () =>
            this.changeAvatar()
          );
        });
      });
  };

  changeAvatar = () => {
    this.state.userRef
      .updateProfile({
        photoURL: this.state.uploadedCroppedImage
      })
      .then(() => {
        console.log("photoUrl updated");
        this.closeModal();
        this.setState({ isLoading: false });
      })
      .catch(err => {
        console.error(err);
      });

    this.state.usersRef
      .child(this.state.user.uid)
      .update({ avatar: this.state.uploadedCroppedImage })
      .then(() => {
        console.log("User Avatar updated");
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("signed out"));
  };

  render() {
    const { user, modal, previewImage, croppedImage, isLoading } = this.state;
    const { primaryColor } = this.props;
    return (
      <div>
        <Grid style={{ background: primaryColor }}>
          <Grid.Column>
            <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
              {/* App Header */}
              <Header inverted floated="left" as="h2">
                <Icon name="code" />
                <Header.Content>Myprojs</Header.Content>
              </Header>

              {/* User Dropdown */}

              <Header style={{ padding: "0.25em" }} as="h4" inverted>
                <Dropdown
                  trigger={
                    <span>
                      <Image src={user.photoURL} spaced="right" avatar />
                      {user.displayName}
                    </span>
                  }
                  options={this.dropdownOptions()}
                />
              </Header>
            </Grid.Row>

            {/* Change User Avatar Modal*/}

            <Modal basic open={modal} onClose={this.closeModal}>
              {isLoading ? (
                <ImageSpinner />
              ) : (
                  <React.Fragment>
                    <Modal.Header>Change Avatar</Modal.Header>
                    <Modal.Content>
                      <Input
                        onChange={this.handleChange}
                        fluid
                        type="file"
                        label="New Avatar"
                        name="previewImage"
                      />
                      <Grid centered stackable columns={2}>
                        <Grid.Row centered>
                          <Grid.Column className="ui center aligned grid">
                            {previewImage && (
                              <AvatarEditor
                                ref={node => (this.avatarEditor = node)}
                                image={previewImage}
                                width={250}
                                heigh={250}
                                border={50}
                                scale={1.2}
                              />
                            )}
                          </Grid.Column>
                          <Grid.Column>
                            {croppedImage && (
                              <Image
                                style={{ margin: "3.5em auto" }}
                                width={250}
                                heigh={250}
                                src={croppedImage}
                              />
                            )}
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                      {croppedImage && (
                        <Button
                          color="green"
                          inverted
                          onClick={this.uploadCroppedImage}
                          disabled={isLoading}
                        >
                          <Icon name="save" /> Change Avatar
                      </Button>
                      )}
                      <Button
                        color="blue"
                        inverted
                        onClick={this.handleCropImage}
                      >
                        <Icon name="image" /> Preview
                    </Button>
                      <Button color="red" inverted onClick={this.closeModal}>
                        <Icon name="remove" /> Cancel
                    </Button>
                    </Modal.Actions>
                  </React.Fragment>
                )}
            </Modal>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default UserPanel;
