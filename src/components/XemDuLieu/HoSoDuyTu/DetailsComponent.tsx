import * as React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import DetailComponent from './DetailComponent';
import { HoSoDuyTu } from '../../../services/map/QuanLyMangLuoi/model';

const styles = createStyles({
  root: {

  }
});

type Props = {
  datas: HoSoDuyTu[]
}
  & WithStyles<typeof styles>;

class DetailsComponent extends React.Component<Props, {}>{
  render() {
    const { classes, datas } = this.props;
    return <div className={classes.root}>
      {
        datas.map(m => <DetailComponent key={m.OBJECTID} data={m} />)
      }
    </div>
  }
}

export default withStyles(styles)(DetailsComponent);