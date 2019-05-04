import * as React from 'react';
import MenuHeader from '../Header/MenuHeader';
import {
  WithStyles, withStyles, createStyles,

} from '@material-ui/core';
import GroupButton from './Header/GroupButton';

const styles = createStyles({
});

type Props = {
}
  & WithStyles<typeof styles>;

type States = {
};

class Header extends React.PureComponent<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div >
           <MenuHeader>     <GroupButton/></MenuHeader> 
      </div>
    );
  }
}

export default withStyles(styles)(Header);
