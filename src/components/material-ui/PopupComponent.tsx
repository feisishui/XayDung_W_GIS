import * as React from 'react';
import { createStyles, WithStyles, withStyles, Paper, Tooltip, IconButton, Theme } from '@material-ui/core';
import classnames from 'classnames';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
const styles = (theme: Theme) => createStyles({
  root: {
    position: 'absolute', top: 15, right: 15, zIndex: 999, opacity: 0.96,
    maxHeight: 'calc(100vh - 150px)',
    width: 300,
    overflowY: 'auto',
    padding: 15
  },
  header: { display: 'flex', flexDirection: 'row', width: '100%' },
  title: { flexGrow: 1, color: theme.palette.primary.main, fontSize: 20,paddingTop:10 },
  closeBtn: { float: 'right' }
});

type Props = {
  onClose: () => void,
  title?: string,
  style?: CSSProperties,
  isOpen:boolean
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
    if(!this.props.isOpen)
     return null;
    const { classes, style, title } = this.props;
    return <Paper className={classnames(classes.root, style)}>
      <div className={classes.header}>
        <div className={classes.title}>{title}</div>
        <div className={classes.closeBtn}>
          <Tooltip title="Đóng">
            <IconButton
              onClick={this.props.onClose} >
              <i className="far fa-times-circle" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      {this.props.children}
    </Paper>
  }
}

export default withStyles(styles)(Component);