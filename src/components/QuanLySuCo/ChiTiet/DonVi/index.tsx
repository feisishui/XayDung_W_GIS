import * as React from 'react';
import {
  createStyles, WithStyles, withStyles, Grid, Typography
} from '@material-ui/core';
import SuCoThongTin from '../../../../services/map/SuCo/models/sucothongtin.model';

//Component
import FormComponent from './FormComponent';
import ActionComponent from './ActionComponent';
import NoiDungGocComponent from './NoiDungGoc';
import AttachmentComponent from '../../../material-ui/AttachmentComponent';

import { TinhTrang } from '../../../../services/map/SuCo/suco.model';

// redux
import {
  traoDoiSuCoThongTin, hoanThanhSuCoThongTin,
  taiHinhAnhSuCo, taiHinhAnhSCTT, themHinhAnhSCTT, xoaHinhAnhSCTT
} from '../../../../services/map/SuCo/suco.action';
import { connect } from 'react-redux';
import * as moment from 'moment/moment';

const styles = createStyles({
  root: {}
});

type DispatchToProps = {
  pin: (data: SuCoThongTin) => Promise<SuCoThongTin | null>,
  hoanThanh: (data: SuCoThongTin) => Promise<SuCoThongTin | null>,
  taiHinhAnhGoc: (objectId: string) => Promise<__esri.AttachmentInfo[]>,
  taiHinhAnhSCTT: (id: number) => Promise<__esri.AttachmentInfo[]>,
  themHinhAnhSCTT: (id: number, form: HTMLFormElement) => Promise<__esri.AttachmentInfo | null>,
  xoaHinhAnhSCTT: (id: number, attachmentId: number) => Promise<boolean>
};

type Props = {
  data: SuCoThongTin
}
  & DispatchToProps
  & WithStyles<typeof styles>;

type States = {
  data: SuCoThongTin,
  hinhAnhSCs: __esri.AttachmentInfo[],
  hinhAnhSCTTs: __esri.AttachmentInfo[],
};

class DonViComponent extends React.Component<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {
      data: props.data, hinhAnhSCs: [], hinhAnhSCTTs: []
    };
  }

  componentDidMount() {
    this.taiHinhAnhGoc()
      .then(hinhAnhs => {
        if (hinhAnhs.length > 0)
          this.setState({ hinhAnhSCs: hinhAnhs });
      });
    this.taiHinhAnh()
      .then(hinhAnhs => {
        if (hinhAnhs.length > 0)
          this.setState({ hinhAnhSCTTs: hinhAnhs });
      });

  }

  componentWillReceiveProps(props: Props) {
    if (props.data != this.props.data)
      this.setState({ data: props.data });

  }

  /**
   * Tải hình ảnh phản ánh
   */
  private async taiHinhAnhGoc() {
    if (this.state.data.MaSuCo)
      return await this.props.taiHinhAnhGoc(this.state.data.MaSuCo);
    return [];
  }

  /**
   * Tải hình ảnh phản hồi
   */
  private async taiHinhAnh() {
    if (this.state.data.OBJECTID)
      return await this.props.taiHinhAnhSCTT(this.state.data.OBJECTID);
    return [];
  }
  render() {
    const { classes } = this.props;
    const { data, hinhAnhSCs, hinhAnhSCTTs } = this.state;
    return <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <NoiDungGocComponent yKienChiDao={data.YKienChiDao} hinhAnhs={hinhAnhSCs} />
        </Grid>
        <Grid container item xs={12} sm={6} spacing={24}>
          <Grid item xs={12}>
            {data.TGPhanHoi && <Typography>Phản hồi gần nhất lúc {moment(new Date(data.TGPhanHoi)).fromNow()}</Typography>}
          </Grid>
          <Grid item xs={12}>
            <FormComponent Loai={data.Loai} NoiDungPhanHoi={data.NoiDungPhanHoi} GhiChu={data.GhiChu} onChange={this.onChange.bind(this)} />
          </Grid>
          <Grid item xs={12}>
            <AttachmentComponent
              attachments={hinhAnhSCTTs}
              capNhatHinhAnh={this.capNhatHinhAnh.bind(this)}
              xoaHinhAnh={this.xoaHinhAnh.bind(this)}
            />
          </Grid>
          {
            data.TinhTrang !== TinhTrang.HoanThanh &&
            <Grid item xs={12}>
              <ActionComponent
                disabledPin={data.TinhTrang ? data.TinhTrang === TinhTrang.HoanThanh : false}
                disabledSubmit={data.TinhTrang ? data.TinhTrang === TinhTrang.HoanThanh : false}
                onClear={this.onClear.bind(this)}
                onSubmit={this.onSubmit.bind(this)}
                onPin={this.onPin.bind(this)}
              />
            </Grid>
          }
        </Grid>
      </Grid>
    </div>
  }

  private onClear() {
    this.setState(state => ({ data: { ...state.data, NoiDungPhanHoi: '', Loai: null } }));
  }

  private onSubmit() {
    this.props.hoanThanh(this.state.data);
  }
  private onPin() {
    this.props.pin(this.state.data);
  }

  private onChange(name: string, value: any) {
    this.setState(state => ({ data: { ...state.data, [name]: value } }))
  }

  private async capNhatHinhAnh(form: HTMLFormElement): Promise<boolean> {
    if (this.state.data.OBJECTID) {
      const result = await this.props.themHinhAnhSCTT(this.state.data.OBJECTID, form);
      if (result) {
        this.setState(state => ({ hinhAnhSCTTs: [result, ...state.hinhAnhSCTTs] }))
      }
    }

    return Promise.resolve(false);
  }

  private async xoaHinhAnh(id: number) {
    const { data, hinhAnhSCTTs } = this.state;
    if (data.OBJECTID) {
      const result = await this.props.xoaHinhAnhSCTT(data.OBJECTID, id);
      if (result) {
        // nếu thành công thì xóa hình trong list
        // lấy index
        const index = hinhAnhSCTTs.findIndex(f => f.id === id);
        if (index > -1) {
          let newArray = [...hinhAnhSCTTs];
          newArray.splice(index, 1);
          this.setState({ hinhAnhSCTTs: newArray });
        }
      }
    }

    return Promise.resolve(false);
  }
}



export default connect(null, {
  pin: traoDoiSuCoThongTin, hoanThanh: hoanThanhSuCoThongTin,
  taiHinhAnhGoc: taiHinhAnhSuCo, taiHinhAnhSCTT: taiHinhAnhSCTT,
  themHinhAnhSCTT, xoaHinhAnhSCTT
})(withStyles(styles)(DonViComponent));