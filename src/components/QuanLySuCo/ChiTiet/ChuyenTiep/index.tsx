import * as React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';

//Component
import DonViComponent from '../../../TiepNhanSuCo/DonVi/index';

//REDUX
import { AllModelReducer } from '../../../../reducers';
import { connect } from 'react-redux';
import { chuyenDonViTiepNhan } from '../../../../services/map/map.action';

//APP
import { LAYER } from '../../../../constants/map.constant';
import { ModelConstant } from '../../../../services/map/SuCo/suco.model';
const styles = createStyles({
  root: {}
});

type StateToProps = {
  view?: __esri.MapView | __esri.SceneView
};

type DispatchToProps = {
  chuyenDonVi: (maSuCo: string, maDonVi: string) => Promise<boolean>
};

type Props = {

}
  & DispatchToProps
  & StateToProps
  & WithStyles<typeof styles>;

type States = {

};

class ChuyenTiepComponent extends React.Component<Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const { classes } = this.props;

    const maSuCo = this.layMaSuCo();


    return <div className={classes.root}>
      <DonViComponent
        maSuCo={maSuCo}
        onSubmit={this.submitChuyenDonVi.bind(this)}
      />
    </div>
  }

  private layMaSuCo() {
    const view = this.props.view;
    if (view && view.popup.selectedFeature && view.popup.selectedFeature.layer.id === LAYER.DIEM_SU_CO) {
      return view.popup.selectedFeature.attributes[ModelConstant.MaSuCo];
    }
    return null;
  }

  /**
    * Chuyển sự cố cho đơn vị
    */
  private async submitChuyenDonVi(donVi: string): Promise<boolean> {
    const maSuCo = this.layMaSuCo();
    if (maSuCo) {
      const isSuccess = await this.props.chuyenDonVi(maSuCo, donVi);
      // nếu thành công thì tắt màn hình chuyển đổi đơn vị
      return isSuccess;
    }
    return false;
  }
}

const mapStateToProps = (state: AllModelReducer): StateToProps => ({
  view: state.map.view
})


export default connect(mapStateToProps, {
  chuyenDonVi: chuyenDonViTiepNhan
})(withStyles(styles)(ChuyenTiepComponent));