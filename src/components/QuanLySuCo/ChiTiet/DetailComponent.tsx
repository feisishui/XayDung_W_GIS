import * as React from 'react';
import {
  createStyles, WithStyles, withStyles,
  ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Theme, CircularProgress, Avatar
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SuCoThongTin from '../../../services/map/SuCo/models/sucothongtin.model';
import AttachmentComponent from '../../material-ui/AttachmentComponent';
import * as moment from 'moment/moment';

// REDUX
import { taiHinhAnhSCTT } from '../../../services/map/SuCo/suco.action';
import { connect } from 'react-redux';

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
  }
});

type State = {
  attachments?: any[],
  dangTaiHinhAnh: boolean
};

type DispatchToProps = {
  taiHinhAnh: (objectId: number) => Promise<__esri.AttachmentInfo[]>
};

type Props = {
  data: SuCoThongTin
}
  & DispatchToProps
  & WithStyles<typeof styles>

class DetailComponent extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = { dangTaiHinhAnh: false }
  }
  render() {
    const { classes, data } = this.props;
    const { dangTaiHinhAnh, attachments } = this.state;
    return <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Avatar src={this.getSrcAvatar(data.TinhTrang || "MTN")} />
          <Typography color="inherit" className={classes.heading}>{data.MaDonVi}</Typography>
          <Typography color="inherit" className={classes.secondaryHeading}>{data.NguoiChuyenTiep} chuyển tiếp vào {data.TGChuyenTiep && moment(new Date(data.TGChuyenTiep)).fromNow()}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
          <div>

            {data.NoiDungPhanHoi &&
              <Typography> Phản hồi nội dung: <strong>{data.NoiDungPhanHoi}</strong> vào {data.TGPhanHoi && moment(new Date(data.TGPhanHoi)).fromNow()}</Typography>
            }
            {
              !data.NoiDungPhanHoi && <Typography>Chưa có nội dung phản hồi</Typography>
            }
          </div>
          <div>
            {!attachments && <a href="#" onClick={this.loadAttachment.bind(this)}>Nhấn vào đây để xem hình ảnh</a>}
            {dangTaiHinhAnh && <div> <CircularProgress /></div>}
            {attachments && <Typography>Có {attachments.length} hình ảnh</Typography>}
            {attachments && <AttachmentComponent attachments={attachments} />}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  }

  /**
   * Tải hình ảnh
   */
  private async loadAttachment(e: React.MouseEvent) {
    e.preventDefault();
    if (this.state.dangTaiHinhAnh) return;
    try {
      this.setState({ dangTaiHinhAnh: true });
      if (this.props.data.OBJECTID) {
        let result = await this.props.taiHinhAnh(this.props.data.OBJECTID);
        if (result) {
          this.setState({ attachments: result });
        }
      }
    } catch (error) {

    }
    finally {
      this.setState({ dangTaiHinhAnh: false });
    }
  }

  private getSrcAvatar(tinhTrang: string, linhVuc: number = -1): string {
    const baseUrl = `/images/map/suco/`;
    return baseUrl + `${linhVuc}-${tinhTrang}.png`;
  }
};

export default connect(null, {
  taiHinhAnh: taiHinhAnhSCTT
})(withStyles(styles)(DetailComponent));