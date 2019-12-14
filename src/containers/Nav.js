import { connect } from 'react-redux';
import Nav from '../components/Nav';

const mapStateToProps = state => ({
  // state.shopping.categoriesをprops.categoriesに紐付け
  categories: state.shopping.categories
});

export default connect(mapStateToProps)(Nav);
