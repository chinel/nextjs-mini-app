import { Fragment } from "react";
import Notification from "../ui/notification";
import MainHeader from "./main-header";

function Layout(props) {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      <Notification />
    </Fragment>
  );
}

export default Layout;
