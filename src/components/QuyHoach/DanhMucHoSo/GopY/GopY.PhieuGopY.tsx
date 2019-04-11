import * as React from 'react';
import { createStyles, WithStyles, withStyles, Grid, TextField, Button } from '@material-ui/core';
const styles = createStyles({
  container: {
    width:'100%',
    height:'calc(100% - 94px)',
    marginTop:10,
    display: "flex",
    flexDirection:'column'
  },
  phieuDongGop: {
    width: "100%",
    textAlign: "center",
    fontSize: 22,
    fontWeight: 800,
    height:30
  },
  thongTin: {
    width: "100%",
    flexGrow:1,
    overflow:'auto',
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
    height:30,
    '& button':{
      margin:'0 15px'
    }
  }
});

type Props = {

}
  & WithStyles<typeof styles>;

type States = {

};

class Component extends React.Component<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const { classes } = this.props;
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
                    123
                  </Grid>
                </Grid>
                <Grid item xs={12} container>
                  <Grid item xs={12} sm={4}>
                    Tên:
                  </Grid>
                  <Grid item xs={12} sm={8} />
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
                    <TextField fullWidth />
                  </Grid>
                </Grid>
                <Grid item xs={12} container>
                  <Grid className="field" item xs={12} sm={4}>
                    Địa chỉ:
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField fullWidth />
                  </Grid>
                </Grid>
                <Grid item xs={12} container>
                  <Grid className="field" item xs={12} sm={4}>
                    Điện thoại:
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField fullWidth />
                  </Grid>
                </Grid>
                <Grid item xs={12} container>
                  <Grid className="field" item xs={12} sm={4}>
                    Địa chỉ mail:
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField fullWidth />
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
          <div className={classes.noiDungGopY}>
            <div className="title">C. Nội dung góp ý</div>
            <div className="content">
              <TextField
                multiline
                fullWidth
                rows="10"
              />
            </div>
          </div>
        </div>
        <div className={classes.buttonGroup}>
          <Button variant="contained" color="primary">Góp ý</Button>
          <Button variant="raised">Tải về</Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Component);