import * as React from 'react';
import {
  createStyles, WithStyles, withStyles,
  ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Theme, LinearProgress, CircularProgress, Avatar, Tooltip, Divider
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AttachmentComponent from '../../material-ui/AttachmentComponent';
import { HoSoDuyTu } from '../../../services/map/QuanLyMangLuoi/model'
import * as moment from 'moment/moment';
const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  expansionPanel: {
  },
  avatar: {
    marginRight: 7
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  expansionPanelDetails: {
    display: 'block'
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
});

type State = {
  attachments?: any[],
  dangTaiHinhAnh: boolean
};

type Props = {
  data: HoSoDuyTu
}
  & WithStyles<typeof styles>

class DetailComponent extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = { dangTaiHinhAnh: false }
  }
  render() {
    const { classes, data } = this.props;
    const { dangTaiHinhAnh, attachments } = this.state;

    const heading =
      !data.TuNgay
        ? 'Không xác định thời gian bắt đầu'
        : `Bắt đầu từ ${moment(new Date(data.TuNgay)).format('LL')} ${data.DenNgay ? `kết thúc trong ${moment(new Date(data.DenNgay)).from(new Date(data.TuNgay))} ` : ''}`;

    const secondary = data.ChiPhi != undefined ? data.ChiPhi : 'Không xác định chi phí';

    const content = <div>
      <div>
        <Typography>Nội dung: <strong>{data.NoiDung}</strong></Typography>
        <Typography>Số lần: <strong>{data.SoLan}</strong></Typography>
      </div>
      <div>
        {!attachments && <a href="#" onClick={this.loadAttachment.bind(this)}>Nhấn vào đây để xem hình ảnh</a>}
        {dangTaiHinhAnh && <div> <CircularProgress /></div>}
        {attachments && <AttachmentComponent attachments={attachments} />}
      </div>
    </div>;

    return <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color="inherit" className={classes.heading}>{heading}</Typography>
          <Typography color="inherit" className={classes.secondaryHeading}>{secondary}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
          {content}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  }

  /**
   * Tải hình ảnh
   */
  private loadAttachment(e: React.MouseEvent) {
    e.preventDefault();
    if (this.state.dangTaiHinhAnh) return;
    try {
      this.setState({ dangTaiHinhAnh: true });
      setTimeout(() => {
        this.setState({ attachments: [] });
        this.setState({ dangTaiHinhAnh: false });
      }, 2000);
    } catch (error) {

    }
    finally {

    }
  }

  private getSrcAvatar(tinhTrang: string, linhVuc: number = -1): string {
    const baseUrl = `/images/map/suco/`;
    return baseUrl + `${linhVuc}-${tinhTrang}.png`;
  }
};

// const ContentComponent = (props)=>{
// return <div>
//   Pha
// </div>
// }

export default withStyles(styles)(DetailComponent);