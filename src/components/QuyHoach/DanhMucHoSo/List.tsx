import * as React from 'react';
import { createStyles, WithStyles, withStyles, List, ListSubheader, ListItem, ListItemText, Typography } from '@material-ui/core';
import { DanhMucHoSo } from '../../../services/map/quy-hoach/models/danhmuchoso.model';
const styles = createStyles({
  root: {}
});

type Props = {
  title: string,
  danhMucHoSos: DanhMucHoSo[]
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
    const { classes, title, danhMucHoSos } = this.props;
    return <List
      component="nav"
      subheader={<ListSubheader component="div">{title}</ListSubheader>}
      className={classes.root}
    >
      {
        danhMucHoSos.length == 0 && <Typography>Không có hồ sơ</Typography>
      }
      {
        danhMucHoSos
          .map((m, index) =>
            <ListItem key={index} button>
              <ListItemText primary={m.TenHoSo || 'Chưa có tên'} />
            </ListItem>)
      }
    </List>;
  }
}

export default withStyles(styles)(Component);