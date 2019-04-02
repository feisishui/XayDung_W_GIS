import * as React from 'react';
import { createStyles, WithStyles, withStyles,  Icon } from '@material-ui/core';
import Button from './ButtonComponent';
const styles = createStyles({
  root: {}
});

type Props = {

}
  & WithStyles<typeof styles>;

type States = {

};

class ButtonComponent extends React.Component<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const { classes } = this.props;
    return <div className={classes.root}>
      <Button >Thông tin quy hoạch</Button>
      <Button >Góp ý quy hoạch</Button>
      <Button >Công bố quy hoạch</Button>
      <Button >Lưu trữ quy hoạch</Button>
      <Button >Tra cứu quy hoạch</Button>
    </div>;
  }
}
export default withStyles(styles)(ButtonComponent);