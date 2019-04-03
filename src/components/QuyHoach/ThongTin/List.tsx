import * as React from 'react';
import {
  createStyles,
  WithStyles, withStyles,
  List,
  ListSubheader,
  ListItemText,
  Theme,
  Typography
} from '@material-ui/core';
import ListItem from './ListItem';


const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    textAlign: 'center',
    '& i':{
      marginRight:5
    }
  }
});

type Props = {

}
  & WithStyles<typeof styles>;

type States = {

};

class Component extends React.Component<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const { classes } = this.props;
    return <List
      component="nav"
      subheader={
        <ListSubheader component="div">
          <Typography className={classes.title} color="primary" variant="title">
            <i className="fas fa-globe-asia"></i>TP. Thủ Dầu Một
          </Typography>
          Danh mục tra cứu thông tin quy hoạch
      </ListSubheader>}
      className={classes.root}
    >
      <ListItem title="Quy hoạch vùng" />
      <ListItem title="Quy hoạch phân khu" />
      <ListItem title="Quy hoạch chi tiết" />
      <ListItem title="Quy hoạch nông thôn" />
    </List>;
  }



}

export default withStyles(styles)(Component);