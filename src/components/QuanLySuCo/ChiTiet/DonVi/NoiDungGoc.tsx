import * as React from 'react';
import { createStyles, WithStyles, withStyles, Typography } from '@material-ui/core';
import AttachmentComponent from '../../../material-ui/AttachmentComponent';
const styles = createStyles({
  root: {}
});

type Props = {
  yKienChiDao: string | null;
  hinhAnhs: __esri.AttachmentInfo[]
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
    const { classes, yKienChiDao, hinhAnhs } = this.props;
    return <div className={classes.root}>
      {yKienChiDao && <Typography>Ý kiến chỉ đạo: <strong>{yKienChiDao}</strong></Typography>}
      <AttachmentComponent attachments={hinhAnhs} />
    </div>
  }
}

export default withStyles(styles)(Component);