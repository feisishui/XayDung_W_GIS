import * as React from 'react';
import { createStyles, WithStyles, withStyles, TextField, Button } from '@material-ui/core';
const styles = createStyles({
  root: { width: '100%', height: '100%' },
  buttonGroup: { display: 'flex', justifyContent: 'flex-end', marginRight: 15, marginTop: 15 }
});

type Props = {
  onSave: (value: string) => void
}
  & WithStyles<typeof styles>;

type States = {
  value: string
};

class Component extends React.PureComponent<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {
      value: ''
    };
  }
  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return <div className={classes.root}>
      <TextField
        value={value}
        fullWidth
        multiline
        placeholder="Nhập nội dung góp ý"
        variant="outlined"
        rows="3"
        onChange={this.onChange}
      />
      <div className={classes.buttonGroup}>
        <Button variant="contained" color="primary" onClick={this.props.onSave.bind(null, value)} >LƯU GÓP Ý</Button>
      </div>
    </div>;
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  }
}

export default withStyles(styles)(Component);