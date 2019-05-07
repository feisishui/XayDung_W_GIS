import * as React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import DetailComponent from './DetailComponent';
import SuCoThongTin from '../../../services/map/SuCo/models/sucothongtin.model';

const styles = createStyles({
  root: {

  }
});

type Props = {
  datas: SuCoThongTin[]
}
  & WithStyles<typeof styles>;

class DetailsComponent extends React.Component<Props, {}>{
  render() {
    const { classes, datas } = this.props;
    return <div className={classes.root}>
      {
        datas.map((m,index) => <DetailComponent key={m.MaSCTT || index} data={m} />)
      }
    </div>
  }
}

export default withStyles(styles)(DetailsComponent);