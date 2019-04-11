import * as React from 'react';
import { createStyles, WithStyles, withStyles, Grid, TextField, Button, Typography } from '@material-ui/core';
import { AllModelReducer } from '../../../../reducers';
import { connect } from 'react-redux';
import { NoiDungGopY } from '../../../../services/map/quy-hoach/models/danhmuchoso.model';
import RanhGioiQuyHoach from '../../../../services/map/quy-hoach/models/ranhgioiquyhoach.model';
const styles = createStyles({
  container: {
    width: '100%',
    height: 'calc(100% - 94px)',
    marginTop: 10,
    display: "flex",
    flexDirection: 'column'
  },
  phieuDongGop: {
    width: "100%",
    textAlign: "center",
    fontSize: 22,
    fontWeight: 800,
    height: 30
  },
  thongTin: {
    width: "100%",
    flexGrow: 1,
    overflow: 'auto',
    "& .title": {
      fontWeight: 700,
      padding: 7,
      border: "1px solid"
    }
  },
  thongTinDoAn: {
    padding: 15,
    "& .content": {}
  },
  thongTinDonVi: {
    padding: 15,
    '& .content': {
      '& .field': {
        paddingTop: 15
      }
    }
  },
  noiDungGopY: {
    padding: 15
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    height: 30,
    '& button': {
      margin: '0 15px'
    }
  }
});

type StateToProps = {
  doAnSelected?: RanhGioiQuyHoach,
  noiDungGopYs?: NoiDungGopY[]
};

type Props = {

}
  & WithStyles<typeof styles>
  & StateToProps;

type States = {
  tenCQ: string,
  diaChi: string,
  dienThoai: string,
  noiDungGopY: string,
  email: string
};

class Component extends React.PureComponent<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {
      tenCQ: '',
      diaChi: '',
      dienThoai: '',
      noiDungGopY: '',
      email: ''
    };
  }

  componentDidMount() {
    if (this.props.noiDungGopYs) {
      this.setState({ noiDungGopY: this.taoNoiDungGopY(this.props.noiDungGopYs) })
    }
  }

  render() {
    const { classes, doAnSelected } = this.props;

    if (!doAnSelected)
      return <Typography>Không xác định được đồ án được chọn, vui lòng thử lại</Typography>;

    const { diaChi, dienThoai, noiDungGopY, tenCQ, email } = this.state;

    return (
      <div className={classes.container}>
        <div className={classes.phieuDongGop}>PHIẾU ĐÓNG GÓP Ý KIẾN</div>
        <div className={classes.thongTin}>
          <div className={classes.thongTinDoAn}>
            <div className="title">A. THÔNG TIN VỀ ĐỒ ÁN</div>
            <div className="content">
              <Grid container>
                <Grid item xs={12} container>
                  <Grid item xs={12} sm={4}>
                    Mã đồ án:
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    {doAnSelected.MaDuAn}
                  </Grid>
                </Grid>
                <Grid item xs={12} container>
                  <Grid item xs={12} sm={4}>
                    Tên:
                  </Grid>
                  <Grid item xs={12} sm={8} >
                    {doAnSelected.TenDuAn}
                  </Grid>
                </Grid>
                <Grid item xs={12} container>
                  <Grid item xs={12} sm={4}>
                    Địa điểm:
                  </Grid>
                  <Grid item xs={12} sm={8} />
                </Grid>
                <Grid item xs={12} container>
                  <Grid item xs={12} sm={4}>
                    Chủ đầu tư:
                  </Grid>
                  <Grid item xs={12} sm={8} />
                </Grid>
                <Grid item xs={12} container>
                  <Grid item xs={12} sm={4}>
                    Đơn vị tư vấn:
                  </Grid>
                  <Grid item xs={12} sm={8} />
                </Grid>
              </Grid>
            </div>
          </div>
          <div className={classes.thongTinDonVi}>
            <div className="title">
              B. THÔNG TIN VỀ ĐƠN VỊ, CÁ NHÂN ĐÓNG GÓP Ý KIẾN
            </div>
            <div className="content">
              <Grid container>
                <Grid item xs={12} container>
                  <Grid className="field" item xs={12} sm={4}>
                    Tên cơ quan, tổ chức, cá nhân:
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField fullWidth value={tenCQ}      onChange={this.textChangeHandle('tenCQ')}/>
                  </Grid>
                </Grid>
                <Grid item xs={12} container>
                  <Grid className="field" item xs={12} sm={4}>
                    Địa chỉ:
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField fullWidth value={diaChi}      onChange={this.textChangeHandle('diaChi')} />
                  </Grid>
                </Grid>
                <Grid item xs={12} container>
                  <Grid className="field" item xs={12} sm={4}>
                    Điện thoại:
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField fullWidth value={dienThoai} type="number"      onChange={this.textChangeHandle('dienThoai')}/>
                  </Grid>
                </Grid>
                <Grid item xs={12} container>
                  <Grid className="field" item xs={12} sm={4}>
                    Địa chỉ mail:
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField fullWidth type="email" value={email}      onChange={this.textChangeHandle('email')} />
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
          <div className={classes.noiDungGopY}>
            <div className="title">C. Nội dung góp ý</div>
            <div className="content">
              <TextField
                value={noiDungGopY}
                onChange={this.textChangeHandle('noiDungGopY')}
                multiline
                fullWidth
                rows="10"
              />
            </div>
          </div>
        </div>
        <div className={classes.buttonGroup}>
          <Button variant="contained" color="primary">Góp ý</Button>
          <Button variant="text" onClick={this.taiVe}>Tải về</Button>
        </div>
      </div>
    );
  }

  taoNoiDungGopY = (noiDungs: NoiDungGopY[]): string => {
    let noiDung = '';
    if (noiDungs.length > 0) {
      noiDungs.forEach(nd => {
        noiDung += `${nd.hoSo.TenHoSo}: ${nd.noiDung}`
      })
      noiDungs[0].hoSo.TenHoSo
    }
    return noiDung;
  }

  taiVe = () => {
    window.print();
  }

  textChangeHandle = (name: string) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    this.setState({ [name]: evt.target.value });
  }
}

const mapStateToProps = (state: AllModelReducer): StateToProps => ({
  doAnSelected: state.quyHoach.doAnSelected,
  noiDungGopYs: state.quyHoach.noiDungGopYs
})

export default connect(mapStateToProps, null)(withStyles(styles)(Component));