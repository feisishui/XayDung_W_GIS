import * as React from 'react';
import { createStyles, WithStyles, withStyles, Grid, Typography } from '@material-ui/core';

//Component
import DialogComponent from '../../material-ui/DialogComponent';
import DetailsComponent from './DetailsComponent';
import ChuyenTiepComponent from './ChuyenTiep/index';
import DonViComponent from './DonVi/index';


//REDUX
import { connect } from 'react-redux';
import { AllModelReducer } from '../../../reducers';
import { setThongTinChiTiet } from '../../../services/map/SuCo/suco.action';

import * as moment from 'moment/moment';
import { Model } from '../../../services/map/SuCo/suco.model';
import {checkSuperApp, checkAppDonVi } from '../../../services/map/SuCo/suco.helper';

const styles = createStyles({
  root: {

  },
  container: {
    padding: 17
  }
});

type StateToProps = {
  suCoSelected?: Model
};

type DispatchToProps = {
  close: () => void
};

type Props = {

}
  & StateToProps
  & DispatchToProps
  & WithStyles<typeof styles>;

class ChiTietComponent extends React.Component<Props, {}>{
  render() {
    const { classes, suCoSelected } = this.props;
    if (!suCoSelected) return null;

    const open = suCoSelected != undefined;

    const isSuperApp = checkSuperApp();

    const isDVApp =checkAppDonVi();

    const suCoThongTin = suCoSelected.SuCoThongTins && suCoSelected.SuCoThongTins[0];

    // nếu là app đơn vị nhưng không có dữ liệu sự cố thông tin thì báo lỗi
    if (isDVApp && !suCoThongTin)
      return <Typography>Hệ thống phát hiện bất thường, vui lòng liên hệ quản trị viên.</Typography>;

    const title =
      isSuperApp
        ? `${suCoSelected.NVTiepNhan} tiếp nhận ${moment(new Date(suCoSelected.TGPhanAnh)).fromNow()}`
        : isDVApp && suCoThongTin
          ? `Được chuyển tiếp ${suCoThongTin.TGChuyenTiep ? moment(new Date(suCoThongTin.TGChuyenTiep)).fromNow() : 'chưa xác định'} 
          hết hạn ${suCoThongTin.TGHetHan ? moment(new Date(suCoThongTin.TGHetHan)).fromNow() : 'chưa xác định'}`
          : '';


    return <div className={classes.root}>
      <DialogComponent
        title={title}
        open={open}
        onClose={this.handleCloseDlg.bind(this)}
      >
        <div className={classes.container}>
          {isSuperApp &&
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}><ChuyenTiepComponent /></Grid>
              <Grid item xs={12} sm={6}>
                <DetailsComponent
                  datas={suCoSelected.SuCoThongTins || []}
                />
              </Grid>
            </Grid>
          }
          {isDVApp && suCoThongTin &&
            <DonViComponent data={suCoThongTin} />
          }
        </div>
      </DialogComponent>

    </div>
  }

  private handleCloseDlg() {
    this.props.close();
  }
}

const mapStateToProps = (state: AllModelReducer): StateToProps => ({
  suCoSelected: state.mapSuCo.modelSelected
});

export default connect(mapStateToProps, { close: setThongTinChiTiet })(withStyles(styles)(ChiTietComponent));