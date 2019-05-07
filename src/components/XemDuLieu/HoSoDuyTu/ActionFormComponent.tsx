import * as React from 'react';
import { createStyles, WithStyles, withStyles, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
const styles = createStyles({
  root: { display: 'flex', flexDirection: 'row' }
});

type Props = {
  onClear?: () => void,
  onSubmit?: () => void
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
    const { classes, onClear: onClose, onSubmit } = this.props;
    return <div className={classes.root}>
      <div>
        <Button fullWidth variant="text" onClick={() => onClose && onClose()}>Xóa trắng</Button>
      </div>
      <div>
        <Button fullWidth variant="contained" color="primary" onClick={() => onSubmit && onSubmit()}><AddIcon /> Thêm mới</Button>
      </div>
    </div>
  }
}

export default withStyles(styles)(Component);