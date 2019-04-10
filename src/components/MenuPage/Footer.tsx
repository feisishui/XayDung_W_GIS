import * as React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
const styles = createStyles({
  root: {
    display: 'flex',
    textAlign: 'center',
    position: 'absolute',
    bottom: 15,
    justifyContent: 'center',
    width: '100%'
  },
  link: {
    margin: '0 7px 0 7px'
  }
});

type Props = {

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
    const { classes } = this.props;
    return <div className={classes.root}>
      {/* {links.map((m, index) => <div key={index} className={classes.link}><a href={m.url} target="_blank">{m.title}</a></div>)} */}
    </div>;
  }
}

export default withStyles(styles)(Component);