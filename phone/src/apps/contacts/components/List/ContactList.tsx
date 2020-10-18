import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import { 
  Button,   
  ListItemAvatar,
  Avatar as MuiAvatar,
  List,
  ListItem,
  TextField,
  Collapse,
  makeStyles
} from "@material-ui/core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import { useFilteredContacts } from '../../hooks/useFilteredContacts';

import PhoneIcon from "@material-ui/icons/Phone";
import ChatIcon from "@material-ui/icons/Chat";
import { useContacts } from "../../hooks/useContacts";
import { useContactModal } from '../../hooks/useContactModal';

import Nui from "../../../../os/nui-events/utils/Nui";

import "../Contact.css"

const useStyles = makeStyles((theme) => ({
  updateButton: {
    margin: 'auto',
    fontSize: 14,
    width: 150,
    background: "#2196f3",
    marginBottom: 10,
    padding: 8
  },
  collapseItem: {
    margin: 'auto',
    width: '50%'
  }
}))


export const ContactList = () => {

  const classes = useStyles()

  const { filteredContacts } = useFilteredContacts();
  const { showContactModal, setShowContactModal } = useContactModal();

  const contacts = useContacts();

  const openContactInfo = () => {
    setShowContactModal(!showContactModal);
  }
  const startCall = (number) => {
    console.log(number);
    Nui.send("phone:startCall", {
      number,
    });
  };

  return (
    <List>
      {contacts.contacts.filter(contact => contact.display.includes(filteredContacts) || contact.number.includes(filteredContacts)).map((contact) => (
        <>
        <ListItem key={contact.id} divider>
          <ListItemAvatar>
            {contact.avatar ? (
              <MuiAvatar src={contact.avatar} />
            ): (
              <MuiAvatar>{contact.display.slice(0, 1).toUpperCase()}</MuiAvatar>
            )}
          </ListItemAvatar>
          <ListItemText primary={contact.display} secondary={contact.number} />
          <Button onClick={() => startCall(contact.number)}>
            <PhoneIcon />
          </Button>
          <Button
            onClick={() =>
              console.log("Message: " + contact.display, contact.number)
            }
          >
            <ChatIcon />
          </Button>
          <Button onClick={openContactInfo}>
            <FontAwesomeIcon icon={faPen} size="lg"/>
          </Button>
        </ListItem>
        <Collapse in={showContactModal} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem className={classes.collapseItem}>
              <TextField 
                value={contact.display}
              />
            </ListItem>
            <ListItem className={classes.collapseItem}>
              <TextField 
                value={contact.number}
              />
            </ListItem>
            <ListItem className={classes.collapseItem}>
              <Button className={classes.updateButton}>
                Update contact
              </Button>
            </ListItem>
          </List>
        </Collapse>
        </>
      ))}
    </List>
  );
};
