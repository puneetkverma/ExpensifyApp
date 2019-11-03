import { hideModal } from '../../actions/modal';
import Modal from './Modal';
import React from 'react';
import { connect} from 'react-redux';
import './Modal.css';

export class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.props.hideModal();
  }

  render() {
    return (
      <Modal onClose={this.onClose}>
         <div className="login">
           <h1>Login</h1>
         </div>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch(hideModal())
});

export default connect(null, mapDispatchToProps)(LoginModal);