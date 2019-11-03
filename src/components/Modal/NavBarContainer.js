/** Action-creators */
import { loadModal } from '../../actions/modal';
import React from 'react';
import { connect} from 'react-redux';
import NavBar from './NavBar.js';

/** Modal Type Constant */
// import { LOGIN_MODAL } from '../modals/modaltypes';

// const MODAL_COMPONENTS = {
//     LOGIN_MODAL: LoginModal
//   };

export class NavBarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.showLoginMenu = this.showLoginMenu.bind(this);
  }

  showLoginMenu() {
    this.props.loadModal('LOGIN_MODAL');
  }

  render() {
    return (
      <NavBar
        showLoginMenu={this.showLoginMenu}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadModal: modelType => dispatch(loadModal(modelType))
});

export default connect(null, mapDispatchToProps)(NavBarContainer);