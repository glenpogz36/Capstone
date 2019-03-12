import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import UserPanel from "./UserPanel";
import Channels from "../Channels/Channels";
import Starred from "../Channels/Starred";
import DirectMessages from "../Channels/DirectMessages";

export default class SlidePanel extends Component {
  render() {
    const { currentUser, primaryColor } = this.props;
    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ background: primaryColor, fontsize: "1.2rem" }}
      >
        <UserPanel primaryColor={primaryColor} currentUser={currentUser} />
        <Starred currentUser={currentUser} />
        <Channels currentUser={currentUser} />
        <DirectMessages currentUser={currentUser} />
      </Menu>
    );
  }
}
