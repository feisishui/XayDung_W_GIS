// React
import * as React from 'react';
import { createStyles, WithStyles, withStyles, Tabs, Tab } from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';
// import EqualizerIcon from '@material-ui/icons/Equalizer';
// import AddIcon from '@material-ui/icons/Add';
import PrintIcon from '@material-ui/icons/Print';
// Component
// import StatisticComponent from '../../map-lib/widgets/StatisticComponent';
// import SearchComponent from '../../map-lib/widgets/SearchComponent';
import PrintComponent from '../../map-lib/widgets/PrintComponent';
const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  tab: {
    minHeight: 72
  },
  component: {
    flex: '1 1 auto',
    overflow: 'auto',
    height: '100%'
  }
});

type Props = {
  view: __esri.MapView | __esri.SceneView | undefined
}
  & WithStyles<typeof styles>;

type States = {
  tabIndex: number
};

enum TabIndex {
   In
}

class ToolComponent extends React.PureComponent<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {
      tabIndex: TabIndex.In
    };
  }
  render() {
    const { classes, view } = this.props;
    const { tabIndex } = this.state;
    return <div className={classes.root}>
      <Tabs value={tabIndex} variant="scrollable" onChange={this.handleChange.bind(this)} className={classes.tab}>
        {/* <Tab label="Tìm kiếm" icon={<SearchIcon />} />
        <Tab label="Thống kê" icon={<EqualizerIcon />} /> */}
        <Tab label="In" icon={<PrintIcon />} />
      </Tabs>
      {/* {
        tabIndex === TabIndex.TimKiem &&
        view &&
        <div className={classes.component}>
          <SearchComponent
            view={view}
          />
        </div>
      }
      {
        tabIndex === TabIndex.ThongKe &&
        view &&
        <StatisticComponent
          view={view}
        />
      } */}
      {
        tabIndex === TabIndex.In &&
        view &&
        <PrintComponent
          view={view}
        />
      }
    </div>;
  }

  private handleChange(_: any, newValue: number) {
    this.setState({ tabIndex: newValue });
  }
}

export default withStyles(styles)(ToolComponent);