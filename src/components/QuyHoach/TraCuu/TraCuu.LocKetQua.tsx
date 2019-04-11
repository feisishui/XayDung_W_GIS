import * as React from 'react';
import { createStyles, WithStyles, withStyles, TextField } from '@material-ui/core';
const styles = createStyles({
  root: {}
});

type Props = {
  value: string,
  filter: (textSearch: string) => void
}
  & WithStyles<typeof styles>;

type States = {

};

class Component extends React.PureComponent<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const { classes, value } = this.props;
    return <TextField
      fullWidth
      value={value}
      onChange={e => this.props.filter(e.target.value)}
      placeholder="Nhập nội dung lọc" />;
  }
}

export default withStyles(styles)(Component);