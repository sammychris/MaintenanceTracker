import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Header from './Header';
import AsideNav from './AsideNav';
import RequestList from './RequestList';
import NewRequestForm from './NewRequestForm';
import PopUpMessage from './PopUpMessage';
import ShowRequest from './ShowRequest';

// export const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     localStorage.getItem('user')
//       ? <Component {...props} />
//       : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//   )} />
// );

export {
  PrivateRoute,
  PublicRoute,
  Header,
  AsideNav,
  RequestList,
  NewRequestForm,
  PopUpMessage,
  ShowRequest,
};
